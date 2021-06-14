"use strict";
class InfoBlock extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const icon = document.createElement("div");
        icon.id = "icon";
        const icon_inner = document.createElement("div");
        icon_inner.id = "icon_inner";
        const icon_inner_text = document.createElement("div");
        icon_inner_text.id = "icon_inner_text";
        icon_inner_text.textContent = "i";
        icon_inner.appendChild(icon_inner_text);
        icon.appendChild(icon_inner);
        const contents = document.createElement("div");
        contents.id = "contents";
        const slot = document.createElement("slot");
        contents.appendChild(slot);
        const style = document.createElement("style");
        style.textContent = `
:host {
    background: var(--info_block_background_color);
    border: 0.1rem solid var(--info_block_border_color);
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: grid;
    grid-template-columns: 2.5rem 1fr;
    margin: 1rem 0;
}

#icon {
    grid-column: 1;
    display: flex;
    align-items: center;
}

#icon_inner {
    width: 1.5rem;
    height: 1.5rem;
    border: 0.1rem solid var(--info_block_border_color);
    border-radius: 1rem;
    display: flex;
    justify-content: center;
}

#icon_inner_text {
    color: #3FB0F3;
}

#contents {
    grid-column: 2;
    color: var(--info_block_font_color);
}
        `;
        shadow.appendChild(icon);
        shadow.appendChild(contents);
        shadow.appendChild(style);
    }
}
customElements.define("info-block", InfoBlock);
//# sourceMappingURL=info-block.js.map