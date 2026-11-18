import type { APIRoute } from 'astro';
import { MAX_BODY_BYTES, deliverEnquiry, rateLimited, validateEnquiry, type Locale } from '../../lib/enquiry';

// On-demand endpoint; every page stays prerendered.
export const prerender = false;

const COPY = {
  en: {
    sent: ['Your enquiry has been received.', 'A personal manager will respond within one business day.'],
    error: ['We could not send your enquiry.', 'Please go back and try again.'],
    invalid: ['Check the marked fields.', 'Please go back and correct the form.'],
    back: 'Back to the site',
  },
  pl: {
    sent: ['Otrzymaliśmy Twoje zapytanie.', 'Menedżer odpowie w ciągu jednego dnia roboczego.'],
    error: ['Nie udało się wysłać zapytania.', 'Wróć i spróbuj ponownie.'],
    invalid: ['Sprawdź oznaczone pola.', 'Wróć i popraw formularz.'],
    back: 'Wróć do strony',
  },
} as const;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

// Plain document for the no-JavaScript form post.
const page = (status: number, locale: Locale, kind: 'sent' | 'error' | 'invalid') => {
  const c = COPY[locale];
  const [h, p] = c[kind];
  const home = locale === 'pl' ? '/pl' : '/';
  const html = `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${esc(h)}</title></head><body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#061a2a;color:#fff;font-family:Arial,Helvetica,sans-serif"><main style="max-width:32rem;padding:32px"><h1 style="font-size:1.75rem;margin:0 0 12px">${esc(h)}</h1><p style="margin:0 0 24px;color:#c6d5dc;line-height:1.5">${esc(p)}</p><a href="${home}" style="color:#ffff00">${esc(c.back)}</a></main></body></html>`;
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const fail = (status: number, code: string, locale: Locale, extra: Record<string, unknown> = {}) =>
    wantsJson
      ? json(status, { ok: false, code, ...extra })
      : page(status, locale, code === 'invalid' ? 'invalid' : 'error');

  // Size guard before reading the body.
  const declared = Number(request.headers.get('content-length') ?? '0');
  if (declared > MAX_BODY_BYTES) return fail(413, 'rejected', 'en');
  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) return fail(413, 'rejected', 'en');

  let raw: Record<string, unknown> = {};
  try {
    const type = request.headers.get('content-type') ?? '';
    if (type.includes('application/json')) {
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return fail(400, 'rejected', 'en');
      raw = parsed as Record<string, unknown>;
    } else if (type.includes('application/x-www-form-urlencoded')) {
      raw = Object.fromEntries(new URLSearchParams(text));
    } else {
      return fail(415, 'rejected', 'en');
    }
  } catch {
    return fail(400, 'rejected', 'en');
  }

  const result = validateEnquiry(raw);
  if (!result.ok) {
    if (result.reason === 'invalid') return fail(400, 'invalid', result.locale, { errors: result.errors });
    return fail(400, 'rejected', raw.locale === 'pl' ? 'pl' : 'en');
  }

  let who = 'unknown';
  try {
    who = clientAddress || who;
  } catch {
    /* adapter may not expose the address in every environment */
  }
  if (rateLimited(who)) return fail(429, 'rate_limited', result.locale);

  const delivery = await deliverEnquiry(result.values, result.locale, result.key);
  if (delivery !== 'delivered') {
    return fail(delivery === 'unconfigured' ? 503 : 502, 'delivery_failed', result.locale);
  }
  return wantsJson ? json(200, { ok: true }) : page(200, result.locale, 'sent');
};
