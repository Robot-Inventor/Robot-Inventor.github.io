import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { RemarkNotePlugin } from "@masatomakino/qiita-to-md/bin/plugin/RemarkNotePlugin";
import expressiveCode from "astro-expressive-code";

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
        remarkPlugins: [RemarkNotePlugin.plugin],
        remarkRehype: {
            handlers: {
                note: RemarkNotePlugin.rehypeNoteHandler
            }
        }
    },
    redirects: {
        "/shadowban-scanner": "https://shadowban-scanner.roboin.io/",
        "/shadowban-scanner/en": "https://shadowban-scanner.roboin.io/en/"
    }
});
