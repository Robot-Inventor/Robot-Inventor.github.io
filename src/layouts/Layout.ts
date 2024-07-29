const toc = document.querySelector<HTMLElement>(".toc");
const tocToggle = document.querySelector<HTMLElement>(".toc-toggle");
if (toc && tocToggle) {
    tocToggle.addEventListener("click", () => {
        toc.dataset.tocState = "opened";
    });
}
