const getDefaultThumbnail = (slug: string): ImageMetadata => {
    const defaultThumbnail: ImageMetadata = {
        width: 1280,
        height: 720,
        format: "png",
        src: `/og/${slug
            .replace(/^\//, "")
            .replace(/^article\//, "")
            .replace(/\/$/, "")}.png`
    } as const;

    return defaultThumbnail;
};

export { getDefaultThumbnail };
