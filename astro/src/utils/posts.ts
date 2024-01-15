import {SITE_URL} from '../consts.ts'
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

export function getAbsoluteUrl(post: CollectionEntry<'posts'>) {
  return `${SITE_URL}/${post.slug}`
}

export function getShareUrl(post: CollectionEntry<'posts'>, type: 'twitter' | 'facebook' | 'linkedin') {
  const url = getAbsoluteUrl(post)

  switch (type) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.data.title)}&url=${encodeURIComponent(url)}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?mini=tru&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.data.title)}`
  }
}