import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/consts';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap({}), tailwind()],
  redirects: {
    '/page/2': '/blog/page/2',
    '/page/3': '/blog/page/3',
    '/page/4': '/blog/page/4',
    '/page/5': '/blog/page/5',
    '/page/6': '/blog/page/6',
    '/page/7': '/blog/page/7',
  }
});