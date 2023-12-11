import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

const getMimeType = (extension) => {
    if (extension === "jpg") {
        return "image/jpeg";
    }

    return `image/${extension}`;
};

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
            enclosure: {
                url: post.data.thumbnail?.src || `${import.meta.env.SITE}/icon/ogp_default_thumbnail.png`,
                type: post.data.thumbnail?.format ? getMimeType(post.data.thumbnail?.format) : "image/png",
                length: 1
            },
        })),
        customData: `<language>ja</language><webfeeds:icon>https://roboin.io/favicon.svg</webfeeds:icon>`,
        xmlns: {
            webfeeds: "http://webfeeds.org/rss/1.0"
        }
    });
}