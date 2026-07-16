import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const activities = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/activities" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum([
      "Elektronik & Reparasi",
      "Jaringan",
      "Software & Programming",
      "DIY & Rumah",
      "Lainnya",
    ]),
    coverImage: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { activities };
