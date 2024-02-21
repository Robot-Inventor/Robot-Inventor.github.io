import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import astroExpressiveCode, { pluginFramesTexts } from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { starlightAsides } from "./src/starlight/integrations/asides";
import rlc from "remark-enhanced-link-card";

const topPageURL = "https://roboin.io";

pluginFramesTexts.overrideTexts("ja", {
    copyButtonTooltip: "クリップボードにコピーする",
    copyButtonCopied: "コピーしました！",
});

// https://astro.build/config
export default defineConfig({
    site: topPageURL,
    integrations: [
        sitemap({
            filter: (page) => !page.startsWith(new URL("/tag/", topPageURL).href)
        }),
        astroExpressiveCode({
            themes: ["dark-plus", "light-plus"],
            defaultLocale: "ja",
            plugins: [
                pluginLineNumbers()
            ],
            defaultProps: {
                overridesByLang: {
                    "shell,sh,bash,powershell,console,shellsession": {
                        showLineNumbers: false
                    }
                }
            }
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
        ]
    },
    redirects: {
        "/shadowban-scanner": "https://shadowban-scanner.roboin.io/",
        "/shadowban-scanner/en": "https://shadowban-scanner.roboin.io/en/"
    }
});
