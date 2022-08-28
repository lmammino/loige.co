import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import compress from "astro-compress";
import remarkExcerpt from './src/utils/remarkExcerpt';
import remarkTimeToRead from './src/utils/remarkTimeToRead';

export default defineConfig({
  markdown: {
    syntaxHighlight: 'prism',
    drafts: true,
    remarkPlugins: [
      remarkExcerpt,
      remarkTimeToRead,
    ]
  },
  integrations: [mdx(), image(), compress()]
});