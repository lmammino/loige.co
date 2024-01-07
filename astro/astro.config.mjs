import mdx from '@astrojs/mdx'
import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
// biome-ignore lint/nursery/noDefaultExport: expected
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
})
