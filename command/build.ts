import buildCacheFile from "../.buildcache.json";
import config from "./.buildconfig.json";

import fs from "fs";
import cryptoLib from "crypto";
import metadataParser from "markdown-yaml-metadata-parser";
import { marked } from "marked";
import { qnote } from "qnote-parser";
import { JSDOM } from "jsdom";
import path from "path";
import sharp from "sharp";
import sizeOf from "image-size";
import hljs from "highlight.js";
import Handlebars from "handlebars";
import normalizeUrl from "normalize-url";
import { minify } from "html-minifier";
import { toXML } from "jstoxml";

const BUILD_CACHE_PATH = ".buildcache.json";
const RELATIVE_MARKDOWN_PATH_REGEXP = /^(?!\.?\/).+\.md$/;
const MESSAGE = {
    ERROR: {
        INVALID_MARKDOWN_PATH:
            "ビルドするMarkdown（.md）ファイルを相対パスで指定してください。なお、相対パスの最初の./は省略してください。",
        TITLE_NOT_DEFINED:
            "タイトルが定義されていません。h1要素を定義するか、メタデータブロックでtitleを定義してください。",
        AUTHOR_NOT_DEFINED: "執筆者名が指定されていません。メタデータブロックのauthorかビルド設定で定義してください。",
        DESCRIPTION_NOT_DEFINED: "記事の概要が設定されていません。メタデータブロックのdescriptionで定義してください。"
    },
    LOG: {
        CACHE_WRITTEN: `キャッシュを${BUILD_CACHE_PATH}に書き込みました。`,
        NOTHING_CHANGED:
            "Markdownファイルとテンプレートの両方に変更が見つからなかったため、コンパイルをスキップしました。",
        ABSOLUTE_IMAGE_PATH_FOUND:
            "絶対パスが使用されている画像の最適化をスキップしました。最適化したい場合は相対パスかルート相対パスを使用してください：",
        IMAGE_OPTIMIZING: "画像を最適化中...",
        SKIPPED_IMAGE_OPTIMIZATION: "画像が変更されていないため最適化をスキップしました：",
        COMPILE_FINISHED: "変換が完了しました。",
        SITEMAP_UPDATED: "サイトマップを更新しました。"
    }
} as const;
const IMAGE_OUTPUT_DIRNAME = "optimized_images";
const SYNTAX_HIGHLIGHT_CSS_PATH = "/src/css/vs2015.min.css";
const MONO_SPACE_FONT_URL = "https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap";
const ROOT_URL = "https://robot-inventor.github.io/";
const HTML_MINIFIER_OPTION = {
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
    useShortDoctype: false
} as const;
const DOCTYPE_DECLARATION = "<!DOCTYPE html>";
const SITEMAP_PATH = "sitemap.xml";
const COMPONENT_DATA = {
    "yt-video": "/src/js/components/yt-video/yt-video.min.js",
    "article-card": "/src/js/components/article-card/article-card.min.js"
} as const;

interface BuildCache {
    articles: {
        [key: string]: {
            created: string;
            hash: string;
            updated: string;
            images: {
                [key: string]: string;
            };
        };
    };
    template: string;
}

type Metadata = Partial<{
    title: string;
    author: string;
    description: string;
    thumbnail: string;
}>;

interface MetadataValidationResult {
    result: boolean;
    message: typeof MESSAGE.ERROR[keyof typeof MESSAGE.ERROR][];
}

const buildCache: BuildCache = buildCacheFile;

const convertToIso8601Local = (date: Date) => {
    const timezoneOffset = date.getTimezoneOffset();

    if (timezoneOffset === 0) {
        return date.toISOString();
    }

    date.setMinutes(date.getMinutes() - timezoneOffset);
    let result = date.toISOString().replace(/Z$/, "");

    const timezoneOffsetHHMM = (() => {
        const tmpDate = new Date("2023-01-01T00:00:00");
        tmpDate.setMinutes(tmpDate.getMinutes() + Math.abs(timezoneOffset));
        const hours = tmpDate.getHours();
        const minutes = tmpDate.getMinutes();
        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    })();

    result += timezoneOffset < 0 ? "+" : "-";
    result += timezoneOffsetHHMM;

    return result;
};

const getHash = (input: cryptoLib.BinaryLike) => {
    const sha256 = cryptoLib.createHash("sha256");
    sha256.update(input);
    return sha256.digest("hex");
};

/**
 * Markdownとテンプレートのキャッシュを確認し、Markdownをコンパイルする必要があるかどうかを確認する。
 * @param path Markdownファイルへのパス
 * @param markdownHash Markdownのテキストのハッシュ値
 * @param templateHash テンプレートのテキストのハッシュ値
 * @returns キャッシュが存在しコンパイルが不要な場合はtrue、コンパイルが必要ならfalseを返す
 */
const checkCache = (path: string, markdownHash: string, templateHash: string) => {
    const isArticleChanged = buildCache.articles[path].hash !== markdownHash;
    const isTemplateChanged = buildCache.template !== templateHash;

    return !isArticleChanged && !isTemplateChanged;
};

const parseMarkdown = (markdown: string) => {
    marked.use({ extensions: [qnote] });
    marked.setOptions({
        smartLists: true
    });
    return marked.parse(markdown);
};

const validateMetadata = (document: Document, metadata: Metadata) => {
    const validationResult: MetadataValidationResult = {
        result: true,
        message: []
    };

    const isTitleDefined = Boolean(document.querySelector("h1")) || Boolean(metadata.title);
    if (!isTitleDefined) {
        validationResult.result = false;
        validationResult.message.push(MESSAGE.ERROR.TITLE_NOT_DEFINED);
    }

    const isAuthorDefined = Boolean(config.default_author) || Boolean(metadata.author);
    if (!isAuthorDefined) {
        validationResult.result = false;
        validationResult.message.push(MESSAGE.ERROR.AUTHOR_NOT_DEFINED);
    }

    const isDescriptionDefined = Boolean(metadata.description);
    if (!isDescriptionDefined) {
        validationResult.result = false;
        validationResult.message.push(MESSAGE.ERROR.DESCRIPTION_NOT_DEFINED);
    }

    return validationResult;
};

const insertDateInformation = (document: Document, createdDate: string, updatedDate: string) => {
    const createdDateElement = document.createElement("div");
    createdDateElement.id = "article_date_information";
    createdDateElement.innerHTML = `
        <div id="posted_date" title="投稿日時">
            <picture>
                <source media="(prefers-color-scheme: dark)" srcset="/src/icon/article_white.svg" loading="lazy" decoding="async" alt="アイコン">
                <img src="/src/icon/article_black.svg" loading="lazy" decoding="async" alt="アイコン">
            </picture>
            作成：<time datetime="${createdDate}">${createdDate.replace("T", "　").replace(/:\d+?\.\d+?$/, "")}</time>
        </div>
    `;
    const h1 = document.querySelector("h1");
    if (h1) {
        h1.insertAdjacentElement("afterend", createdDateElement);
    } else {
        document.body.insertAdjacentElement("afterbegin", createdDateElement);
    }

    const updatedDateHtml = `
        <div id="last_updated_date" title="最終更新日時">
            <picture>
                <source media="(prefers-color-scheme: dark)" srcset="/src/icon/edit_white.svg" loading="lazy" decoding="async" alt="アイコン">
                <img src="/src/icon/edit_black.svg" loading="lazy" decoding="async" alt="アイコン">
            </picture>
            最終更新：<time datetime="${updatedDate}">${updatedDate
        .replace("T", "　")
        .replace(/:\d{1,2}\.\d+(Z|[\+\-]\d{1,2}:\d{1,2})$/, "")}</time>
        </div>
    `;
    createdDateElement.insertAdjacentHTML("beforeend", updatedDateHtml);
};

const optimizeImages = (markdownPath: string, document: Document) => {
    const OUTPUT_FORMATS = ["avif", "webp"] as const;
    const OUTPUT_SIZE_DATA = [
        {
            size: 1920,
            media: "(min-width: 960px)"
        },
        {
            size: 960,
            media: "(min-width: 480px) and (max-width: 960px)"
        },
        {
            size: 480,
            media: "(max-width: 480px)"
        }
    ] as const;

    if (!buildCache.articles[markdownPath].images) {
        buildCache.articles[markdownPath].images = {};
    }

    document.querySelectorAll("img").forEach((image) => {
        if (/^https?:\/\//.test(image.src)) {
            console.log(`${MESSAGE.LOG.ABSOLUTE_IMAGE_PATH_FOUND}${image.src}`);
            return;
        }

        const absoluteImagePath =
            image.src[0] === "/"
                ? // 画像がルート相対パスで指定されている場合
                  path.join(process.cwd(), image.src)
                : // 画像が相対パスで指定されている場合
                  path.resolve(path.dirname(markdownPath), image.src);

        if (path.extname(image.src) === ".svg") {
            image.setAttribute("loading", "lazy");
            image.setAttribute("decoding", "async");
            return;
        }

        const absoluteMarkdownDirectory = path.dirname(path.resolve(markdownPath));
        const absoluteImageOutputDirectory = path.join(absoluteMarkdownDirectory, IMAGE_OUTPUT_DIRNAME);
        if (!fs.existsSync(absoluteImageOutputDirectory)) {
            fs.mkdirSync(absoluteImageOutputDirectory);
        }

        const originalImageLink = document.createElement("a");
        originalImageLink.href = image.src;
        const picture = document.createElement("picture");
        originalImageLink.appendChild(picture);
        image.insertAdjacentElement("afterend", originalImageLink);
        image.remove();

        const imageHash = getHash(fs.readFileSync(absoluteImagePath));
        const isImageChanged = buildCache.articles[markdownPath].images[image.src] !== imageHash;

        if (isImageChanged) {
            buildCache.articles[markdownPath].images[image.src] = imageHash;
            console.log(`${MESSAGE.LOG.IMAGE_OPTIMIZING}${image.src}`);
        } else {
            console.log(`${MESSAGE.LOG.SKIPPED_IMAGE_OPTIMIZATION}${image.src}`);
        }

        for (const format of OUTPUT_FORMATS) {
            for (const sizeData of OUTPUT_SIZE_DATA) {
                const outputSize = sizeData.size;
                const imageFileNameWithoutExt = path.parse(absoluteImagePath).name;
                const outputName = `${imageFileNameWithoutExt}_${outputSize}px.${format}`;
                const relativeOutputPath = `${IMAGE_OUTPUT_DIRNAME}/${outputName}`;
                const absoluteOutputPath = `${path.resolve(path.dirname(markdownPath))}/${relativeOutputPath}`;
                const isGif = path.extname(image.src) === ".gif";

                if (isGif && format !== "webp") continue;

                if (isImageChanged) {
                    // TODO: 画像の元サイズより小さいサイズにのみリサイズするように変更
                    sharp(absoluteImagePath, {
                        animated: isGif
                    })
                        .resize(outputSize)
                        .toFile(absoluteOutputPath);
                }

                const source = document.createElement("source");
                source.srcset = relativeOutputPath;
                source.type = `image/${format}`;

                const largerImages = OUTPUT_SIZE_DATA.map((data) => data.size).filter((size) => size > outputSize);
                const largerSrcset = largerImages.map(
                    (size) =>
                        `${IMAGE_OUTPUT_DIRNAME}/${imageFileNameWithoutExt}_${size}px.${format} ${size / outputSize}x`
                );
                const srcsetList = [`${relativeOutputPath} 1x`, ...largerSrcset];
                source.srcset = srcsetList.join(", ");

                source.media = sizeData.media;
                picture.appendChild(source);
            }
        }

        const fallback = document.createElement("img");
        fallback.loading = "lazy";
        fallback.src = image.src;
        fallback.alt = image.alt;
        const fallbackResolution = sizeOf(absoluteImagePath);
        if (fallbackResolution.width && fallbackResolution.height) {
            fallback.width = fallbackResolution.width;
            fallback.height = fallbackResolution.height;
        }
        picture.appendChild(fallback);
    });
};

const insertPreconnect = (document: Document, href: string, crossOrigin: boolean) => {
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = href;
    if (crossOrigin) {
        preconnect.crossOrigin = "";
    }
    document.head.insertAdjacentElement("afterbegin", preconnect);
};

const applySyntaxHighlight = (document: Document) => {
    const codeElements: NodeListOf<HTMLElement> = document.querySelectorAll("pre code");
    codeElements.forEach((code) => {
        const language = [...code.classList].filter((className) => className.startsWith("language-"))[0];
        if (language.length) {
            hljs.highlightElement(code);
        }
    });

    if (codeElements.length) {
        const highlightLink = document.createElement("link");
        highlightLink.rel = "preload";
        highlightLink.setAttribute("as", "style");
        highlightLink.href = SYNTAX_HIGHLIGHT_CSS_PATH;
        highlightLink.setAttribute("onload", "this.rel='stylesheet'");
        document.head.appendChild(highlightLink);

        insertPreconnect(document, "https://fonts.googleapis.com", false);
        insertPreconnect(document, "https://fonts.gstatic.com", true);

        const fontLink = document.createElement("link");
        fontLink.rel = "preload";
        fontLink.setAttribute("as", "style");
        fontLink.href = MONO_SPACE_FONT_URL;
        fontLink.setAttribute("onload", "this.rel='stylesheet'");
        document.head.appendChild(fontLink);
    }
};

const getFirstImageUrl = (relativeHtmlPath: string, document: Document) => {
    const firstRasterImage = [...document.querySelectorAll("img")].filter((img) => path.extname(img.src) !== ".svg")[0];
    if (!firstRasterImage) return null;

    if (/^https?:\/\//.test(firstRasterImage.src)) {
        return firstRasterImage.src;
    } else if (firstRasterImage.src.startsWith("/")) {
        return normalizeUrl(`${ROOT_URL}/${firstRasterImage.src}`);
    } else {
        return normalizeUrl(`${ROOT_URL}/${path.dirname(relativeHtmlPath)}/${firstRasterImage.src}`);
    }
};

const applyTemplate = (relativeHtmlPath: string, metadata: Metadata, document: Document) => {
    const template = fs.readFileSync(config.template);
    const handlebars = Handlebars.compile(template);

    const thumbnailImage =
        metadata.thumbnail || getFirstImageUrl(relativeHtmlPath, document) || config.default_thumbnail;
    const pageUrl = `${ROOT_URL}${relativeHtmlPath.replace(/\.html$/, "")}`;
    const values = {
        title: metadata.title,
        siteName: config.site_name,
        siteNameShort: config.site_name_short,
        contents: document.body.innerHTML,
        description: metadata.description,
        author: metadata.author || config.default_author,
        pageUrl,
        ogType: pageUrl === ROOT_URL ? "website" : "article",
        twitterId: config.twitter_id,
        thumbnailImage
    };
    const html = handlebars(values);
    const { window } = new JSDOM(html);
    return window.document;
};

const documentToMinifiedHtml = (document: Document) => {
    const outerHtml = document.documentElement.outerHTML;
    return DOCTYPE_DECLARATION + minify(outerHtml, HTML_MINIFIER_OPTION);
};

const updateSitemap = () => {
    const content = Object.keys(buildCache.articles).map((key) => {
        const relativePath = normalizeUrl(`${ROOT_URL}/${path.dirname(key)}/${path.parse(key).name}.html`);
        return {
            url: {
                loc: relativePath,
                lastmod: buildCache.articles[key].updated
            }
        };
    });
    const sitemap = toXML(
        {
            _name: "urlset",
            _attrs: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
            _content: content
        },
        { header: true, indent: "    " }
    );
    fs.writeFileSync(SITEMAP_PATH, sitemap);
    console.log(MESSAGE.LOG.SITEMAP_UPDATED);
};

const loadComponentScript = (document: Document) => {
    const componentNames = Object.keys(COMPONENT_DATA) as (keyof typeof COMPONENT_DATA)[];

    for (const name of componentNames) {
        if (!document.querySelector(name)) continue;

        const script = document.createElement("script");
        script.src = COMPONENT_DATA[name];
        document.appendChild(script);
    }
};

const compile = (markdownPath: string) => {
    const dateTime = convertToIso8601Local(new Date());

    if (!buildCache.articles[markdownPath].created) {
        buildCache.articles[markdownPath].created = dateTime;
    }

    const markdown = fs.readFileSync(markdownPath, "utf-8");
    const markdownHash = getHash(markdown);
    const template = fs.readFileSync(config.template, "utf-8");
    const templateHash = getHash(template);

    if (checkCache(markdownPath, markdownHash, templateHash)) {
        console.log(MESSAGE.LOG.NOTHING_CHANGED);
        return;
    }

    buildCache.articles[markdownPath].hash = markdownHash;
    buildCache.template = templateHash;
    buildCache.articles[markdownPath].updated = dateTime;

    const { metadata, content: markdownWithoutMetadata } = metadataParser(markdown);
    const html = parseMarkdown(markdownWithoutMetadata);

    const { window } = new JSDOM(html);
    const document = window.document;

    const metadataValidationResult = validateMetadata(document, metadata);
    if (!metadataValidationResult.result) throw new Error(metadataValidationResult.message.join("\n"));

    insertDateInformation(
        document,
        buildCache.articles[markdownPath].created,
        buildCache.articles[markdownPath].updated
    );
    optimizeImages(markdownPath, document);
    applySyntaxHighlight(document);
    loadComponentScript(document);

    const outputRelativeHtmlPath = `${path.dirname(markdownPath)}/${path.parse(markdownPath).name}.html`;
    const compiledDocument = applyTemplate(outputRelativeHtmlPath, metadata, document);
    const minifiedHtml = documentToMinifiedHtml(compiledDocument);

    updateSitemap();

    fs.writeFileSync(outputRelativeHtmlPath, minifiedHtml);
    console.log(MESSAGE.LOG.COMPILE_FINISHED);
};

const main = () => {
    // TODO: 記事一覧に自動で追加する機能
    const markdownPath = path.normalize(process.argv[2]).replaceAll("\\", "/");
    if (!RELATIVE_MARKDOWN_PATH_REGEXP.test(markdownPath)) throw new Error(MESSAGE.ERROR.INVALID_MARKDOWN_PATH);
    if (!buildCache.articles) buildCache.articles = {};
    // @ts-expect-error
    if (!buildCache.articles[markdownPath]) buildCache.articles[markdownPath] = {};

    compile(markdownPath);

    fs.writeFile(BUILD_CACHE_PATH, JSON.stringify(buildCache, null, 4), (error) => {
        if (error) throw error;
        console.log(MESSAGE.LOG.CACHE_WRITTEN);
    });
};

main();
