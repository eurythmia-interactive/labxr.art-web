import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { DISCIPLINES } from '@/lib/disciplines';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    category: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    videoUrl: z.string(),
    posterUrl: z.string(),
    techStack: z.array(z.string()),
    metrics: z.object({
      interactions: z.string(),
      uptime: z.string(),
    }),
    disciplines: z.array(z.enum(DISCIPLINES)).default([]),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    icon: z.string(),
    previewVideoUrl: z.string().optional(),
    previewPosterUrl: z.string().optional(),
    disciplines: z.array(z.enum(DISCIPLINES)).default([]),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    avatar: z.string(),
    socials: z.object({
      github: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
    }),
  }),
});

export const collections = { caseStudies, services, team };
