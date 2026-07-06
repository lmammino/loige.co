import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import compress from 'astro-compress'
import critters from 'astro-critters'
import expressiveCode from 'astro-expressive-code'
import { unified } from '@astrojs/markdown-remark'
import { defineConfig } from 'astro/config'
// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import { SITE_URL } from './src/consts'

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  // Astro 7 changed the default to 'jsx' (strips whitespace between inline
  // elements); keep the v6 behavior to avoid output churn
  compressHTML: true,

  // Astro 7 defaults to the new Sätteri markdown pipeline, which mangles some
  // posts that embed raw HTML (autolinks URLs inside <a> tags, re-escapes
  // entities like &mdash;); keep the unified (remark/rehype) pipeline
  markdown: {
    processor: unified(),
  },

  integrations: [
    sitemap({}),
    compress({
      // astro-compress minifies CSS with csso, whose parser silently DROPS
      // media queries in the range syntax (`@media (width>=40rem)`) that
      // Vite 8 now emits, killing every responsive style. Vite already
      // minifies CSS, so this pass saved ~0 bytes anyway.
      CSS: false,
      Image: false,
      SVG: false,
    }),
    critters(),
    expressiveCode({
      emitExternalStylesheet: true,
      themes: ['dark-plus', 'one-light'],
      useDarkModeMediaQuery: true,
      //themeCssSelector: (theme) => `:root[data-theme="${theme.type}"]`,
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      defaultProps: {
        // Line numbers off by default. Opt in per block with showLineNumbers.
        showLineNumbers: false,
      },
      styleOverrides: {
        collapsibleSections: {
          closedBackgroundColor: 'rgba(127, 127, 127, 0.08)',
        },
      },
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
