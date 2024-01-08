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

const speaking = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    language: z.enum(['en_US', 'it_IT']),
    status: z.enum(['published', 'draft']),
    event_name: z.string(),
    event_link: z.string().url().nullable().optional(),
    event_location: z.string().nullable().optional(),
    event_location_gps: z.string().regex(/^-?\d+.\d+,-?\d+.\d+$/).optional().nullable(),
    event_city: z.string().optional().nullable(),
    event_days: z.string(),
    is_workshop: z.boolean(),
    slides_link: z.string().url().optional().nullable(),
    video_link: z.string().url().optional().nullable(),
    with: z.array(z.object({
      name: z.string(),
      link: z.string().url().optional().nullable(),
      image: z.string().url().optional().nullable(),
    })).optional().nullable(),
  })
})

export const collections = { posts, speaking }
