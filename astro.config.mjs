import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import astroExpressiveCode, { pluginFramesTexts } from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { starlightAsides } from "./src/starlight/integrations/asides";
import rlc from "remark-enhanced-link-card";
import customToc from "astro-custom-toc";
import rehypeAutoAds from "rehype-auto-ads";
import regexGrammar from "./src/grammars/javascript-regex.json";
import darkModernTheme from "./src/themes/dark-modern.json";
import lightModernTheme from "./src/themes/light-modern.json";

const topPageURL = "https://roboin.io";

pluginFramesTexts.overrideTexts("ja", {
    copyButtonTooltip: "クリップボードにコピーする",
    copyButtonCopied: "コピーしました！",
});

const tocTemplate = (html) => {
    return `
<aside class="toc">
    <h2>目次</h2>
    <nav>
        ${html}
    </nav>
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
            plugins: [
                pluginLineNumbers()
            ],
            defaultProps: {
                overridesByLang: {
                    "shell,sh,bash,powershell,console,shellsession,ansi": {
                        showLineNumbers: false
                    }
                }
            },
            shiki: {
                langs: [
                    regexGrammar
                ]
            }
        }),
        customToc({
            template: tocTemplate
        }),
        mdx()
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
            ]
        ],
        rehypePlugins: [
            [
                rehypeAutoAds,
                {
                    countFrom: 2,
                    adCode: `
<ins class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-2526648882773973"
    data-ad-slot="9413147471"
    data-ad-format="auto"
    data-full-width-responsive="false"></ins>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>`.trim()
                }
            ]
        ]
    },
    redirects: {
        "/shadowban-scanner": "https://shadowban-scanner.roboin.io/",
        "/shadowban-scanner/en": "https://shadowban-scanner.roboin.io/en/"
    }
});
