import type { CollectionEntry } from 'astro:content'

type TagWithCount = {
  name: string
  count: number
  link: string
}

export function getTagsFromPosts(posts: CollectionEntry<'posts'>[]): TagWithCount[] {
  const tags: Record<string, number> = {};
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tags[tag] = tags[tag] ? tags[tag] + 1 : 1
    }
  }
  return Object.entries(tags).map(([name, count]) => ({ name, count, link: `/tag/${name}` })).sort((a, b) => b.count - a.count)
}