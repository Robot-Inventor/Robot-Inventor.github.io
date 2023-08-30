import { z, defineCollection, reference } from "astro:content";

const articleCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            author: reference("author"),
            description: z.string(),
            showDate: z.boolean().default(true),
            pubDate: z.string().datetime({ offset: true }),
            modifiedDate: z.string().datetime({ offset: true }).optional(),
            thumbnail: image().optional()
        })
});

const authorCollection = defineCollection({
    type: "data",
    schema: z.object({
        type: z.literal("Person").or(z.literal("Organization")),
        homePage: z.string().url(),
        socialMedia: z.array(z.string().url())
    })
});

export const collections = {
    article: articleCollection,
    author: authorCollection
};
