import { z, defineCollection, reference } from "astro:content";

const articleCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z
            .object({
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
                showInArticleAds: z.boolean().optional().default(true),
                thumbnailCaption: z.string().optional(),
                documentFormat: z.boolean().optional().default(false),
                recipient: z.string().optional(),
                authorName: z.string().optional(),
                lang: z.enum(["ja", "en"]).optional().default("ja")
            })
            .refine(
                (data) => {
                    if (data.documentFormat) {
                        return data.recipient && data.authorName;
                    }
                    return true;
                },
                {
                    message: "When documentFormat is true, recipient and authorName are required.",
                    path: ["recipient", "authorName"] // エラーの対象フィールドを指定
                }
            )
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
        name: z.string(),
        description: z.string().optional(),
        relatedTags: z.array(reference("tag")).optional()
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
