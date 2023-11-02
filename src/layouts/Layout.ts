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

const links = document.querySelectorAll("main > article a") as NodeListOf<HTMLAnchorElement>;
links.forEach((link) => {
    // 外部リンクを新しいタブで開く
    if (!link.href.startsWith(location.origin)) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    }
});
