import type { MDXInstance, MarkdownInstance } from 'astro'
import type { PostFrontmatter } from './frontmatter'

export type PostType = MDXInstance<PostFrontmatter> | MarkdownInstance<PostFrontmatter>

export function sortByFrontmatterDate(a: PostType, b: PostType) {
  return (
    new Date(b.frontmatter.date).getTime() -
    new Date(a.frontmatter.date).getTime()
  )
}

export const PAGE_SIZE = 10
