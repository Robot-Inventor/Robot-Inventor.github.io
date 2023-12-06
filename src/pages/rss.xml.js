import rss from '@astrojs/rss';
import { getCollection } from "astro:content";

export const GET = async () => {
    const posts = await getCollection('article');
    return rss({
        title: `${import.meta.env.SITE_NAME} RSS Feed`,
        description: `${import.meta.env.SITE_NAME}のRSSフィードです。`,
        site: import.meta.env.SITE,
        items: posts.sort((a, b) => (new Date(b.data.pubDate)).getTime() - (new Date(a.data.pubDate)).getTime()).map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/article/${post.slug}/`,
        })),
        customData: `<language>ja</language>`,
    });
}