class YtVideo extends HTMLElement {
    shadow: ShadowRoot;
    iframe: HTMLIFrameElement;

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });

        const video_id = this.getAttribute("video-id");

        const outer = document.createElement("div");
        outer.id = "outer";

        this.iframe = document.createElement("iframe");
        this.iframe.title = "YouTube video player";
        this.iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        this.iframe.setAttribute("allowfullscreen", "");
        this.iframe.src = `https://www.youtube-nocookie.com/embed/${video_id}`;

        const style = document.createElement("style");
        style.textContent = `
:host {
    display: block;
    border-radius: 0.5rem;
    overflow: hidden;
}

#outer {
    width: 100%;
    padding-bottom: 56.25%;
    position: relative;
}

#outer iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
        `;

        this.shadow.appendChild(style);
        this.shadow.appendChild(outer);

        // 遅延読み込みの処理
        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) return;

            outer.appendChild(this.iframe);
            observer.disconnect();
        });
        observer.observe(this);
    }

    static get observedAttributes() {
        return ["video-id"];
    }

    attributeChangedCallback(name: string, old_value: string, new_value: string) {
        if (new_value !== "video-id") return;

        this.iframe.src = `https://www.youtube-nocookie.com/embed/${new_value}`;
    }

    get videoId() {
        return this.getAttribute("video-id") || "";
    }

    set videoId(value: string) {
        this.setAttribute("video-id", value);
    }
}

customElements.define("yt-video", YtVideo);
