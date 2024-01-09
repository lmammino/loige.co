import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import { SITE_URL } from './src/consts'

// https://astro.build/config
// biome-ignore lint/nursery/noDefaultExport: expected
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap({})],
})
