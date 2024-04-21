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

    const cacheFilePath = `./og-cache/${post.slug}.png`;
    if (fs.existsSync(cacheFilePath)) {
        const body = fs.readFileSync(cacheFilePath);

        return new Response(body, {
            headers: {
                "Content-Type": "image/png"
            }
        });
    } else {
        const body = await getOgImage(post.data.title);

        if (!fs.existsSync(path.dirname(cacheFilePath))) {
            fs.mkdirSync(path.dirname(cacheFilePath), { recursive: true });
        }
        fs.writeFileSync(cacheFilePath, body);

        return new Response(body, {
            headers: {
                "Content-Type": "image/png"
            }
        });
    }
};
