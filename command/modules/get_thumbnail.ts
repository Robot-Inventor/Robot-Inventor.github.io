import config from "../.buildconfig.json";
import path from "path";
import normalizeUrl from "normalize-url";

const is_raster = (image: HTMLImageElement) => !/\.svg$/i.test(image.src);

/**
 * OGPのサムネイル画像の絶対パス。優先順位は
 *
 * メタデータブロックの「thumbnail」> 記事中の最初の画像（SVGを除く） > .buildconfig.jsonの「default_thumbnail」
 */
const get_thumbnail = (document: Document, markdown_path: string) => {
    const all_images: NodeListOf<HTMLImageElement> =
        document.querySelectorAll("p img");

    const raster_images = [...all_images].filter(is_raster);

    if (!raster_images.length) return config.default_thumbnail || null;

    const image_element = raster_images[0];
    if (image_element.src[0] === "/") {
        return normalizeUrl(
            `https://robot-inventor.github.io${image_element.src}`
        );
    } else {
        return normalizeUrl(
            `https://robot-inventor.github.io/${path.dirname(markdown_path)}/${
                image_element.src
            }`
        );
    }
};

export { get_thumbnail };
