// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Pages are prerendered static. English is the default at `/`, Polish lives at `/pl`.
// The Vercel adapter exists only to run the single on-demand endpoint `POST /api/enquiry`
// (Block 07); every page keeps its static output.
export default defineConfig({
  adapter: vercel(),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
