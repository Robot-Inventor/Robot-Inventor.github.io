"use strict";
class YtVideo extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        const video_id = this.getAttribute("video-id");
        this.iframe = document.createElement("iframe");
        this.iframe.title = "YouTube video player";
        this.iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        this.iframe.setAttribute("allowfullscreen", "");
        this.iframe.src = `https://www.youtube-nocookie.com/embed/${video_id}`;
        const style = document.createElement("style");
        style.textContent = `
:host {
    display: block;
}

iframe {
    width: 100%;
    aspect-ratio: 16/9;
    border: none;
    border-radius: 0.5rem;
    overflow: hidden;
}
        `;
        this.shadow.appendChild(style);
        // 遅延読み込みの処理
        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting)
                return;
            this.shadow.appendChild(this.iframe);
            observer.disconnect();
        });
        observer.observe(this);
    }
    static get observedAttributes() {
        return ["video-id"];
    }
    attributeChangedCallback(name, old_value, new_value) {
        if (new_value !== "video-id")
            return;
        this.iframe.src = `https://www.youtube-nocookie.com/embed/${new_value}`;
    }
    get videoId() {
        return this.getAttribute("video-id") || "";
    }
    set videoId(value) {
        this.setAttribute("video-id", value);
    }
}
customElements.define("yt-video", YtVideo);
//# sourceMappingURL=yt-video.js.map