import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getDefaultThumbnail } from "src/utils/getDefaultThumbnailPath";

const getMimeType = (extension) => {
    if (extension === "jpg") {
        return "image/jpeg";
    }

    return `image/${extension}`;
};

export const GET = async () => {
    const posts = await getCollection("article");
    return rss({
        title: `${import.meta.env.SITE_NAME} RSS Feed`,
        description: `${import.meta.env.SITE_NAME}のRSSフィードです。`,
        site: import.meta.env.SITE,
        items: posts
            .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime())
            .map((post) => {
                const defaultThumbnail = getDefaultThumbnail(post.slug);
                return {
                    title: post.data.title,
                    pubDate: new Date(post.data.pubDate),
                    description: post.data.description,
                    link: `/article/${post.slug}/`,
                    enclosure: {
                        url: post.data.thumbnail
                            ? post.data.thumbnail.src
                            : new URL(defaultThumbnail.src, import.meta.env.SITE).href,
                        type: post.data.thumbnail ? post.data.thumbnail.format : defaultThumbnail.format,
                        length: 0
                    }
                };
            }),
        customData: `<language>ja</language><webfeeds:icon>https://roboin.io/favicon.svg</webfeeds:icon>`,
        xmlns: {
            webfeeds: "http://webfeeds.org/rss/1.0"
        }
    });
};
