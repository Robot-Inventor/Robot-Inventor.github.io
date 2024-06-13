export async function onRequest(context) {
    console.log("Request received");
    const { request, env } = context;
    const response = await env.ASSETS.fetch(request);
    return new HTMLRewriter().on("head", new ElementHandler()).transform(response);
}


class ElementHandler {
    element(element) {
        console.log(`element found: "${element.tagName}"`);
    }

    comments(comment) {
        console.log(`comment found: "${comment.text}"`);
        if (comment.text.trim() !== "HEAD_AD_SCRIPT") return;

        comment.replace('<script is:inline async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" />', { html: true });
    }
}
