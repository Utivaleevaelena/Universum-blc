import type { Locale } from './routes';

// Source: 03-build-kits/block-01-hero/content.json (v01). Strings are copied
// verbatim. Draft statuses are kept visible and are not publication-approved.
export interface HeroContent {
  status: 'draft_from_approved_visual' | 'working_translation_native_review_required';
  nav: { howItWorks: string; whatWeCoordinate: string; experience: string };
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  trustLine: string;
  /** Accessibility-only labels; not part of content.json (see RESULT.md). */
  a11y: { mainNav: string; languageNav: string };
}

export const content: Record<Locale, HeroContent> = {
  en: {
    status: 'draft_from_approved_visual',
    nav: {
      howItWorks: 'How it works',
      whatWeCoordinate: 'What we coordinate',
      experience: 'Experience',
    },
    eyebrow: 'COMPLEX INTERNATIONAL LOGISTICS',
    title: 'One coordinated route for complex cargo.',
    body: 'We help shape the route, select suitable transport modes and coordinate carriers, permits and customs support.',
    primaryCta: 'Discuss your shipment',
    secondaryCta: 'See how it works',
    trustLine: 'Vlad reviews every enquiry · Response within one business day',
    a11y: { mainNav: 'Main navigation', languageNav: 'Language' },
  },
  pl: {
    status: 'working_translation_native_review_required',
    nav: {
      howItWorks: 'Jak działamy',
      whatWeCoordinate: 'Co koordynujemy',
      experience: 'Doświadczenie',
    },
    eyebrow: 'ZŁOŻONA LOGISTYKA MIĘDZYNARODOWA',
    title: 'Jedna skoordynowana trasa dla wymagających ładunków.',
    body: 'Pomagamy opracować trasę, dobrać odpowiednie środki transportu oraz koordynujemy przewoźników, pozwolenia i obsługę celną.',
    primaryCta: 'Omów swoją przesyłkę',
    secondaryCta: 'Zobacz, jak działamy',
    trustLine:
      'Vlad osobiście analizuje każde zapytanie · Odpowiadamy w ciągu jednego dnia roboczego',
    a11y: { mainNav: 'Nawigacja główna', languageNav: 'Język' },
  },
};
