import build_cache from "../../.buildcache.json";
import config from "../.buildconfig.json";
import { change_file_extension } from "./change_file_extension";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import fs from "fs";

interface SitemapData {
    url: string;
    lastmod: string;
}

const generate_sitemap = async (sitemap_data: Array<SitemapData>) => {
    const stream = new SitemapStream({
        hostname: "https://robot-inventor.github.io",
    });

    const sitemap_stream = Readable.from(sitemap_data).pipe(stream);

    const sitemap_buffer = await streamToPromise(sitemap_stream);
    const sitemap_content = await sitemap_buffer.toString();

    fs.writeFile(config.sitemap, sitemap_content, (err) => {
        if (err) throw err;

        console.log("サイトマップを更新しました。");
    });
};

const update_sitemap = () => {
    const article_keys = Object.keys(build_cache.articles) as Array<
        keyof typeof build_cache.articles
    >;

    const sitemap_data: Array<SitemapData> = article_keys.map((md_path) => {
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

    generate_sitemap(sitemap_data);
};

export { update_sitemap };
