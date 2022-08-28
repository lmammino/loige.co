import type { ImageMetadata } from '@astrojs/image';


export type PostFrontmatter = {
  uuid: string;
  title: string;
  slug: string;
  subtitle?: string;
  date: string;
  updated: string;
  author: string;
  author_slug: string;
  header_img?: ImageMetadata;
  fb_img?: ImageMetadata;
  tw_img?: ImageMetadata;
  status?: 'published' | 'draft' | 'hidden';
  language?: 'en_US' | 'it_IT';
  meta_title?: string;
  meta_description?: string;
  tags: string[];
  timeToRead: number;
  excerpt: string;
}