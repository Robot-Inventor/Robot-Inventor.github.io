import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { pluginFramesTexts } from "astro-expressive-code";
import { starlightAsides } from "./src/starlight/integrations/asides";

const topPageURL = "https://roboin.io";

pluginFramesTexts.overrideTexts("ja", {
    copyButtonTooltip: "クリップボードにコピーする",
    copyButtonCopied: "コピーしました！",
})

// https://astro.build/config
export default defineConfig({
    site: topPageURL,
    integrations: [
        sitemap({
            filter: (page) => !page.startsWith(new URL("/tag/", topPageURL).href)
        }),
        expressiveCode({
            themes: ["dark-plus", "light-plus"],
            defaultLocale: "ja",
        }),
        mdx()
    ],
    markdown: {
        shikiConfig: {
            theme: "dark-plus"
        },
        remarkPlugins: [...starlightAsides()]
    },
    redirects: {
        "/shadowban-scanner": "https://shadowban-scanner.roboin.io/",
        "/shadowban-scanner/en": "https://shadowban-scanner.roboin.io/en/"
    }
});
