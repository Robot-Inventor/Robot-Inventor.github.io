import { defineConfig, sharpImageService, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import astroExpressiveCode, { pluginFramesTexts } from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { starlightAsides } from "./src/starlight/integrations/asides";
import rehypeOGCard from "rehype-og-card";
import customToc from "astro-custom-toc";
import rehypeAutoAds from "rehype-auto-ads";
import regexGrammar from "@robot-inventor/regex-syntax";
import shellSessionGrammar from "@robot-inventor/shell-session-syntax";
import darkModernTheme from "./src/themes/dark-modern.json";
import lightModernTheme from "./src/themes/light-modern.json";
import rehypeImageCaption from "rehype-image-caption";
import rehypeAmazonAssociates from "./src/plugins/rehype/rehype-amazon-associates";
import remarkBreaks from "remark-breaks";
import react from "@astrojs/react";
import { isElement } from "hast-util-is-element";
import { toString } from "hast-util-to-string";
import rehypeExternalLinks from "rehype-external-links";
import { checkEnvironmentType } from "./src/utils/checkEnvironmentType";

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
        remarkPlugins: [...starlightAsides(), remarkBreaks],
        rehypePlugins: [
            [
                rehypeOGCard,
                {
                    enableSameTextURLConversion: true,
                    excludeDomains: ["amzn.to", "www.amazon.co.jp"]
                } satisfies Parameters<typeof rehypeOGCard>[0]
            ],
            rehypeImageCaption,
            [
                rehypeAutoAds,
                {
                    countFrom: 3,
                    adCode: `
<ins data-in-article-ad="" class="adsbygoogle" style="display: block; height: 280px;"></ins>
`.trim(),
                    shouldInsertAd: (vfile, previousNode, nextNode, ancestors) => {
                        const adsSettings =
                            // @ts-expect-error
                            vfile.data.astro.frontmatter &&
                            // @ts-expect-error
                            vfile.data.astro.frontmatter.showAds !== false &&
                            // @ts-expect-error
                            vfile.data.astro.frontmatter.showInArticleAds !== false;
                        if (!adsSettings) return false;

                        // MDXのコンポーネント内には広告を挿入しない
                        // @ts-expect-error
                        if (ancestors.some((node) => node.type === "mdxJsxFlowElement")) return false;

                        /**
                         * ひとつ前の要素に「次の」「こちらの」などのテキストが含まれている場合は広告を挿入しない。
                         * たとえば、「こちらの記事で解説しています」「次のような機能があります」というテキストの直後に
                         * 広告が挿入されていると、読者を混乱させる可能性があるため。
                         */
                        const isBeforeReference =
                            isElement(previousNode, "p") &&
                            ["次の", "次に", "こちらの", "以下の", "以下に", "："].some((text) =>
                                toString(previousNode).includes(text)
                            );

                        let nextSiblingNode = nextNode;
                        if (nextNode?.type === "text") {
                            const parent = ancestors[ancestors.length - 1];
                            const nextNextNodeIndex = parent.children.indexOf(nextNode) + 1;
                            const nextNextNode = parent.children[nextNextNodeIndex];
                            nextSiblingNode = nextNextNode;
                        }

                        /**
                         * figure要素とiframe要素の直前・直後には広告を挿入しない。
                         */
                        const MEDIA_ELEMENTS = ["figure", "iframe"];
                        const isBeforeMedia = MEDIA_ELEMENTS.some((tagName) => isElement(previousNode, tagName));
                        const isAfterMedia = MEDIA_ELEMENTS.some((tagName) => isElement(nextSiblingNode, tagName));
                        const isAroundMedia = isBeforeMedia || isAfterMedia;

                        const isBeforeLink =
                            isElement(previousNode, "p") &&
                            previousNode.children.length === 1 &&
                            isElement(previousNode.children[0], "a");
                        const isAfterLink =
                            isElement(nextSiblingNode, "p") &&
                            nextSiblingNode.children.length === 1 &&
                            isElement(nextSiblingNode.children[0], "a");
                        const isAroundLink = isBeforeLink || isAfterLink;

                        return !isBeforeReference && !isAroundMedia && !isAroundLink;
                    }
                } satisfies Parameters<typeof rehypeAutoAds>[0]
            ],
            [
                rehypeExternalLinks,
                {
                    rel: ["noopener", "noreferrer"],
                    test: (element) => {
                        if (element.tagName !== "a") return false;
                        if (!element.properties.href || typeof element.properties.href !== "string") return false;

                        return (
                            !element.properties.href.startsWith("/") && !element.properties.href.startsWith(topPageURL)
                        );
                    },
                    target: "_blank"
                } satisfies Parameters<typeof rehypeExternalLinks>[0]
            ],
            rehypeAmazonAssociates
        ]
    },
    image: {
        // ビルド時間短縮のため、Cloudflare Pagesのテスト環境では画像の最適化をスキップする。
        // ローカルまたは本番環境では画像の最適化を実施する。
        service: ["local", "production"].includes(checkEnvironmentType())
            ? sharpImageService()
            : passthroughImageService()
    }
});
