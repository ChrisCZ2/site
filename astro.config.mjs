// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// This site is fully static (no on-demand rendering), so it builds to plain
// HTML in `dist/` and is served by Cloudflare as static assets — no SSR adapter.
// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://recon.example',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx()],
});
