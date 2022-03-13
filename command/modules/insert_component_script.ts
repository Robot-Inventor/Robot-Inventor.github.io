/**
 * 使用されているコンポーネントを検出し、必要なコンポーネントのスクリプトを挿入する。
 * @param document ドキュメントオブジェクト
 */
const insert_component_script = (document: Document) => {
    const component_table = {
        "yt-video": "/src/js/components/yt-video/yt-video.min.js",
        "article-card": "/src/js/components/article-card/article-card.min.js",
    } as const;

    const component_names = Object.keys(component_table) as Array<
        keyof typeof component_table
    >;
    for (const component_name of component_names) {
        const has_component = document.querySelector(component_name);
        if (!has_component) continue;

        const script = document.createElement("script");
        script.src = component_table[component_name];
        document.body.appendChild(script);
    }
};

export { insert_component_script };
