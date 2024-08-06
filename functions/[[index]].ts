const I_MOBILE_AD_SCRIPTS = {
    head: `
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script>
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
    body: `
<!-- /9176203,23127422405/1856051 PC オーバーレイ_PC -->
<div
    style="position:fixed;bottom:0;padding-bottom:env(safe-area-inset-bottom);left:0;right:0;width:100%;background:rgba(0, 0, 0, 0);z-index:99998;text-align:center;transform:translate3d(0, 0, 0);"
>
    <div id="div-gpt-ad-1713946891063-0" style="margin:auto;text-align:center;z-index:99999;">
        <script>
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
        <script>
            googletag.cmd.push(function () {
                googletag.display("div-gpt-ad-1713946948591-0");
            });
        </script>
    </div>
</div>
`.trim()
};

const getMicroadAdScript = (isMobile) => {
    const desktopAdScript = `
<script type="text/javascript">
    var microadCompass = microadCompass || {};
    microadCompass.queue = microadCompass.queue || [];
</script>
<script
    type="text/javascript"
    charset="UTF-8"
    src="//j.microad.net/js/compass.js"
    onload="new microadCompass.AdInitializer().initialize();"
    async
></script>
<div id="65e713adcd923407d77bed5066957aca" style="visibility: hidden; width: 0px; height: 0px; display: none">
    <script type="text/javascript">
        microadCompass.queue.push({
            spot: "65e713adcd923407d77bed5066957aca"
        });
    </script>
</div>
<div id="ads-ADU-BSBU4LKR"></div>
<script>
    (function (w, d, s, i) {
        var CREATIVE_ID = "65e713adcd923407d77bed5066957aca";
        var microadTag,
            countNumber = 0,
            isFindingMicroAdBanner = false;

        var findCreativeTagInterval = setInterval(findCreativeTag, 50);
        function findCreativeTag() {
            if (countNumber > 50) {
                clearInterval(findCreativeTagInterval);
                // add 2 following lines for Passback
                loadAdunit(microadTag.id);
                return;
            }
            if (isFindingMicroAdBanner) return;
            isFindingMicroAdBanner = true;
            var divTags = document.getElementsByTagName("div");
            countNumber = countNumber + 1;
            if (divTags && divTags.length) {
                for (var i = 0; i < divTags.length; i++) {
                    var divTag = divTags[i];
                    if (divTag && divTag.id && divTag.id.indexOf(CREATIVE_ID) > -1) {
                        microadTag = divTag;
                        microadTag.style.visibility = "hidden";
                        if (
                            microadTag &&
                            microadTag.getElementsByTagName("iframe") &&
                            microadTag.getElementsByTagName("iframe").length > 0
                        ) {
                            loadAdunit(microadTag.id);
                            clearInterval(findCreativeTagInterval);
                            break;
                        }
                    }
                }
            }
            isFindingMicroAdBanner = false;
        }
        function loadAdunit(microadBannerId) {
            w.adunitlength ? w.adunitlength.push("ADU-BSBU4LKR") : (w.adunitlength = ["ADU-BSBU4LKR"]);
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s);
            j.async = true;
            j.src =
                "https://rise.enhance.co.jp/adu.js?id=" +
                i +
                "&matwName=matw_uuid" +
                "&clientTime=" +
                new Date().getTime() +
                "&maBannerId=" +
                microadBannerId;
            f.parentNode.insertBefore(j, f);
        }
    })(window, document, "script", "ADU-BSBU4LKR");
</script>
`.trim();

    const mobileAdScript = `
<script type="text/javascript">
    var microadCompass = microadCompass || {};
    microadCompass.queue = microadCompass.queue || [];
</script>
<script
    type="text/javascript"
    charset="UTF-8"
    src="//j.microad.net/js/compass.js"
    onload="new microadCompass.AdInitializer().initialize();"
    async
></script>
<div id="9f7b2995e6ba1c4c3951dfc6c41ade36" style="visibility: hidden; width: 0px; height: 0px; display: none">
    <script type="text/javascript">
        microadCompass.queue.push({
            spot: "9f7b2995e6ba1c4c3951dfc6c41ade36"
        });
    </script>
</div>
<div id="ads-ADU-8CD0H0NJ"></div>
<script>
    (function (w, d, s, i) {
        var CREATIVE_ID = "9f7b2995e6ba1c4c3951dfc6c41ade36";
        var microadTag,
            countNumber = 0,
            isFindingMicroAdBanner = false;

        var findCreativeTagInterval = setInterval(findCreativeTag, 50);
        function findCreativeTag() {
            if (countNumber > 50) {
                clearInterval(findCreativeTagInterval);
                // add 2 following lines for Passback
                loadAdunit(microadTag.id);
                return;
            }
            if (isFindingMicroAdBanner) return;
            isFindingMicroAdBanner = true;
            var divTags = document.getElementsByTagName("div");
            countNumber = countNumber + 1;
            if (divTags && divTags.length) {
                for (var i = 0; i < divTags.length; i++) {
                    var divTag = divTags[i];
                    if (divTag && divTag.id && divTag.id.indexOf(CREATIVE_ID) > -1) {
                        microadTag = divTag;
                        microadTag.style.visibility = "hidden";
                        if (
                            microadTag &&
                            microadTag.getElementsByTagName("iframe") &&
                            microadTag.getElementsByTagName("iframe").length > 0
                        ) {
                            loadAdunit(microadTag.id);
                            clearInterval(findCreativeTagInterval);
                            break;
                        }
                    }
                }
            }
            isFindingMicroAdBanner = false;
        }
        function loadAdunit(microadBannerId) {
            w.adunitlength ? w.adunitlength.push("ADU-8CD0H0NJ") : (w.adunitlength = ["ADU-8CD0H0NJ"]);
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s);
            j.async = true;
            j.src =
                "https://rise.enhance.co.jp/adu.js?id=" +
                i +
                "&matwName=matw_uuid" +
                "&clientTime=" +
                new Date().getTime() +
                "&maBannerId=" +
                microadBannerId;
            f.parentNode.insertBefore(j, f);
        }
    })(window, document, "script", "ADU-8CD0H0NJ");
</script>
`.trim();

    return {
        head: "",
        body: isMobile ? mobileAdScript : desktopAdScript
    };
};

/**
 * A/Bテスト用に2つの広告ユニットを用意
 *
 * - ディスプレイ広告×2
 * - Multiplex広告×1（モバイルでは1×4、デスクトップでは3×2枠）
 */
const BOTTOM_AD_SCRIPT = [
    // 1つ目の広告ユニット
    `
<ins
    class="adsbygoogle"
    style="display: block; margin: 2rem 0 0 0;"
    data-ad-client="ca-pub-2526648882773973"
    data-ad-slot="3108993340"
    data-ad-format="rectangle, horizontal"
    data-full-width-responsive="false"></ins>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>
<ins
    class="adsbygoogle"
    style="display: block; margin: 1rem 0 0 0;"
    data-ad-client="ca-pub-2526648882773973"
    data-ad-slot="3108993340"
    data-ad-format="rectangle, horizontal"
    data-full-width-responsive="false"></ins>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>
    `.trim(),
    // 2つ目（Multiplex）の広告ユニット
    `
<ins class="adsbygoogle"
    style="display: block; width: 100%;"
    data-ad-format="autorelaxed"
    data-ad-client="ca-pub-2526648882773973"
    data-ad-slot="3546449335"
    data-matched-content-rows-num="4,2"
    data-matched-content-columns-num="1,3"
    data-matched-content-ui-type="image_sidebyside,image_stacked"></ins>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>
    `.trim()
];

/**
 * A/Bテスト用に2つの広告ユニットを用意
 *
 * - ディスプレイ広告（レクタングル）×2
 * - ディスプレイ広告（縦長）×1
 */
const SIDEBAR_BOTTOM_AD = [
    // 1つ目の広告ユニット
    `
<ins
    class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-2526648882773973"
    data-ad-slot="3438012431"
    data-ad-format="rectangle"
    data-full-width-responsive="false"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
<ins
    class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-2526648882773973"
    data-ad-slot="3438012431"
    data-ad-format="rectangle"
    data-full-width-responsive="false"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    `.trim(),
    // 2つ目（縦長）の広告ユニット
    `
<ins
    class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-2526648882773973"
    data-ad-slot="4720213014"
    data-ad-format="vertical"
    data-full-width-responsive="false"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    `.trim()
];

const selectRandomArray = (array) => array[Math.floor(Math.random() * array.length)];

export const onRequest = async (context) => {
    const { request, env } = context;
    const response = await env.ASSETS.fetch(request);

    const userAgent = request.headers.get("User-Agent");
    const isMobile = Boolean(userAgent.match(/iPhone|Android.+Mobile/u));

    // const adScripts = selectRandomArray([getMicroadAdScript(isMobile), I_MOBILE_AD_SCRIPTS]);
    const headAndBodyAdScripts = isMobile ? getMicroadAdScript(isMobile) : I_MOBILE_AD_SCRIPTS;
    const adScripts = selectRandomArray([
        {
            ...headAndBodyAdScripts,
            bottom: selectRandomArray(BOTTOM_AD_SCRIPT),
            sidebar: selectRandomArray(SIDEBAR_BOTTOM_AD)
        }
    ]);

    return new HTMLRewriter().on("*[data-ad-code-slot]", new ElementHandler(adScripts)).transform(response);
};

class ElementHandler {
    private adScripts: { [key: string]: string };

    constructor(adScripts: { [key: string]: string }) {
        this.adScripts = adScripts;
    }

    element(element: Element) {
        if (!element.hasAttribute("data-ad-code-slot")) return;

        const adCodeSlot = element.getAttribute("data-ad-code-slot");
        if (!(adCodeSlot in this.adScripts)) return;

        element.replace(this.adScripts[adCodeSlot], { html: true });
    }
}
