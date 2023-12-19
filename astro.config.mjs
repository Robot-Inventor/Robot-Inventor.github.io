import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { starlightAsides } from "./src/starlight/integrations/asides";

// https://astro.build/config
export default defineConfig({
    site: "https://roboin.io",
    integrations: [
        sitemap(),
        expressiveCode({
            themes: ["dark-plus", "light-plus"]
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
