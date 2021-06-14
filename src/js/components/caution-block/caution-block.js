"use strict";
class CautionBlock extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const icon = document.createElement("div");
        icon.id = "icon";
        icon.insertAdjacentHTML("beforeend", `
<svg id="icon_inner" width="16" height="16" version="1.1" viewBox="0 0 4.2333 4.2333" xmlns="http://www.w3.org/2000/svg">
    <path d="m2.1172 0.26758a0.12452 0.12452 0 0 0-0.10742 0.0625l-1.9922 3.4492a0.12452 0.12452 0 0 0 0.10742 0.1875h3.9844a0.12452 0.12452 0 0 0 0.10742-0.1875l-1.9922-3.4492a0.12452 0.12452 0 0 0-0.10742-0.0625zm0 0.37109 1.7773 3.0781h-3.5547z" />
    <rect x="1.9677" y="1.3774" width=".29798" height="1.517" ry=".14899" />
    <circle cx="2.1167" cy="3.1978" r=".15712" />
</svg>
        `);
        const contents = document.createElement("div");
        contents.id = "contents";
        const slot = document.createElement("slot");
        contents.appendChild(slot);
        const style = document.createElement("style");
        style.textContent = `
:host {
    background: var(--caution_block_background_color);
    border: 0.1rem solid var(--caution_block_border_color);
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
    fill: var(--caution_block_border_color);
}

#contents {
    grid-column: 2;
    color: var(--caution_block_font_color);
}
        `;
        shadow.appendChild(icon);
        shadow.appendChild(contents);
        shadow.appendChild(style);
    }
}
customElements.define("caution-block", CautionBlock);
//# sourceMappingURL=caution-block.js.map