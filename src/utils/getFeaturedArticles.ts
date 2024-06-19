import { getCollection, getEntry } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { getDefaultThumbnail } from "./getDefaultThumbnailPath";

const getFeaturedArticles = async () => {
    const featuredArticles = await getCollection("featuredArticles");
    if (featuredArticles.length === 0) return null;

    const flattenFeaturedArticles = featuredArticles
        .map((data) => data.data.articles as Array<CollectionEntry<"article">>)
        .flat();

    const result: { title: string; link: string; thumbnail: ImageMetadata }[] = [];

    for (const article of flattenFeaturedArticles) {
        if (result.filter((data) => data.link === `/article/${article.slug}/`).length) continue;

        const collectionData = await getEntry("article", article.slug);
        result.push({
            title: collectionData.data.title,
            link: `/article/${article.slug}/`,
            thumbnail: collectionData.data.thumbnail || (await getDefaultThumbnail(article.slug))
        });
    }

    return result;
};

export { getFeaturedArticles };
