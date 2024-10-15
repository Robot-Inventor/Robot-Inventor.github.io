import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { cache } from "./cache";

const getLatestArticles = async (
    numberOfArticles: number,
    excludeSlugs?: Array<CollectionEntry<"article">["slug"]>
) => {
    const latestArticles = await cache(`get-latest-articles-${numberOfArticles}`, async () => {
        const allArticles = await getCollection("article", (article) =>
            excludeSlugs ? !excludeSlugs.includes(article.slug) : true
        );

        const latest = allArticles.sort((a, b) => {
            return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
        });

        return latest;
    });

    if (excludeSlugs) {
        return latestArticles.slice(0, numberOfArticles + 1).filter((article) => !excludeSlugs.includes(article.slug));
    } else {
        return latestArticles.slice(0, numberOfArticles);
    }
};

export { getLatestArticles };
