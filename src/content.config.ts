import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
      title: z.string(),
      summary: z.string(),
      client: z.string().optional(),
      role: z.string(),
      year: z.number().optional(),
      // case-study | showcase | branding — a label/hint only; all share one layout
      kind: z.enum(['case-study', 'showcase', 'branding']).default('case-study'),
      services: z.array(z.string()).optional(),
      liveUrl: z.string().optional(),
      // CTA text for the live link (e.g. "Try it in Figma", "Get the app");
      // falls back to "Visit live" when unset
      liveLabel: z.string().optional(),
      // cover as a public path (e.g. /demo-img/x.png); optional, hero falls back
      // to a typographic header when absent
      cover: z.string().optional(),
      tags: z.array(z.string()),
      order: z.number(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    author: z.string(),
    role: z.string(),
    company: z.string().optional(),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // Cover image as a public path (e.g. /demo-img/x.png or /blog/x.jpg). Optional
    // so the card falls back to its gradient when absent.
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, testimonials, blog };
