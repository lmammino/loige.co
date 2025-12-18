import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../consts'
import { type CollectionEntry, getCollection, render } from 'astro:content'

function makeImageUrlsAbsolute(html: string): string {
  // Convert relative image src to absolute URLs
  return html.replace(
    /<img([^>]*)\ssrc=["'](?!https?:\/\/)([^"']+)["']/gi,
    (_match, attrs, src) => {
      const absoluteSrc = src.startsWith('/')
        ? `${SITE_URL}${src}`
        : `${SITE_URL}/${src}`
      return `<img${attrs} src="${absoluteSrc}"`
    },
  )
}

export async function GET(_context: APIContext) {
  const posts = await getCollection('posts')
  type PostSlug = CollectionEntry<'posts'>['id']

  const postsContent = {} as Record<PostSlug, string>
  const container = await AstroContainer.create()

  for (const post of posts) {
    // Use Astro's render to get properly processed content with correct image URLs
    const { Content } = await render(post)
    const rawHtml = await container.renderToString(Content, {})
    postsContent[post.id] = makeImageUrlsAbsolute(rawHtml)
  }

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: SITE_URL,
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
    },
    items: posts.map((post) => {
      const ogImageUrl = `${SITE_URL}/og/${post.id}.png`

      return {
        title: post.data.title,
        pubDate: post.data.date,
        link: `${SITE_URL}/${post.id}/`,
        author: SITE_AUTHOR,
        commentsUrl: `${SITE_URL}/${post.id}/#comments`,
        description: post.data.description || post?.body?.slice(0, 200) || '',
        categories: post.data.tags,
        enclosure: {
          url: ogImageUrl,
          length: 0,
          type: 'image/png',
        },
        content: postsContent[post.id],
        customData: `
<media:content url="${ogImageUrl}" width="1200" height="630" medium="image" type="image/png">
  <media:thumbnail url="${ogImageUrl}" width="1200" height="630" />
</media:content>`,
      }
    }),
  })
}
