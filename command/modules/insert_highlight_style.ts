const insert_preconnect = (
    document: Document,
    link: string,
    cross_origin: boolean
) => {
    const font_preconnect = document.createElement("link");
    font_preconnect.rel = "preconnect";
    font_preconnect.href = link;
    font_preconnect.crossOrigin = cross_origin ? "" : null;
    document.head.appendChild(font_preconnect);
};

/**
 * コードブロックのシンタックスハイライトに必要なスタイルシートを挿入する。
 * @param document ドキュメントオブジェクト
 */
const insert_highlight_style = (document: Document) => {
    const highlight_css_path = "/src/css/vs2015.min.css";
    const font_url =
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap";

    const highlight_style = document.createElement("link");
    highlight_style.rel = "preload";
    highlight_style.as = "style";
    highlight_style.href = highlight_css_path;
    highlight_style.setAttribute("onload", "this.rel='stylesheet'");
    document.head.appendChild(highlight_style);

    insert_preconnect(document, "https://fonts.googleapis.com", false);
    insert_preconnect(document, "https://fonts.gstatic.com", true);

    const font_style = document.createElement("link");
    font_style.rel = "preload";
    font_style.setAttribute("as", "style");
    font_style.href = font_url;
    font_style.setAttribute("onload", "this.rel='stylesheet'");
    document.head.appendChild(font_style);
};

export { insert_highlight_style };
