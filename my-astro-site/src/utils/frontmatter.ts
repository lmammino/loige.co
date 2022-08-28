export type PostFrontmatter = {
  uuid: string;
  title: string;
  slug: string;
  subtitle?: string;
  date: string;
  updated: string;
  author: string;
  author_slug: string;
  header_img?: string;
  fb_img?: string;
  tw_img?: string;
  status?: 'published' | 'draft' | 'hidden';
  language?: 'en_US' | 'it_IT';
  meta_title?: string;
  meta_description?: string;
  tags: string[];
  timeToRead: number;
  excerpt: string;
}