import rss from '@astrojs/rss'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'
import { getCollection } from 'astro:content'

export async function GET (context) {
  const posts = await getCollection('posts')
  // TODO: add other pages to the feed
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      pubDate: post.data.date,
      link: `/${post.slug}/`,
    })),
  })
}
