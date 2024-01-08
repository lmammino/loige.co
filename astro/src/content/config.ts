import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      // Transform string to Date object
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      header_img: image().optional(),
      status: z.enum(['published', 'draft']),
      tags: z.array(z.string()),
    }),
})

export const collections = { posts }
