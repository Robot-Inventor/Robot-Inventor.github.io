import build_cache from "../../.buildcache.json";
import config from "../.buildconfig.json";
import { change_file_extension } from "./change_file_extension";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import fs from "fs";

const update_sitemap = () => {
    const article_keys = Object.keys(build_cache.articles) as Array<
        keyof typeof build_cache.articles
    >;

    const sitemap_data = article_keys.map((md_path) => {
        const article_data = {
            url:
                "/" +
                change_file_extension(md_path).replace(/index\.html$/, ""),
            lastmod:
                build_cache.articles[md_path].updated ||
                build_cache.articles[md_path].created,
        };
        return article_data;
    });

    (async () => {
        const stream = new SitemapStream({
            hostname: "https://robot-inventor.github.io",
        });

        const sitemap_content = await streamToPromise(
            Readable.from(sitemap_data).pipe(stream)
        ).then((data: any) => data.toString());

        fs.writeFile(config.sitemap, sitemap_content, (err) => {
            if (err) throw err;

            console.log("サイトマップを更新しました。");
        });
    })();
};

export { update_sitemap };
