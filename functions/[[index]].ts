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

const getMicroadAdScript = (type: "mobile" | "desktop") => {
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
        body: type === "mobile" ? mobileAdScript : desktopAdScript
    };
};

const TWOBET_AD_SCRIPTS = {
    head: '<script type="text/javascript" src="https://adsby.2bet.co.jp/roboindisplay.js"></script>',
    body: ""
};

const selectRandomArray = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

const getDesktopAdScript = () => {
    const microadOrIMobile = selectRandomArray([getMicroadAdScript("desktop"), I_MOBILE_AD_SCRIPTS]);

    return {
        head: microadOrIMobile.head + TWOBET_AD_SCRIPTS.head,
        body: microadOrIMobile.body + TWOBET_AD_SCRIPTS.body
    } as const;
};

const getMobileAdScript = () => {
    const adScripts = selectRandomArray([getMicroadAdScript("mobile"), I_MOBILE_AD_SCRIPTS, TWOBET_AD_SCRIPTS]);

    return adScripts;
};

export const onRequest: PagesFunction = async (context) => {
    const { request, env } = context;
    const response = await env.ASSETS.fetch(request);

    const userAgent = request.headers.get("User-Agent");
    const isMobile = Boolean(userAgent.match(/iPhone|Android.+Mobile/u));

    const headAndBodyAdScripts = isMobile ? getMobileAdScript() : getDesktopAdScript();
    const adScripts = selectRandomArray([
        {
            ...headAndBodyAdScripts
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
