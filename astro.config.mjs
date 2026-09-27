import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import site from './src/data/site.json' with { type: 'json' };

// Static output. No adapter, no SSR — see SPEC.md §6.
export default defineConfig({
  site: site.seo.siteUrl,
  output: 'static',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
