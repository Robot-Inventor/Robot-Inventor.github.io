import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";
import { getOgImage, OG_IMAGE_COMPONENT_VERSION } from "../../components/OgImage";
import fs from "fs";
import path from "path";

interface CacheData {
    title: string;
    componentVersion: string;
}

const posts = await getCollection("article", (post) => {
    return !post.data.thumbnail;
});

export const getStaticPaths = async () => {
    return posts.map((post) => ({
        params: { slug: post.slug }
    }));
};

/**
 * OGP画像を生成するAPIエンドポイント。
 * 生成した画像はキャッシュされ、再リクエスト時にはタイトルのが変更されていない場合はキャッシュを返す。
 * キャッシュが存在しない、またはタイトルが変更されている場合は新たに生成する。
 * 手動でサムネイルが指定されていない記事のサムネイルのみを生成する。
 */
export const GET: APIRoute = async ({ params }) => {
    if (!params.slug || typeof params.slug !== "string") {
        return new Response(null, {
            status: 400,
            statusText: "slug parameter is missing or invalid type"
        });
    }
    const post = await getEntry("article", params.slug);
    if (!post) {
        return new Response(null, {
            status: 404,
            statusText: "Not found"
        });
    }

    const cachedImagePath = `./node_modules/.cache/og-cache/${post.slug}.png`;
    const cachedDataPath = `./node_modules/.cache/og-cache/${post.slug}.json`;
    const cacheExists = fs.existsSync(cachedImagePath) && fs.existsSync(cachedDataPath);

    let titleEdited = true;
    let componentVersionEdited = true;
    if (cacheExists) {
        const cachedData = JSON.parse(fs.readFileSync(cachedDataPath).toString());
        titleEdited = cachedData.title !== post.data.title;
        componentVersionEdited = cachedData.componentVersion !== OG_IMAGE_COMPONENT_VERSION;
    }
    if (cacheExists && !titleEdited && !componentVersionEdited) {
        const body = fs.readFileSync(cachedImagePath);

        return new Response(body, {
            headers: {
                "Content-Type": "image/png"
            }
        });
    } else {
        const body = await getOgImage(post.data.title);

        if (!fs.existsSync(path.dirname(cachedImagePath))) {
            fs.mkdirSync(path.dirname(cachedImagePath), { recursive: true });
        }

        const cacheData: CacheData = {
            title: post.data.title,
            componentVersion: OG_IMAGE_COMPONENT_VERSION
        };

        fs.writeFileSync(cachedImagePath, body);
        fs.writeFileSync(cachedDataPath, JSON.stringify(cacheData));

        return new Response(body, {
            headers: {
                "Content-Type": "image/png"
            }
        });
    }
};
