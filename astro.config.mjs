// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://recon.example',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx()],
  adapter: cloudflare(),
});