import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
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

const experiencia = defineCollection({
  loader: file("src/data/experiencia.json"),
  schema: z.object({
    puesto: z.string(),
    empresa: z.string(),
    fechaInicio: z.string(),
    fechaFin: z.string(),
    descripcion: z.string(),
    id: z.number(),
  }),
});

const educacion = defineCollection({
  loader: file("src/data/educacion.json"),
  schema: z.object({
    titulo: z.string(),
    instituto: z.string(),
    fechaGraduacion: z.string(),
    type: z.string(),
    id: z.number(),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { casos, experiencia, educacion };