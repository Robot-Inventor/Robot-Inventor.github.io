import type { APIRoute } from "astro";
import { getCollection, getEntryBySlug } from "astro:content";
import { getOgImage } from "../../components/OgImage";
import fs from "fs";
import path from "path";

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
    const post = await getEntryBySlug("article", params.slug);
    if (!post) {
        return new Response(null, {
            status: 404,
            statusText: "Not found"
        });
    }

    const cachedImagePath = `./og-cache/${post.slug}.png`;
    const cachedDataPath = `./og-cache/${post.slug}.json`;
    const cacheExists = fs.existsSync(cachedImagePath) && fs.existsSync(cachedDataPath);
    const titleEdited = cacheExists
        ? JSON.parse(fs.readFileSync(cachedDataPath).toString()).title !== post.data.title
        : true;
    if (cacheExists && !titleEdited) {
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

        fs.writeFileSync(cachedImagePath, body);
        fs.writeFileSync(cachedDataPath, JSON.stringify({ title: post.data.title }));

        return new Response(body, {
            headers: {
                "Content-Type": "image/png"
            }
        });
    }
};
