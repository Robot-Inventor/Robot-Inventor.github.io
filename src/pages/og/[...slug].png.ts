import type { APIRoute } from "astro";
import { getCollection, getEntryBySlug } from "astro:content";
import { getOgImage } from "../../components/OgImage";

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
    const body = await getOgImage(post.data.title);

    return new Response(body, {
        headers: {
            "Content-Type": "image/png"
        }
    });
};
