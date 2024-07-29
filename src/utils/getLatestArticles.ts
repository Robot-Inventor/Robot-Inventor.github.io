import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

const getLatestArticles = async (
    numberOfArticles: number,
    excludeSlugs?: Array<CollectionEntry<"article">["slug"]>
) => {
    const articles = await getCollection("article", (article) =>
        excludeSlugs ? !excludeSlugs.includes(article.slug) : true
    );

    const latestArticles = articles.sort((a, b) => {
        return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
    });

    return latestArticles.slice(0, numberOfArticles);
};

export { getLatestArticles };
