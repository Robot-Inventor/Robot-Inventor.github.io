import { z, defineCollection, reference } from "astro:content";

const articleCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            author: reference("author"),
            showAuthor: z.boolean().default(true),
            description: z.string(),
            showDate: z.boolean().default(true),
            pubDate: z.string().datetime({ offset: true }),
            modifiedDate: z.string().datetime({ offset: true }).optional(),
            thumbnail: image().optional(),
            showThumbnail: z.boolean().default(true),
            tags: z.array(reference("tag")).optional(),
            showRecommendedArticles: z.boolean().default(true),
            showToc: z.boolean().default(false)
        })
});

const authorCollection = defineCollection({
    type: "data",
    schema: z.object({
        type: z.literal("Person").or(z.literal("Organization")),
        icon: z.string(),
        homePage: z.string().url(),
        sameAs: z.array(z.string().url()),
        profileLinks: z.record(z.string())
    })
});

const tagCollection = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string()
    })
});

export const collections = {
    article: articleCollection,
    author: authorCollection,
    tag: tagCollection
};
