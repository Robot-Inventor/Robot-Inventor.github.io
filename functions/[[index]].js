const AD_SCRIPTS = {
    HEAD_AD_SCRIPT: `
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script is:inline>
    window.googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(function () {
        googletag
            .defineSlot("/9176203,23127422405/1856051", [728, 90], "div-gpt-ad-1713946891063-0")
            .addService(googletag.pubads());
        googletag
            .defineSlot(
                "/9176203,23127422405/1856052",
                [
                    [320, 50],
                    [320, 100]
                ],
                "div-gpt-ad-1713946948591-0"
            )
            .addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs(); //空のdivを閉じる
        googletag.enableServices();
    });
</script>
`.trim(),
    BODY_AD_SCRIPT: `
<!-- /9176203,23127422405/1856051 PC オーバーレイ_PC -->
<div
    style="position:fixed;bottom:0;padding-bottom:env(safe-area-inset-bottom);left:0;right:0;width:100%;background:rgba(0, 0, 0, 0);z-index:99998;text-align:center;transform:translate3d(0, 0, 0);"
>
    <div id="div-gpt-ad-1713946891063-0" style="margin:auto;text-align:center;z-index:99999;">
        <script is:inline>
            googletag.cmd.push(function () {
                googletag.display("div-gpt-ad-1713946891063-0");
            });
        </script>
    </div>
</div>
<!-- /9176203,23127422405/1856052 SP オーバーレイ -->
<div
    style="position:fixed;bottom:0;padding-bottom:env(safe-area-inset-bottom);left:0;right:0;width:100%;background:rgba(0, 0, 0, 0);z-index:99998;text-align:center;transform:translate3d(0, 0, 0);"
>
    <div id="div-gpt-ad-1713946948591-0" style="margin:auto;text-align:center;z-index:99999;">
        <script is:inline>
            googletag.cmd.push(function () {
                googletag.display("div-gpt-ad-1713946948591-0");
            });
        </script>
    </div>
</div>
`.trim()
};

export async function onRequest(context) {
    const { request, env } = context;
    const response = await env.ASSETS.fetch(request);
    return new HTMLRewriter().on("head, body", new ElementHandler()).transform(response);
}

class ElementHandler {
    comments(comment) {
        const commentString = comment.text.trim();

        if (!(commentString in AD_SCRIPTS)) return;

        comment.replace(AD_SCRIPTS[commentString], { html: true });
    }
}
