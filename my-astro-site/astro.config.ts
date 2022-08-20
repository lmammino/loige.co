import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import compress from "astro-compress";

export default defineConfig({
  integrations: [mdx(), image(), compress()]
});