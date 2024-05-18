import { defineConfig, sharpImageService, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import astroExpressiveCode, { pluginFramesTexts } from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { starlightAsides } from "./src/starlight/integrations/asides";
import rlc from "remark-enhanced-link-card";
import customToc from "astro-custom-toc";
import rehypeAutoAds from "rehype-auto-ads";
import regexGrammar from "@robot-inventor/regex-syntax";
import shellSessionGrammar from "@robot-inventor/shell-session-syntax";
import darkModernTheme from "./src/themes/dark-modern.json";
import lightModernTheme from "./src/themes/light-modern.json";
import rehypeImageCaption from "rehype-image-caption";
import remarkBreaks from "remark-breaks";
import react from "@astrojs/react";
import { isElement } from "hast-util-is-element";
import { toString } from "hast-util-to-string";

const topPageURL = "https://roboin.io";

pluginFramesTexts.overrideTexts("ja", {
    copyButtonTooltip: "クリップボードにコピーする",
    copyButtonCopied: "コピーしました！"
});

const tocTemplate = (html) => {
    return `
<aside class="toc">
    <h2>目次</h2>
    <nav>
        ${html}
    </nav>
    <button class="toc-toggle">さらに表示</button>
</aside>`.trim();
};

// https://astro.build/config
export default defineConfig({
    site: topPageURL,
    integrations: [
        sitemap({
            filter: (page) => !page.startsWith(new URL("/tag/", topPageURL).href)
        }),
        astroExpressiveCode({
            themes: [darkModernTheme, lightModernTheme],
            defaultLocale: "ja",
            plugins: [pluginLineNumbers()],
            defaultProps: {
                overridesByLang: {
                    "shell,sh,bash,powershell,console,shellsession,ansi": {
                        showLineNumbers: false
                    }
                }
            },
            shiki: {
                langs: [regexGrammar, shellSessionGrammar]
            }
        }),
        customToc({
            template: tocTemplate
        }),
        mdx(),
        react()
    ],
    markdown: {
        shikiConfig: {
            theme: "dark-plus"
        },
        remarkPlugins: [
            ...starlightAsides(),
            [
                rlc,
                {
                    cache: true,
                    shortenUrl: true
                }
            ],
            remarkBreaks
        ],
        rehypePlugins: [
            [
                rehypeAutoAds,
                {
                    countFrom: 3,
                    adCode: `
<ins class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-2526648882773973"
    data-ad-slot="9413147471"
    data-ad-format="rectangle, horizontal"
    data-full-width-responsive="false"></ins>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>`.trim(),
                    shouldInsertAd: (vfile, previousNode, _, ancestors) => {
                        const adsSettings =
                            // @ts-expect-error
                            vfile.data.astro.frontmatter && vfile.data.astro.frontmatter.showAds !== false;
                        if (!adsSettings) return false;

                        // MDXのコンポーネント内には広告を挿入しない
                        // @ts-expect-error
                        if (ancestors.some((node) => node.type === "mdxJsxFlowElement")) return false;

                        /**
                         * ひとつ前の要素に「次の」「こちらの」というテキストが含まれている場合は広告を挿入しない。
                         * たとえば、「こちらの記事で解説しています」「次のような機能があります」というテキストの直後に
                         * 広告が挿入されていると、読者を混乱させる可能性があるため。
                         */
                        return !(
                            isElement(previousNode, "p") &&
                            ["次の", "こちらの"].some((text) => toString(previousNode).includes(text))
                        );
                    }
                } satisfies Parameters<typeof rehypeAutoAds>[0]
            ],
            rehypeImageCaption
        ]
    },
    image: {
        // ビルド時間短縮のため、Cloudflare Pagesのテスト環境では画像の最適化をスキップする。
        // ローカルまたは本番環境では画像の最適化を実施する。
        service:
            !process.env.CF_PAGES_BRANCH || ["master", "main"].includes(process.env.CF_PAGES_BRANCH)
                ? sharpImageService()
                : passthroughImageService()
    }
});
