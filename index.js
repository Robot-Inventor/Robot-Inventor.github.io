(async () => {
    const articleCard = document.getElementById("latest-article");

    const response = await fetch("/article/article_data.json");
    const json = await response.json();
    const firstKey = Object.keys(json)[0];
    const latestArticleData = json[firstKey];
    for (const key of Object.keys(latestArticleData)) {
        articleCard.setAttribute(key, latestArticleData[key]);
    }
})();
