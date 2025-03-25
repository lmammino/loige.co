import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import compress from 'astro-compress'
import critters from 'astro-critters'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import { SITE_URL } from './src/consts'

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  integrations: [
    sitemap({}),
    compress({
      Image: false,
      SVG: false,
    }),
    critters(),
    expressiveCode({
      emitExternalStylesheet: true,
      themes: ['dark-plus', 'one-light'],
      useDarkModeMediaQuery: true,
      //themeCssSelector: (theme) => `:root[data-theme="${theme.type}"]`,
    }),
    mdx(),
  ],

  redirects: {
    '/page/2': '/blog/page/2',
    '/page/3': '/blog/page/3',
    '/page/4': '/blog/page/4',
    '/page/5': '/blog/page/5',
    '/page/6': '/blog/page/6',
    '/page/7': '/blog/page/7',
    '/blog/page/1': '/blog',
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
