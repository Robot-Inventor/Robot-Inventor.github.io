import { marked } from "marked";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import { minify } from "html-minifier";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import hljs from "highlight.js";
import crypto_lib from "crypto";
const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
import { file } from "./modules/file";

import config from "./.buildconfig.json";

const cache_file_path = "../.buildcache.json";
import build_cache from "../.buildcache.json";

/**
 * HTMLのテンプレートを読み込む
 * @returns 読み込んだテンプレート
 */
function get_html_template() {
    return file.read(config.template);
}

/**
 * 改行コードを\nに統一する
 * @param string 入力
 * @returns 改行コードを\nに統一した文字列
 */
function normalize_break_code(string: string) {
    return string.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

/**
 * マークダウンのメタデータブロックの内容を解析し、オブジェクトとして返す
 * @param metadata メタデータのテキスト。メタデータブロックを表す「---」は含まない
 * @returns メタデータのオブジェクト
 */
function parse_markdown_metadata(metadata: string) {
    const colon_normalized = metadata.replace(/^(.*?)(?<!\\): /gm, "$1:");
    const metadata_array = colon_normalized.split("\n");

    let metadata_json: { [index: string]: string } = {};
    for (let i = 0; i < metadata_array.length; i++) {
        const first_colon_place = metadata_array[i].indexOf(":");
        const metadata_property = metadata_array[i].slice(0, first_colon_place);
        const metadata_value = metadata_array[i].slice(first_colon_place + 1);
        metadata_json[metadata_property] = metadata_value;
    }

    return metadata_json;
}

/**
 * ファイルのパスを拡張子以外の部分と拡張子に分割する
 * @param string ファイルのパス
 * @returns 1つ目の要素を拡張子を除いたファイルのパス、2つ目の要素を拡張子とした配列
 */
function split_extension(string: string) {
    const parsed_path = path.parse(string);
    const extension = parsed_path.ext;
    const file_name =
        parsed_path.dir === ""
            ? parsed_path.name
            : `${parsed_path.dir}/${parsed_path.name}`;
    return [file_name, extension];
}

/**
 * 与えられたDOM（documentを想定）内の画像のフォーマットと解像度を最適化する
 * @param document 対象とするdocument。JSDOMで生成したものを使う
 */
function optimize_images(document: Document) {
    if (!build_cache.articles[markdown_path].images)
        build_cache.articles[markdown_path].images = {};

    document.querySelectorAll("img").forEach((element) => {
        const absolute_src = path.resolve(
            path.dirname(markdown_path),
            element.src
        );

        const parsed_absolute_src = path.parse(absolute_src);

        if (parsed_absolute_src.ext === ".svg") {
            element.setAttribute("loading", "lazy");
            element.setAttribute("decoding", "async");
            return;
        }

        const relative_output_folder = "optimized_images";
        const absolute_output_folder = `${parsed_absolute_src.dir}/${relative_output_folder}`;

        if (!fs.existsSync(absolute_output_folder))
            fs.mkdirSync(absolute_output_folder);

        const formats = [
            // 優先したいフォーマットを先に書く
            "avif",
            "webp",
        ];
        const output_sizes = [
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

        const link_to_default_picture = document.createElement("a");
        link_to_default_picture.href = element.src;
        const picture_element = document.createElement("picture");
        link_to_default_picture.appendChild(picture_element);
        const img_alt = element.alt;
        element.insertAdjacentElement("afterend", link_to_default_picture);
        element.remove();

        const latest_hash = get_hash(file.read(absolute_src));
        const is_changed =
            // @ts-expect-error あとで直す
            build_cache.articles[
                markdown_path as keyof typeof build_cache.articles
            ].images[element.src] !== latest_hash;

        if (is_changed) {
            // @ts-expect-error あとで直す
            build_cache.articles[
                markdown_path as keyof typeof build_cache.articles
            ].images[element.src] = latest_hash;
            console.log(`${element.src}を最適化中...`);
        } else {
            console.log(
                `${element.src}は変更されていないため最適化をスキップしました。`
            );
        }

        for (
            let format_index = 0;
            format_index < formats.length;
            format_index++
        ) {
            const target_format = formats[format_index];

            for (
                let size_index = 0;
                size_index < output_sizes.length;
                size_index++
            ) {
                const target_size = output_sizes[size_index].size;
                const output_file_name = `${parsed_absolute_src.name}_${target_size}px.${target_format}`;
                const relative_output_path = `${relative_output_folder}/${output_file_name}`;
                const absolute_output_path = `${absolute_output_folder}/${output_file_name}`;

                if (
                    parsed_absolute_src.ext === ".gif" &&
                    target_format !== "webp"
                )
                    continue;

                if (is_changed) {
                    sharp(absolute_src, {
                        animated: parsed_absolute_src.ext === ".gif",
                    })
                        .resize(target_size)
                        .toFile(absolute_output_path);
                }

                const source_element = document.createElement("source");
                source_element.setAttribute("srcset", relative_output_path);
                source_element.setAttribute("type", `image/${target_format}`);
                source_element.setAttribute("loading", "lazy");
                source_element.setAttribute("alt", img_alt);

                const bigger_images = output_sizes.filter(
                    (image) => image.size > target_size
                );
                if (bigger_images.length) {
                    for (let i = 0; i < bigger_images.length; i++) {
                        const pixel_density = `${
                            bigger_images[i].size / target_size
                        }x`;
                        const pixel_density_descriptor = `${relative_output_folder}/${parsed_absolute_src.name}_${bigger_images[i].size}px.${target_format} ${pixel_density}`;
                        const srcset = (
                            source_element.getAttribute("srcset") || ""
                        ).split(", ");
                        srcset.push(pixel_density_descriptor);
                        const new_srcset = srcset.join(", ");
                        source_element.setAttribute("srcset", new_srcset);
                    }
                }

                const media_attribute = output_sizes[size_index].media;
                source_element.setAttribute("media", media_attribute);

                picture_element.appendChild(source_element);
            }
        }

        const fallback_img_element = document.createElement("img");
        fallback_img_element.setAttribute("src", element.src);
        fallback_img_element.setAttribute("loading", "lazy");
        fallback_img_element.setAttribute("alt", img_alt);
        picture_element.appendChild(fallback_img_element);
    });
}

/**
 * HTML文字列をMinify化する
 * @param html Minify化したいHTMLの文字列
 * @returns Minify化したHTML文字列
 */
function minify_html(html: string) {
    const minified = minify(html, {
        // conservativeCollapseとuseShortDoctype以外は https://kangax.github.io/html-minifier/ のデフォルト値を使用
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        decodeEntities: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: true,
        useShortDoctype: false,
    });

    return minified;
}

/**
 * テンプレートの文字列中の指定されたものを変数で置き換えする
 * @param template テンプレートの文字列
 * @param template_values テンプレートの文字列をこの変数で指定されたものに置き換える。キーで指定されたものを対応する値に置き換える
 * @returns 置き換え済みの文字列
 * @example
 * const template = "${target} World!";
 * const values = {target: "Hello"};
 * console.log(insert_template(template, values););
 * // Hello World!
 */
function insert_template(template: string, template_values: object) {
    const keys = Object.keys(template_values);

    keys.forEach((key) => {
        const template_regex = new RegExp("\\$\\{" + key + "\\}", "g");
        template = template.replace(
            template_regex,
            template_values[key as keyof typeof template_values]
        );
    });

    return template;
}

/**
 * ハッシュ値を計算する
 * @param input ハッシュ化したいターゲット
 * @returns ハッシュ値
 */
function get_hash(input: string) {
    const sha256 = crypto_lib.createHash("sha256");
    sha256.update(input);
    return sha256.digest("hex");
}

/**
 * ファイル名の拡張子を.mdから.htmlに変更する
 * @param markdown_name 変更元のファイル名
 * @return 拡張子を.mdから.htmlに変更したあとのファイル名
 */
function convert_filename_md_to_html(markdown_name: string) {
    const input_file_name_and_extension = split_extension(markdown_name);
    const html_name =
        input_file_name_and_extension[1] === ".md"
            ? input_file_name_and_extension[0] + ".html"
            : markdown_name + ".html";
    return html_name;
}

/**
 * MarkdownをMinify化されたHTMLにコンパイルする
 * @param markdown_path コンパイルしたいMarkdownファイルのパス
 * @returns HTMLにコンパイルし、Minify化したもの
 */
function compile(markdown_path: string) {
    const date = new Date();
    const date_time = `${String(date.getFullYear()).padStart(2, "0")}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(
        date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
        date.getSeconds()
    ).padStart(2, "0")}.${date.getMilliseconds()}`;

    if (
        !build_cache.articles[
            markdown_path as keyof typeof build_cache.articles
        ].created
    )
        build_cache.articles[
            markdown_path as keyof typeof build_cache.articles
        ].created = date_time;

    const metadata_block_re = /-{3}.*?-{3}/s;
    const markdown = file.read(markdown_path);

    const template = get_html_template();
    const template_hash = get_hash(template);

    const markdown_hash = get_hash(markdown);
    if (
        build_cache.articles[markdown_path as keyof typeof build_cache.articles]
            .hash === markdown_hash &&
        build_cache.template === template_hash
    ) {
        console.log(
            "Markdownファイルとテンプレートの両方に変更が見つからなかったため、コンパイルをスキップしました。"
        );
        return;
    } else {
        build_cache.articles[
            markdown_path as keyof typeof build_cache.articles
        ].hash = markdown_hash;
        build_cache.template = template_hash;
        build_cache.articles[
            markdown_path as keyof typeof build_cache.articles
        ].updated = date_time;
    }

    const metadata_block = markdown.match(metadata_block_re);
    const metadata =
        metadata_block === null
            ? {}
            : parse_markdown_metadata(
                  normalize_break_code(metadata_block[0]).replace(
                      /(\n|)(-){3,}(\n|)/g,
                      ""
                  )
              );
    marked.setOptions({
        smartLists: true,
    });
    const contents = marked.parse(markdown.replace(metadata_block_re, ""));

    const { window } = new JSDOM(contents);
    const document = window.document;
    const first_h1 = document.querySelector("h1");

    if (!(metadata.title || first_h1))
        throw "h1要素を定義するか、メタデータブロックでtitleを定義してください。";
    // @ts-expect-error あとで直す
    const title = metadata.title || first_h1.textContent;

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
            build_cache.articles[
                markdown_path as keyof typeof build_cache.articles
            ].created
        }">${build_cache.articles[
        markdown_path as keyof typeof build_cache.articles
    ].created
        .replace("T", "　")
        .replace(/:\d+?\.\d+?$/, "")}</time>
    </div>
</div>`;
    if (first_h1) {
        first_h1.insertAdjacentHTML("afterend", date_information);
    } else {
        document.body.insertAdjacentHTML("afterbegin", date_information);
    }

    if (
        build_cache.articles[markdown_path as keyof typeof build_cache.articles]
            .updated
    ) {
        const update_information = `
<div id="last_updated_date" title="最終更新日時">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="/src/icon/edit_white.svg" loading="lazy" decoding="async" alt="アイコン">
        <img src="/src/icon/edit_black.svg" loading="lazy" decoding="async" alt="アイコン">
    </picture>
    最終更新：<time datetime="${
        build_cache.articles[markdown_path as keyof typeof build_cache.articles]
            .updated
    }">${build_cache.articles[
            markdown_path as keyof typeof build_cache.articles
        ].updated
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

    optimize_images(document);

    const code_elements: NodeListOf<HTMLElement> =
        document.querySelectorAll("pre code");

    code_elements.forEach((element) => {
        const language_class = Array.from(element.classList).filter(
            (class_name) => /^language-/.test(class_name)
        );

        if (language_class.length) {
            // TODO: 仕様変更により、この方法での言語指定ができなくなっている
            // @ts-expect-error: 後で直す
            hljs.highlightElement(element, {
                language: language_class[0].replace("language-", ""),
            });
        }
    });

    /**
     * OGPのサムネイル画像の絶対パス。優先順位は
     *
     * メタデータブロックの「thumbnail」-> 記事中の最初の画像（SVGを除く） -> .buildconfig.jsonの「default_thumbnail」
     * @type {String}
     */
    const thumbnail_image = (() => {
        if (metadata.thumbnail) return metadata.thumbnail;

        const all_images: NodeListOf<HTMLImageElement> =
            document.querySelectorAll("p img");
        if (all_images.length) {
            let image_path;
            all_images.forEach((image_element) => {
                if (!/\.svg$/i.test(image_element.src)) {
                    if (/^\//.test(image_element.src))
                        image_path = `https://robot-inventor.github.io${image_element.src}`;
                    else if (/^https:\/\//.test(image_element.src))
                        image_path = image_element.src;
                    else
                        image_path = `https://robot-inventor.github.io/${path.dirname(
                            markdown_path
                        )}/${image_element.src}`;
                }
            });
            return image_path;
        }

        if (config.default_thumbnail) return config.default_thumbnail;

        throw "記事中にOGPのサムネイル画像に使用できる画像が見つかりませんでした。画像をメタデータブロックの「thumbnail」か.buildconfig.jsonの「default_thumbnail」で明示的に指定してください。";
    })();

    if (!(thumbnail_image && thumbnail_image.match(/^https:\/\//)))
        throw "OGPのサムネイルには相対パスやルート相対パスではなく絶対パスを使用してください。";
    const template_values = {
        title: title,
        site_name: config.site_name,
        site_name_sort: config.site_name_short,
        contents: document.body.innerHTML,
        description: metadata.description,
        page_url:
            "https://robot-inventor.github.io/" +
            convert_filename_md_to_html(markdown_path).replace(
                /index\.html$/,
                ""
            ),
        og_type:
            convert_filename_md_to_html(markdown_path) === "index.html"
                ? "website"
                : "article",
        twitter_id: config.twitter_id,
        thumbnail_image: thumbnail_image,
    };
    const compiled = insert_template(template, template_values);

    const compiled_document = new JSDOM(compiled);

    const component_table = {
        "yt-video": "/src/js/components/yt-video/yt-video.min.js",
        "info-block": "/src/js/components/info-block/info-block.min.js",
        "caution-block":
            "/src/js/components/caution-block/caution-block.min.js",
        "article-card": "/src/js/components/article-card/article-card.min.js",
    };

    const component_names = Object.keys(component_table);

    component_names.forEach((component_name) => {
        if (compiled_document.window.document.querySelector(component_name)) {
            const script_element =
                compiled_document.window.document.createElement("script");
            script_element.src =
                component_table[component_name as keyof typeof component_table];
            compiled_document.window.document.body.appendChild(script_element);
        }
    });

    if (
        compiled_document.window.document.querySelector(
            "pre code[data-is-source-code='true']"
        )
    ) {
        const highlight_style =
            compiled_document.window.document.createElement("link");
        highlight_style.rel = "preload";
        highlight_style.setAttribute("as", "style");
        highlight_style.href = "/src/css/vs2015.min.css";
        highlight_style.setAttribute("onload", "this.rel='stylesheet'");
        compiled_document.window.document.head.appendChild(highlight_style);

        const font_preconnect =
            compiled_document.window.document.createElement("link");
        font_preconnect.rel = "preconnect";
        font_preconnect.href = "https://fonts.gstatic.com";
        compiled_document.window.document.head.appendChild(font_preconnect);

        const font_style =
            compiled_document.window.document.createElement("link");
        font_style.rel = "preload";
        font_style.setAttribute("as", "style");
        font_style.href =
            "https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap";
        font_style.setAttribute("onload", "this.rel='stylesheet'");
        compiled_document.window.document.head.appendChild(font_style);
    }

    const minified =
        "<!DOCTYPE html>" +
        minify_html(
            compiled_document.window.document.documentElement.outerHTML
        );

    const output_file = convert_filename_md_to_html(markdown_path);

    interface articleData {
        url: string;
        lastmod: string;
    }
    let sitemap_data: Array<articleData> = [];
    Object.keys(build_cache.articles).forEach((key) => {
        const article_data = {
            url:
                "/" +
                convert_filename_md_to_html(key).replace(/index\.html$/, ""),
            lastmod:
                build_cache.articles[key as keyof typeof build_cache.articles]
                    .updated ||
                build_cache.articles[key as keyof typeof build_cache.articles]
                    .created,
        };
        sitemap_data.push(article_data);
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

compile(markdown_path);

fs.writeFile(cache_file_path, JSON.stringify(build_cache, null, 4), (err) => {
    if (err) throw err;

    console.log(`キャッシュを${cache_file_path}に書き込みました。`);
});
