import { SITE_URL } from '../consts.ts'
import type { CollectionEntry } from 'astro:content'

type TagWithCount = {
  name: string
  count: number
  link: string
}

export function getTagsFromPosts(
  posts: CollectionEntry<'posts'>[],
): TagWithCount[] {
  const tags: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tags[tag] = tags[tag] ? tags[tag] + 1 : 1
    }
  }
  return Object.entries(tags)
    .map(([name, count]) => ({ name, count, link: `/tag/${name}` }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByTag(
  posts: CollectionEntry<'posts'>[],
): Record<string, CollectionEntry<'posts'>[]> {
  const postsByTag: Record<string, CollectionEntry<'posts'>[]> = {}
  for (const post of posts) {
    for (const tag of post.data.tags) {
      postsByTag[tag] = postsByTag[tag] ? [...postsByTag[tag], post] : [post]
    }
  }
  return postsByTag
}

export function getSimilarPosts(
  post: CollectionEntry<'posts'>,
  postsByTag: Record<string, CollectionEntry<'posts'>[]>,
  limit = 5,
) {
  // index by slug and create a map of posts and their relevancy score (1 point per every matching tag)
  const candidates: Record<string, [CollectionEntry<'posts'>, number]> = {}
  for (const tag of post.data.tags) {
    for (const p of postsByTag[tag]) {
      if (p.slug !== post.slug) {
        if (!candidates[p.slug]) {
          candidates[p.slug] = [p, 1]
        } else {
          candidates[p.slug][1]++
        }
      }
    }
  }

  // sort by score DESC, date DESC and return the top N
  return Object.values(candidates)
    .sort(([postA, scoreA], [postB, scoreB]) => {
      if (scoreA === scoreB) {
        return postB.data.date.getTime() - postA.data.date.getTime()
      }

      return scoreB - scoreA
    })
    .slice(0, limit)
    .map(([p]) => p)
}

export function getAbsoluteUrl(post: CollectionEntry<'posts'>) {
  return `${SITE_URL}/${post.id}`
}

export function getShareUrl(
  post: CollectionEntry<'posts'>,
  type: 'twitter' | 'facebook' | 'linkedin',
) {
  const url = getAbsoluteUrl(post)

  switch (type) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        post.data.title,
      )}&url=${encodeURIComponent(url)}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url,
      )}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?mini=tru&url=${encodeURIComponent(
        url,
      )}&title=${encodeURIComponent(post.data.title)}`
  }
}
