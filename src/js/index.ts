type FilteredKeys<T extends object, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

const menu_overlay = document.getElementById("menu_overlay")!;
const menu_icon = document.getElementById("menu_icon")!;
const menu_close_icon = document.getElementById("menu_bar_close_icon")!;
const menu_bar = document.getElementById("menu_bar")!;

const copyright = document.getElementById("copyright")!;
copyright.textContent = `Copyright © ${new Date().getFullYear()} Robot-Inventor All rights reserved.`;

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
function share(type: "twitter" | "facebook" | "line") {
    const url_table = {
        twitter: `https://twitter.com/intent/tweet?text=${document.head.querySelector("title")!.textContent}&url=${
            location.href
        }&via=keita_roboin`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${location.href}`,
        line: `https://social-plugins.line.me/lineit/share?url=${location.href}`
    };
    window.open(url_table[type], "_blank");
}

menu_icon.addEventListener("click", () => {
    if (menu_icon.hasAttribute("data-type")) close_menu();
    else open_menu();
});

menu_overlay.addEventListener("click", close_menu);

class ShareButtonElement {
    readonly button: HTMLElement;
    readonly twitter: HTMLElement;
    readonly facebook: HTMLElement;
    readonly line: HTMLElement;

    readonly copy: HTMLElement;
    readonly more: HTMLElement;

    private readonly status_attribute = "data-active";

    constructor() {
        this.button = this.create_button();

        const overlay = this.create_overlay();

        this.twitter = this.create_twitter();
        this.facebook = this.create_facebook();
        this.line = this.create_line();

        const share_icon = this.create_share_icon();

        this.copy = this.create_copy();
        this.more = this.create_more();

        const close = this.create_close();

        const fragment = document.createDocumentFragment();

        fragment.appendChild(overlay);
        fragment.appendChild(this.twitter);
        fragment.appendChild(this.facebook);
        fragment.appendChild(this.line);
        fragment.appendChild(share_icon);
        fragment.appendChild(this.copy);
        fragment.appendChild(this.more);
        fragment.appendChild(close);

        this.button.appendChild(fragment);
    }

    private create_button() {
        const button = document.createElement("button");
        button.id = "share_button";
        return button;
    }

    private create_overlay() {
        const overlay = document.createElement("div");
        overlay.id = "share_button_overlay";
        return overlay;
    }

    private create_twitter() {
        const twitter = document.createElement("img");
        twitter.src = "/src/icon/twitter.svg";
        twitter.id = "share_button_twitter";
        twitter.alt = "Twitter";
        return twitter;
    }

    private create_facebook() {
        const facebook = document.createElement("img");
        facebook.src = "/src/icon/facebook.png";
        facebook.id = "share_button_facebook";
        facebook.alt = "Facebook";
        return facebook;
    }

    private create_line() {
        const line = document.createElement("img");
        line.src = "/src/icon/line.png";
        line.id = "share_button_line";
        line.alt = "LINE";
        return line;
    }

    private create_share_icon() {
        const icon = document.createElement("img");
        icon.src = "/src/icon/share_white.svg";
        icon.alt = "アイコン";
        icon.id = "share_button_icon";
        return icon;
    }

    private create_copy() {
        const outer = document.createElement("div");
        outer.id = "share_button_copy";
        const icon = document.createElement("img");
        icon.src = "/src/icon/link.svg";
        icon.alt = "コピー";
        outer.appendChild(icon);
        return outer;
    }

    private create_more() {
        const outer = document.createElement("div");
        outer.id = "share_button_more";
        const icon = document.createElement("img");
        icon.src = "/src/icon/more.svg";
        icon.alt = "その他";
        outer.appendChild(icon);
        return outer;
    }

    private create_close() {
        const close = document.createElement("div");
        close.id = "share_button_close";
        return close;
    }

    show() {
        this.button.setAttribute("data-show", "");
    }

    toggle_status() {
        if (this.button.hasAttribute(this.status_attribute)) this.button.removeAttribute(this.status_attribute);
        else this.button.setAttribute(this.status_attribute, "");
    }

    get is_active() {
        return this.button.hasAttribute(this.status_attribute);
    }
}

/**
 * シェアボタンを読み込む
 */
function initialize_share_button() {
    const share_button = new ShareButtonElement();
    document.getElementById("article_container_inner")!.appendChild(share_button.button);

    setTimeout(() => {
        share_button.show();
    }, 1000);

    share_button.button.addEventListener("click", () => {
        share_button.toggle_status();
    });

    const basic_share = ["twitter", "facebook", "line"] as const;
    for (const share_type of basic_share) {
        share_button[share_type as FilteredKeys<ShareButtonElement, HTMLElement>].addEventListener("click", () => {
            if (share_button.is_active) share(share_type);
        });
    }

    share_button.copy.addEventListener("click", () => {
        if (share_button.is_active) copy_url();
    });

    if (navigator.share !== undefined) {
        share_button.more.style.display = "block";
        share_button.more.addEventListener("click", () => {
            if (!share_button.is_active) return;

            const share_data = {
                title: document.title || "",
                url: location.href
            };
            navigator.share(share_data);
        });
    }
}

function on_scroll_process() {
    if (window.scrollY >= window.innerHeight / 2) {
        window.removeEventListener("scroll", on_scroll_process);

        const site_logo = document.getElementById("site_logo")!;
        site_logo.setAttribute("src", site_logo.dataset.src || "");
        site_logo.setAttribute("alt", site_logo.dataset.alt || "");
        site_logo.setAttribute("data-show", "");
        document.getElementById("site_logo_placeholder")!.remove();

        initialize_share_button();
    }
}

window.addEventListener("scroll", on_scroll_process);
