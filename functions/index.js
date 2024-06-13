// export async function onRequest(context) {
//     const { request, env } = context;
//     const response = await env.ASSETS.fetch(request);
//     return new HTMLRewriter().on("head", new ElementHandler()).transform(response);
// }

async function handleRequest(request) {
    const response = await fetch(request);
    return new HTMLRewriter().on("head", new ElementHandler()).transform(response);
}

addEventListener("fetch", async event => {
    event.respondWith(handleRequest(event.request))
})


class ElementHandler {
    element(element) {
        console.log("element found: ", element.tagName);
    }

    comments(comment) {
        console.log(`comment found: "${comment.text}"`);
        if (comment.text.trim() !== "HEAD_AD_SCRIPT") return;

        comment.replace('<script is:inline async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" />', { html: true });
    }
}
