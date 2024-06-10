import { getEntry } from "astro:content";

const getDefaultThumbnail = async (slug: string): Promise<ImageMetadata> => {
    const cleanedSlug = slug
        .replace(/^\//, "")
        .replace(/^article\//, "")
        .replace(/\/$/, "");

    const entry = cleanedSlug ? await getEntry("article", cleanedSlug) : null;

    if (entry) {
        return {
            width: 1280,
            height: 720,
            format: "png",
            src: `/og/${cleanedSlug}.png`
        };
    } else {
        return {
            width: 1920,
            height: 960,
            format: "png",
            src: "/icon/ogp_default_thumbnail.png"
        };
    }
};

export { getDefaultThumbnail };
