import { defineCollection } from 'astro:content';

import { glob } from 'astro/loaders';

import { z } from 'astro/zod';

// Define a `loader` and `schema` for each collection
const casos = defineCollection({
  loader: glob({ base: './src/content/casos', pattern: '**/*.{md,mdx}' }),
  schema: ({image}) => z.object({
    title: z.string(),
    image: image(),
    summary: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    company: z.string(),
    role: z.string(),
    tldr: z.string(),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { casos };