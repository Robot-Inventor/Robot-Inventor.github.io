const open_twitter_button = document.getElementById("open_twitter_button");
const tweet_url_text_box = document.getElementById("tweet_url_textbox");

open_twitter_button.addEventListener("click", () => {
    const tweet_url = tweet_url_text_box.value.trim();
    if (!tweet_url.length) {
        alert("テキストボックスに元ツイートのURLを入力してください");
        return;
    }

    try {
        const url_parser = new URL(tweet_url);
        if (
            !["mobile.twitter.com", "twitter.com"].includes(url_parser.hostname)
        ) {
            alert(
                "TwitterではないURLが検出されました。TwitterのURLを入力してください"
            );
            return;
        }

        const video_url = `${url_parser.origin}${url_parser.pathname.replace(
            /\/$/,
            ""
        )}/video/1`;
        window.open(
            `https://twitter.com/intent/tweet?url=${video_url}`,
            "_blank"
        );
    } catch (error) {
        alert(
            `エラーが発生しました。正しいURLを入力しているか確認してください。\n\nエラーメッセージ：\n${error.message}`
        );
        console.error(error);
    }
});
