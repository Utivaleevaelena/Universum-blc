// Block 07 — enquiry validation and delivery (server only).
// Server validation is authoritative. Success is reported only after the provider
// (Resend) acknowledges the message with HTTP 2xx and a message id. Nothing in this
// module logs personal data, recipient addresses or provider response bodies.

export const FIELD_LIMITS = {
  name: 120,
  company: 160,
  workEmail: 254,
  phone: 40,
  description: 4000,
  timing: 200,
} as const;

export const MAX_BODY_BYTES = 10_240;
const ALLOWED_KEYS = new Set([
  ...Object.keys(FIELD_LIMITS),
  'consent',
  'website', // honeypot
  'locale',
  'key',
]);

export type FieldError = 'nameRequired' | 'emailRequired' | 'emailInvalid' | 'consentRequired' | 'tooLong';
export type Locale = 'en' | 'pl';

export interface EnquiryValues {
  name: string;
  company: string;
  workEmail: string;
  phone: string;
  description: string;
  timing: string;
}

export type ValidationResult =
  | { ok: true; values: EnquiryValues; locale: Locale; key: string }
  | { ok: false; reason: 'rejected' }
  | { ok: false; reason: 'invalid'; errors: Partial<Record<keyof EnquiryValues | 'consent', FieldError>>; locale: Locale };

const EMAIL_RE = /^[^\s@<>(),;:"\\]+@[^\s@<>(),;:"\\]+\.[^\s@<>(),;:"\\]{2,}$/;
const KEY_RE = /^[A-Za-z0-9-]{16,64}$/;

const clean = (v: unknown) =>
  typeof v === 'string' ? v.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim() : '';

export function validateEnquiry(raw: Record<string, unknown>): ValidationResult {
  for (const k of Object.keys(raw)) if (!ALLOWED_KEYS.has(k)) return { ok: false, reason: 'rejected' };
  if (clean(raw.website) !== '') return { ok: false, reason: 'rejected' };

  const locale: Locale = raw.locale === 'pl' ? 'pl' : 'en';
  // No-JavaScript posts carry no key; the server then creates one.
  const given = clean(raw.key);
  if (given && !KEY_RE.test(given)) return { ok: false, reason: 'rejected' };
  const key = given || crypto.randomUUID();

  const values: EnquiryValues = {
    name: clean(raw.name),
    company: clean(raw.company),
    workEmail: clean(raw.workEmail),
    phone: clean(raw.phone),
    description: clean(raw.description),
    timing: clean(raw.timing),
  };

  const errors: Partial<Record<keyof EnquiryValues | 'consent', FieldError>> = {};
  for (const f of Object.keys(FIELD_LIMITS) as (keyof EnquiryValues)[]) {
    if (values[f].length > FIELD_LIMITS[f]) errors[f] = 'tooLong';
  }
  if (!values.name) errors.name = 'nameRequired';
  if (!values.workEmail) errors.workEmail = 'emailRequired';
  else if (!errors.workEmail && !EMAIL_RE.test(values.workEmail)) errors.workEmail = 'emailInvalid';
  const c = raw.consent;
  if (!(c === true || c === 'true' || c === 'on' || c === 'yes')) errors.consent = 'consentRequired';

  if (Object.keys(errors).length) return { ok: false, reason: 'invalid', errors, locale };
  return { ok: true, values, locale, key };
}

// ───────── Rate limit: best-effort, in memory, no persistence of addresses beyond the window.

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function rateLimited(id: string, now = Date.now()): boolean {
  const recent = (hits.get(id) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(id, recent);
    return true;
  }
  recent.push(now);
  hits.set(id, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return false;
}

// ───────── Delivery

export type DeliveryResult = 'delivered' | 'failed' | 'unconfigured';

// Server runtime env (no @types/node dependency needed).
declare const process: { env: Record<string, string | undefined> } | undefined;

const env = (name: string): string =>
  (typeof process !== 'undefined' ? process.env[name] : undefined) ||
  ((import.meta.env as Record<string, string | undefined>)[name] ?? '');

export async function deliverEnquiry(values: EnquiryValues, locale: Locale, key: string): Promise<DeliveryResult> {
  // Development stub only. `import.meta.env.DEV` is false in production builds, so this
  // branch can never produce a success on a deployed site.
  if (import.meta.env.DEV && !env('RESEND_API_KEY')) {
    const mode = env('ENQUIRY_MOCK');
    if (mode === 'mock') return 'delivered';
    if (mode === 'fail') return 'failed';
  }

  const apiKey = env('RESEND_API_KEY');
  const to = env('ENQUIRY_TO')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const from = env('ENQUIRY_FROM');
  if (!apiKey || !to.length || !from) return 'unconfigured';

  const lines = [
    `Language: ${locale.toUpperCase()}`,
    `Name: ${values.name}`,
    `Work email: ${values.workEmail}`,
    `Company: ${values.company || '—'}`,
    `Phone: ${values.phone || '—'}`,
    `Indicative timing: ${values.timing || '—'}`,
    '',
    'Shipment / project description:',
    values.description || '—',
    '',
    'Privacy notice acknowledged: yes',
  ];

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15_000);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': key,
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: values.workEmail,
        subject: `Website enquiry (${locale.toUpperCase()})`,
        text: lines.join('\n'),
      }),
    });
    if (!res.ok) return 'failed';
    const body = (await res.json().catch(() => null)) as { id?: unknown } | null;
    return body && typeof body.id === 'string' && body.id ? 'delivered' : 'failed';
  } catch {
    return 'failed';
  } finally {
    clearTimeout(timer);
  }
}
