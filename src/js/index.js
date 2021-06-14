"use strict";
const menu_overlay = document.getElementById("menu_overlay");
const menu_icon = document.getElementById("menu_icon");
const menu_close_icon = document.getElementById("menu_bar_close_icon");
const menu_bar = document.getElementById("menu_bar");
/**
 * メニューを開く
 */
function open_menu() {
    menu_overlay.setAttribute("data-open", "");
    menu_bar.setAttribute("data-open", "");
    menu_icon.setAttribute("data-type", "close");
}
/**
 * メニューを閉じる
 */
function close_menu() {
    menu_overlay.removeAttribute("data-open");
    menu_bar.removeAttribute("data-open");
    menu_icon.removeAttribute("data-type");
}
/**
 * URLをコピーする
 */
function copy_url() {
    const textarea = document.createElement("textarea");
    textarea.textContent = location.href;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
}
/**
 * 指定したSNSでページを共有する
 * @param type 共有に使用するSNS。twitter、facebook、lineのうち1つ
 */
function share(type) {
    const url_table = {
        twitter: `https://twitter.com/intent/tweet?text=${document.head.querySelector("title").textContent}&url=${location.href}&via=keita_roboin`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${location.href}`,
        line: `https://social-plugins.line.me/lineit/share?url=${location.href}`,
    };
    window.open(url_table[type], "_blank");
}
menu_icon.addEventListener("click", () => {
    if (menu_icon.hasAttribute("data-type"))
        close_menu();
    else
        open_menu();
});
menu_overlay.addEventListener("click", close_menu);
/**
 * シェアボタンを読み込む
 */
function initialize_share_button() {
    document.getElementById("article_container_inner").insertAdjacentHTML("beforeend", `
<button id="share_button">
    <div id="share_button_overlay"></div>
    <img src="/src/icon/twitter.svg" id="share_button_twitter" alt="Twitter">
    <img src="/src/icon/facebook.png" id="share_button_facebook" alt="Facebook">
    <img src="/src/icon/line.png" id="share_button_line" alt="LINE">
    <img src="/src/icon/share_white.svg" alt="アイコン" id="share_button_icon">
    <div id="share_button_copy">
        <img src="/src/icon/link.svg" alt="コピー">
    </div>
    <div id="share_button_more">
        <img src="/src/icon/more.svg" alt="その他">
    </div>
    <div id="share_button_close"></div>
</button>
    `);
    const share_button = document.getElementById("share_button");
    setTimeout(() => {
        share_button.setAttribute("data-show", "");
    }, 1000);
    share_button.addEventListener("click", () => {
        if (share_button.hasAttribute("data-active"))
            share_button.removeAttribute("data-active");
        else
            share_button.setAttribute("data-active", "");
    });
    const share_button_twitter = document.getElementById("share_button_twitter");
    share_button_twitter.addEventListener("click", () => {
        if (share_button.hasAttribute("data-active"))
            share("twitter");
    });
    const share_button_facebook = document.getElementById("share_button_facebook");
    share_button_facebook.addEventListener("click", () => {
        if (share_button.hasAttribute("data-active"))
            share("facebook");
    });
    const share_button_line = document.getElementById("share_button_line");
    share_button_line.addEventListener("click", () => {
        if (share_button.hasAttribute("data-active"))
            share("line");
    });
    const share_button_copy = document.getElementById("share_button_copy");
    share_button_copy.addEventListener("click", () => {
        if (share_button.hasAttribute("data-active"))
            copy_url();
    });
    const share_button_more = document.getElementById("share_button_more");
    if (navigator.share !== undefined)
        share_button_more.style.display = "block";
    share_button_more.addEventListener("click", () => {
        if (!share_button.hasAttribute("data-active"))
            return;
        const share_data = {
            title: document.head.querySelector("title").textContent || "",
            url: location.href
        };
        navigator.share(share_data);
    });
}
function on_scroll_process() {
    if (window.scrollY >= window.innerHeight / 2) {
        window.removeEventListener("scroll", on_scroll_process);
        const site_logo = document.getElementById("site_logo");
        site_logo.setAttribute("src", site_logo.dataset.src || "");
        site_logo.setAttribute("alt", site_logo.dataset.alt || "");
        site_logo.setAttribute("data-show", "");
        document.getElementById("site_logo_placeholder").remove();
        initialize_share_button();
    }
}
window.addEventListener("scroll", on_scroll_process);
//# sourceMappingURL=index.js.map