const default_card_type = window.innerHeight > window.innerWidth ? "landscape" : "normal";

const change_button = document.createElement("button");
toggle_button_label(default_card_type);

const article_list_area = document.createElement("div");
article_list_area.id = "article_list_area";

const loading_message = document.createElement("div");
loading_message.textContent = "読み込み中...";
article_list_area.appendChild(loading_message);

const article_container = document.getElementById("article_container_inner");

if (article_container) {
    article_container.appendChild(change_button);
    article_container.appendChild(article_list_area);
} else {
    console.error("#article_container_innerが見つかりませんでした");
}

const style = document.createElement("style");
style.textContent = `
#${article_list_area.id} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: flex-start;
}

article-card {
    flex-basis: calc(100% - 0.5rem);
}

@media (orientation: landscape) {
    article-card:not([card-type="landscape"]) {
        flex-basis: calc(50% - 0.5rem);
    }
}

article-card {
    margin-top: 1rem;
}
`;
document.body.appendChild(style);

function change_card_type(type: "landscape" | "normal") {
    document.querySelectorAll("article-card").forEach(element => element.setAttribute("card-type", type));
    change_button.dataset.currentType = type;
    toggle_button_label(type);
}

function toggle_button_label(type: "landscape" | "normal") {
    change_button.textContent = type === "landscape" ? "横表示に切り替え" : "縦表示に切り替え";
}

change_button.addEventListener("click", () => {
    if (change_button.dataset.currentType === "normal") change_card_type("landscape");
    else change_card_type("normal");
});

(async () => {
    const data_response = await fetch("article_data.json");
    const article_data = await data_response.json();

    Object.keys(article_data).forEach((key) => {
        const data = article_data[key];
        const card = document.createElement("article-card");

        Object.keys(data).forEach((attribute_name) => {
            card.setAttribute(attribute_name, data[attribute_name]);
        });

        article_list_area.appendChild(card);
    });

    change_card_type(default_card_type);
    loading_message.remove();
})();
