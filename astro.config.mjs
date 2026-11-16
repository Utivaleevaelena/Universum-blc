// @ts-check
import { defineConfig } from 'astro/config';

// Static output. English is the default at `/`, Polish lives at `/pl`.
export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
