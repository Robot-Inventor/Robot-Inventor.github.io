import { getCollection, getEntry } from "astro:content";
import { getDefaultThumbnail } from "./getDefaultThumbnailPath";

const getFeaturedArticles = async () => {
    const featuredArticles = await getCollection("featuredArticles");
    if (featuredArticles.length === 0) return null;

    const result: { title: string; link: string; thumbnail: ImageMetadata }[] = [];

    for (const featuredArticleData of featuredArticles) {
        for (const article of featuredArticleData.data.articles) {
            if (result.filter((data) => data.link === `/article/${article.slug}/`).length) continue;

            const collectionData = await getEntry("article", article.slug);
            result.push({
                title: collectionData.data.title,
                link: `/article/${article.slug}/`,
                thumbnail: collectionData.data.thumbnail || getDefaultThumbnail(article.slug)
            });
        }
    }

    return result;
};

export { getFeaturedArticles };