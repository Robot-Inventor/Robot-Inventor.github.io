import { marked } from "marked";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import sharp from "sharp";
import path from "path";
import fs from "fs";
import hljs from "highlight.js";
import { file } from "./modules/file";
import {
    get_html_template,
    get_date_time_string,
    get_hash,
} from "./modules/utility";

import config from "./.buildconfig.json";

const cache_file_path = ".buildcache.json";
import build_cache from "../.buildcache.json";
import { get_thumbnail } from "./modules/get_thumbnail";
import { minify_html } from "./modules/minify_html";
import { insert_component_script } from "./modules/insert_component_script";
import { insert_highlight_style } from "./modules/insert_highlight_style";
import { change_file_extension } from "./modules/change_file_extension";
import { update_sitemap } from "./modules/update_sitemap";
import { insert_template } from "./modules/insert_template";
import metadataParser from "markdown-yaml-metadata-parser";
import sizeOf from "image-size";
import { qnote } from "qnote-parser";

class OptimizeImages {
    private readonly document: Document;

    private readonly formats = ["avif", "webp"];
    private readonly output_sizes = [
        {
            size: 1920,
            media: "(min-width: 960px)",
        },
        {
            size: 960,
            media: "(min-width: 480px) and (max-width: 960px)",
        },
        {
            size: 480,
            media: "(max-width: 480px)",
        },
    ];

    constructor(document: Document) {
        this.document = document;
    }

    optimize() {
        if (!build_cache.articles[markdown_path].images)
            build_cache.articles[markdown_path].images = {};

        this.document
            .querySelectorAll("img")
            .forEach((image) => this.process_image(image));
    }

    private optimize_svg(element: HTMLImageElement) {
        element.setAttribute("loading", "lazy");
        element.setAttribute("decoding", "async");
    }

    private generate_fallback_image(
        src: string,
        alt: string,
        absolute_path: string
    ) {
        const img = this.document.createElement("img");
        img.loading = "lazy";
        img.src = src;
        img.alt = alt;

        const size = sizeOf(absolute_path);
        if (!(size.width && size.height)) return img;

        img.width = size.width;
        img.height = size.height;

        return img;
    }

    private generate_source_element(srcset: string, type: string, alt: string) {
        const source = this.document.createElement("source");
        source.srcset = srcset;
        source.type = type;
        return source;
    }

    private compress(
        src: string,
        animation: boolean,
        size: number,
        output_path: string
    ) {
        sharp(src, {
            animated: animation,
        })
            .resize(size)
            .toFile(output_path);
    }

    private link_to_default_picture(element: HTMLImageElement) {
        const link_to_default_picture = this.document.createElement("a");
        link_to_default_picture.href = element.src;

        const picture_element = this.document.createElement("picture");
        link_to_default_picture.appendChild(picture_element);

        element.insertAdjacentElement("afterend", link_to_default_picture);
        element.remove();

        return picture_element;
    }

    private process_image(element: HTMLImageElement) {
        const src = element.src;
        const absolute_src = path.resolve(path.dirname(markdown_path), src);

        const parsed_absolute_src = path.parse(absolute_src);

        if (parsed_absolute_src.ext === ".svg") {
            this.optimize_svg(element);
            return;
        }

        const relative_output_folder = "optimized_images";
        const absolute_output_folder = `${parsed_absolute_src.dir}/${relative_output_folder}`;

        if (!fs.existsSync(absolute_output_folder))
            fs.mkdirSync(absolute_output_folder);

        const img_alt = element.alt;
        const picture_element = this.link_to_default_picture(element);

        const latest_hash = get_hash(file.read(absolute_src));
        const is_changed =
            // @ts-expect-error あとで直す
            build_cache.articles[markdown_path].images[src] !== latest_hash;

        if (is_changed) {
            // @ts-expect-error あとで直す
            build_cache.articles[markdown_path].images[src] = latest_hash;
            console.log(`${src}を最適化中...`);
        } else {
            console.log(
                `${src}は変更されていないため最適化をスキップしました。`
            );
        }

        for (const format of this.formats) {
            for (const output_size of this.output_sizes) {
                const target_size = output_size.size;
                const output_file_name = `${parsed_absolute_src.name}_${target_size}px.${format}`;
                const relative_output_path = `${relative_output_folder}/${output_file_name}`;
                const absolute_output_path = `${absolute_output_folder}/${output_file_name}`;

                if (parsed_absolute_src.ext === ".gif" && format !== "webp")
                    continue;

                if (is_changed) {
                    const is_gif = parsed_absolute_src.ext === ".gif";
                    this.compress(
                        absolute_src,
                        is_gif,
                        target_size,
                        absolute_output_path
                    );
                }

                const source_element = this.generate_source_element(
                    relative_output_path,
                    `image/${format}`,
                    img_alt
                );

                const bigger_images = this.output_sizes.filter(
                    (image) => image.size > target_size
                );
                const additional_srcset = bigger_images
                    .map((bigger_image) => {
                        const pixel_density = `${
                            bigger_image.size / target_size
                        }x`;
                        const pixel_density_descriptor = `${relative_output_folder}/${parsed_absolute_src.name}_${bigger_image.size}px.${format} ${pixel_density}`;
                        return pixel_density_descriptor;
                    })
                    .join(", ");

                source_element.srcset += `, ${additional_srcset}`;

                source_element.media = output_size.media;
                picture_element.appendChild(source_element);
            }
        }

        const fallback = this.generate_fallback_image(
            src,
            img_alt,
            absolute_src
        );
        picture_element.appendChild(fallback);
    }
}

const auto_highlight = (element: HTMLElement) => {
    const language_class = Array.from(element.classList).filter((class_name) =>
        /^language-/.test(class_name)
    );

    if (language_class.length) {
        // TODO: 仕様変更により、この方法での言語指定ができなくなっている
        // @ts-expect-error: 後で直す
        hljs.highlightElement(element, {
            language: language_class[0].replace("language-", ""),
        });

        // シンタックスハイライトされたコードブロックのフォントをCSSで指定するために``data-is-source-code``を使っている。シンタックスハイライトされていないコードブロックにはフォントを指定しない。
        element.setAttribute("data-is-source-code", "true");
    }
};

const get_title = (
    h1: HTMLHeadingElement | null,
    metadata_title: string | undefined
) => (h1 ? h1.textContent : metadata_title);

const get_author = (
    metadata_title: string | undefined,
    default_config: string
) => metadata_title || default_config;

const parse_markdown = (markdown: string) => {
    marked.use({ extensions: [qnote] });
    marked.setOptions({
        smartLists: true,
    });
    return marked.parse(markdown);
};

/**
 * MarkdownをMinify化されたHTMLにコンパイルする
 * @param markdown_path コンパイルしたいMarkdownファイルのパス
 * @returns HTMLにコンパイルし、Minify化したもの
 */
function compile() {
    const date_time = get_date_time_string(new Date());

    if (!build_cache.articles[markdown_path].created)
        build_cache.articles[markdown_path].created = date_time;

    const markdown = file.read(markdown_path);

    const template = get_html_template(config.template);
    const template_hash = get_hash(template);

    const markdown_hash = get_hash(markdown);
    const is_changed = !(
        build_cache.articles[markdown_path].hash === markdown_hash &&
        build_cache.template === template_hash
    );

    if (!is_changed) {
        console.log(
            "Markdownファイルとテンプレートの両方に変更が見つからなかったため、コンパイルをスキップしました。"
        );
        return;
    }

    build_cache.articles[markdown_path].hash = markdown_hash;
    build_cache.template = template_hash;
    build_cache.articles[markdown_path].updated = date_time;

    const { metadata, content: md_without_metadata } = metadataParser(markdown);
    const contents = parse_markdown(md_without_metadata);

    const { window } = new JSDOM(contents);
    const document = window.document;
    const first_h1 = document.querySelector("h1");

    const title = get_title(first_h1, metadata.title);
    if (!title)
        throw "h1要素を定義するか、メタデータブロックでtitleを定義してください。";

    const author = get_author(metadata.author, config.default_author);
    if (!author)
        throw "ビルド設定かメタデータブロックでauthorを定義してください。";

    if (!metadata.description)
        throw "メタデータブロックでdescriptionを定義してください。";

    const date_information = `
<div id="article_date_information">
    <div id="posted_date" title="投稿日時">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="/src/icon/article_white.svg" loading="lazy" decoding="async" alt="アイコン">
            <img src="/src/icon/article_black.svg" loading="lazy" decoding="async" alt="アイコン">
        </picture>
        作成：<time datetime="${
            build_cache.articles[markdown_path].created
        }">${build_cache.articles[markdown_path].created
        .replace("T", "　")
        .replace(/:\d+?\.\d+?$/, "")}</time>
    </div>
</div>`;
    if (first_h1) {
        first_h1.insertAdjacentHTML("afterend", date_information);
    } else {
        document.body.insertAdjacentHTML("afterbegin", date_information);
    }

    if (build_cache.articles[markdown_path].updated) {
        const update_information = `
<div id="last_updated_date" title="最終更新日時">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="/src/icon/edit_white.svg" loading="lazy" decoding="async" alt="アイコン">
        <img src="/src/icon/edit_black.svg" loading="lazy" decoding="async" alt="アイコン">
    </picture>
    最終更新：<time datetime="${
        build_cache.articles[markdown_path].updated
    }">${build_cache.articles[markdown_path].updated
            .replace("T", "　")
            .replace(/:\d+?\.\d+?$/, "")}</time>
</div>`;

        const date_info_element = document.getElementById(
            "article_date_information"
        );
        if (!date_info_element)
            throw new Error("article_date_information要素が見つかりません。");
        date_info_element.insertAdjacentHTML("beforeend", update_information);
    }

    const optimize_images = new OptimizeImages(document);
    optimize_images.optimize();

    const code_elements: NodeListOf<HTMLElement> =
        document.querySelectorAll("pre code");

    code_elements.forEach(auto_highlight);

    const thumbnail_image =
        metadata.thumbnail || get_thumbnail(document, markdown_path);

    const template_values = {
        title: title,
        site_name: config.site_name,
        site_name_sort: config.site_name_short,
        contents: document.body.innerHTML,
        description: metadata.description,
        author: author,
        page_url:
            "https://robot-inventor.github.io/" +
            change_file_extension(markdown_path).replace(/index\.html$/, ""),
        og_type:
            change_file_extension(markdown_path) === "index.html"
                ? "website"
                : "article",
        twitter_id: config.twitter_id,
        thumbnail_image: thumbnail_image,
    } as const;
    const compiled = insert_template(template, template_values);

    const compiled_document = new JSDOM(compiled);

    insert_component_script(compiled_document.window.document);

    const has_source_code = compiled_document.window.document.querySelector(
        "pre code[data-is-source-code='true']"
    );
    if (has_source_code) {
        insert_highlight_style(compiled_document.window.document);
    }

    const html_string =
        compiled_document.window.document.documentElement.outerHTML;
    const minified = `<!DOCTYPE html>${minify_html(html_string)}`;

    const output_file = change_file_extension(markdown_path);

    update_sitemap();

    fs.writeFile(output_file, minified, (err) => {
        if (err) throw err;

        console.log("変換が完了しました。");
    });
}

const markdown_path = process.argv[2] as keyof typeof build_cache.articles;
if (!markdown_path) throw "ビルドするMarkdownファイルを指定してください。";

// @ts-expect-error
if (!build_cache.articles) build_cache.articles = {};

if (!build_cache.articles[markdown_path])
    // @ts-expect-error
    build_cache.articles[markdown_path] = {};

compile();

fs.writeFile(cache_file_path, JSON.stringify(build_cache, null, 4), (err) => {
    if (err) throw err;

    console.log(`キャッシュを${cache_file_path}に書き込みました。`);
});
