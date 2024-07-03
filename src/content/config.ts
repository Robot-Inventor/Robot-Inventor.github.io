import { z, defineCollection, reference } from "astro:content";

const articleCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            author: reference("author"),
            showAuthor: z.boolean().optional().default(true),
            description: z.string(),
            showDate: z.boolean().optional().default(true),
            pubDate: z.string().datetime({ offset: true }),
            modifiedDate: z.string().datetime({ offset: true }).optional(),
            thumbnail: image().optional(),
            showThumbnail: z.boolean().optional().default(true),
            tags: z.array(reference("tag")).optional(),
            showRecommendedArticles: z.boolean().optional().default(true),
            showToc: z.boolean().optional().default(false),
            showAds: z.boolean().optional().default(true),
            showInArticleAds: z.boolean().optional().default(true)
        })
});

const authorCollection = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            type: z.literal("Person").or(z.literal("Organization")),
            icon: image(),
            homePage: z.string().url(),
            sameAs: z.array(z.string().url()),
            profileLinks: z.record(z.string()),
            bio: z.string(),
            name: z.string(),
            /**
             * Mastodonでリンクを共有したときに著者のアカウントを表示するためのフィールド。
             * ref: [Highlighting journalism on Mastodon - Mastodon Blog](https://blog.joinmastodon.org/2024/07/highlighting-journalism-on-mastodon/)
             */
            fediverseCreator: z.string().optional(),
            /**
             * Twitterでリンクを共有したときに著者のアカウントをメンションするためのフィールド。
             * `<meta name="twitter:site" content="@keita_roboin" />`的なやつ
             */
            twitterSite: z.string().optional()
        })
});

const tagCollection = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string()
    })
});

const featuredArticlesCollection = defineCollection({
    type: "data",
    schema: z.object({
        articles: z.array(reference("article"))
    })
});

export const collections = {
    article: articleCollection,
    author: authorCollection,
    tag: tagCollection,
    featuredArticles: featuredArticlesCollection
};
