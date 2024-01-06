import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const posts = defineCollection({
	type: 'content',
	schema: ({image}) => z.object({
		title: z.string(),
		subtitle: z.string().optional().nullable(),
		description: z.string().optional().nullable(),
		// Transform string to Date object
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		author: z.string(),
		author_slug: z.string(),
		header_img: image().optional(),
		fb_img: image().optional(),
		tw_img: image().optional(),
		status: z.enum(['published', 'draft']),
		language: z.enum(['en_US', 'it_IT']),
		meta_title: z.string().optional().nullable(),
		meta_description: z.string().optional().nullable(),
		tags: z.array(z.string()),
	}),
})

export const collections = { blog, posts };