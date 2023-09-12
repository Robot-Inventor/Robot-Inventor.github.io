const header = document.querySelector("header") as HTMLElement | null;
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

document.addEventListener("astro:page-load", () => {
    const links = document.querySelectorAll("main > article a") as NodeListOf<HTMLAnchorElement>;
    links.forEach((link) => {
        if (!link.href.endsWith("/")) {
            link.setAttribute("data-astro-reload", "");
        }
    });
});
