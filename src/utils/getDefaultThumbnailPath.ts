const getDefaultThumbnail = (slug: string): ImageMetadata => {
    const defaultThumbnail: ImageMetadata = {
        width: 1920,
        height: 1080,
        format: "png",
        src: `/og/${slug
            .replace(/^\//, "")
            .replace(/^article\//, "")
            .replace(/\/$/, "")}.png`
    };

    return defaultThumbnail;
};

export { getDefaultThumbnail };
