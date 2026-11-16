export const locales = ['en', 'pl'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const homePath: Record<Locale, string> = {
  en: '/',
  pl: '/pl',
};

export const languageNames: Record<Locale, string> = {
  en: 'English',
  pl: 'Polski',
};

// Future section anchors. Their target blocks are built in later tasks.
export const anchors = {
  howItWorks: '#route-mechanism',
  whatWeCoordinate: '#coordination-scope',
  experience: '#vlad-experience',
  qualifier: '#qualifier',
  shipmentForm: '#shipment-form',
} as const;
