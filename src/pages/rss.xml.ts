import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { marked } from 'marked'
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../consts'
import { type CollectionEntry, getCollection } from 'astro:content'

export async function GET(_context: APIContext) {
  const posts = await getCollection('posts')
  type PostSlug = CollectionEntry<'posts'>['id']

  const postsContent = {} as Record<PostSlug, string>
  for (const post of posts) {
    postsContent[post.id] = await marked.parse(post?.body || '')
  }

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: SITE_URL,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `${SITE_URL}/${post.id}/`,
      author: SITE_AUTHOR,
      commentsUrl: `${SITE_URL}/${post.id}/#comments`,
      description: post.data.description || post?.body?.slice(0, 200) || '',
      content: postsContent[post.id],
      categories: post.data.tags,
    })),
  })
}
