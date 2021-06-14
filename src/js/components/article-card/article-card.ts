class ArticleCard extends HTMLElement {
    outer: HTMLDivElement;
    inner: HTMLAnchorElement;
    img: HTMLImageElement;
    title_element: HTMLDivElement;
    description_element: HTMLDivElement;

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        this.outer = document.createElement("div");
        this.outer.id = "outer";
        this.outer.setAttribute("card-type", this.getAttribute("card-type") || "");

        this.inner = document.createElement("a");
        this.inner.id = "inner";
        this.inner.href = this.getAttribute("link") || "";

        const image_outer = document.createElement("div");
        image_outer.id = "image_outer";

        this.img = document.createElement("img");
        this.img.src = this.getAttribute("thumbnail") || "";
        this.img.alt = "サムネイル";
        this.img.loading = "lazy";
        this.img.decoding = "async";

        const text_outer = document.createElement("div");
        text_outer.id = "text_outer";

        this.title_element = document.createElement("div");
        this.title_element.id = "title";
        this.title_element.textContent = this.getAttribute("article-title");

        this.description_element = document.createElement("div");
        this.description_element.id = "description";
        this.description_element.textContent = this.getAttribute("description");

        const style = document.createElement("style");
        style.textContent = `
:host {
    display: block;
}

#outer {
    border: 0.1rem solid var(--table_border_color);
    border-radius: 0.5rem;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    height: 100%;
}

#inner {
    text-decoration: none;
    height: 100%;
}

#outer[card-type="landscape"] #inner {
    display: grid;
    grid-template-columns: 20% 1fr;
}

#outer:not([card-type="landscape"]) #image_outer {
    width: 100%;
    position: relative;
    padding-bottom: 50%;
}

#outer[card-type="landscape"] #image_outer {
    height: 100%;
    position: relative;
    padding-left: 100%;
}

#image_outer img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

#outer:not([card-type="landscape"]) #text_outer {
    border-top: 0.1rem solid var(--table_border_color);
    padding: 1rem;
}

#outer[card-type="landscape"] #text_outer {
    border-left: 0.1rem solid var(--table_border_color);
    padding: 1rem;
}

#title {
    color: var(--high_emphasis_font_color);
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

#description {
    font-size: 90%;
    color: var(--medium_emphasis_font_color);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding-top: 0.5rem;
}
        `;

        image_outer.appendChild(this.img);
        text_outer.appendChild(this.title_element);
        text_outer.appendChild(this.description_element);
        this.inner.appendChild(image_outer);
        this.inner.appendChild(text_outer);
        this.outer.appendChild(this.inner);
        shadow.appendChild(this.outer);
        shadow.appendChild(style);
    }

    static get observedAttributes() {
        return ["thumbnail", "article-title", "description", "link", "card-type"];
    }

    attributeChangedCallback(name: string, old_value: string, new_value: string) {
        switch (name) {
            case "thumbnail":
                this.img.src = new_value;
                break;

            case "article-title":
                this.title_element.textContent = new_value;
                break;

            case "description":
                this.description_element.textContent = new_value;
                break;

            case "link":
                this.inner.href = new_value;
                break;

            case "card-type":
                this.outer.setAttribute("card-type", new_value);
                break;
        }
    }

    get thumbnail() {
        return this.getAttribute("thumbnail") || "";
    }

    set thumbnail(value: string) {
        this.setAttribute("thumbnail", value || "");
    }

    get articleTitle() {
        return this.getAttribute("article-title") || "";
    }

    set articleTitle(value: string) {
        this.setAttribute("article-title", value || "");
    }

    get description() {
        return this.getAttribute("description") || "";
    }

    set description(value: string) {
        this.setAttribute("description", value || "");
    }

    get link() {
        return this.getAttribute("link") || "";
    }

    set link(value: string) {
        this.setAttribute("link", value || "");
    }

    get cardType() {
        return this.getAttribute("card-type") || "";
    }

    set cardType(value: string) {
        this.setAttribute("card-type", value || "");
    }
}

customElements.define("article-card", ArticleCard);
