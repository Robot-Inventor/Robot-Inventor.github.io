import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import { getEntry, type CollectionEntry } from "astro:content";
import { cache } from "./cache";

const escapeURLs = (text: string) => {
    // URLのドットをスペースとドットに置換する。国際化TLDではTLDにハイフンが含まれることに注意
    const URLs = text.match(/([a-zA-Z0-9\-]+\.)+[a-zA-Z][a-zA-Z0-9\-]+/g);
    if (!URLs) return text;

    for (const URL of URLs) {
        text = text.replace(URL, URL.replace(/\./g, " ."));
    }

    return text;
};

const escapeMentions = (text: string) => {
    // メンションをスペースと@に置換する
    const mentions = text.match(/@[a-zA-Z0-9_]+/g);
    if (!mentions) return text;

    for (const mention of mentions) {
        text = text.replace(mention, mention.replace(/@/g, "@ "));
    }

    return text;
};

const escapeTitle = (title: string) => {
    return escapeMentions(escapeURLs(title));
};

const getThumbnailData = async (thumbnail: ImageMetadata) => {
    const sources = ["avif", "webp"].map(async (format) => {
        const image = await getImage({
            src: thumbnail,
            format: format,
            width: Math.min(1920, thumbnail.width)
        });

        return {
            srcset: image.src,
            type: `image/${format}`
        } as const;
    });

    const fallbackType = ["gif", "svg", "jpg", "jpeg"].includes(thumbnail.format) ? thumbnail.format : "png";

    const fallback = await getImage({
        src: thumbnail,
        format: fallbackType,
        width: Math.min(1920, thumbnail.width)
    });

    return {
        sources: await Promise.all(sources),
        fallback: {
            src: fallback.src,
            attributes: fallback.attributes
        }
    } as const;
};

const getAuthorData = async (
    authorNameOrId: string | { collection: "author"; id: CollectionEntry<"author">["id"] }
) => {
    const authorData = await cache(`get-author-data-${authorNameOrId}`, async () => {
        const authorId = typeof authorNameOrId === "string" ? authorNameOrId : authorNameOrId.id;
        const author = await getEntry("author", authorId);
        if (!author) throw new Error("Undefined author");
        return author;
    });

    return authorData;
};

export { escapeTitle, getThumbnailData, getAuthorData };
