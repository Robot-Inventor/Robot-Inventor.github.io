import { minify } from "html-minifier";

/**
 * HTML文字列をMinify化する
 * @param html Minify化したいHTMLの文字列
 * @returns Minify化したHTML文字列
 */
const minify_html = (html: string) => {
    const option = {
        // conservativeCollapseとuseShortDoctype以外は https://kangax.github.io/html-minifier/ のデフォルト値を使用
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        decodeEntities: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: true,
        useShortDoctype: false,
    } as const;

    return minify(html, option);
};

export { minify_html };
