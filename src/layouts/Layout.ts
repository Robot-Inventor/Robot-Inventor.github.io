const header = document.querySelector("header");
if (!header) throw new Error("header is not defined");
const menu_button = document.getElementById("menu_button");
if (!menu_button) throw new Error("menu_button is not defined");

menu_button.addEventListener("click", () => {
    header.dataset.overlayMenu = header.dataset.overlayMenu === "closed" ? "opened" : "closed";
});

const menu_items = document.querySelectorAll("header nav a");
menu_items.forEach((item) => {
    item.addEventListener("click", () => {
        header.dataset.overlayMenu = "closed";
    });
});

const toc = document.querySelector<HTMLElement>(".toc");
const tocToggle = document.querySelector<HTMLElement>(".toc-toggle");
if (toc && tocToggle) {
    tocToggle.addEventListener("click", () => {
        toc.dataset.tocState = "opened";
    });
}
