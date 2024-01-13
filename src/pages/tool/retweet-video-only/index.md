---
layout: /src/layouts/Layout.astro
title: 動画だけ引用リツイートするツール
description: Twitterには、動画だけを引用してリツイートできる機能があります。このツールに引用元ツイートのURLを貼り付けると、動画だけを引用したツイートの作成画面が開きます。
thumbnail: ./thumbnail.png
author: ろぼいん
pubDate: "2022-07-31T11:25:14.918+09:00"
modifiedDate: "2022-07-31T12:19:06.701+09:00"
---

![ロゴ](./thumbnail.png)

<input type="url" placeholder="ここにツイートのURLを貼り付ける" id="tweet_url_textbox" autofocus="">
<button id="open_twitter_button">ツイート画面を開く</button>

<style>
    :root {
        --twitter-blue: #1d9bf0;
    }

    #tweet_url_textbox {
        min-width: 100%;
        max-width: 100%;
        background: inherit;
        color: inherit;
        border: solid 0.1em;
        padding: 0.5em 0.25em;
        margin-top: 2em;
        border-width: 0.1rem;
        border-radius: 0.25em;
    }

    #tweet_url_textbox::placeholder {
        color: inherit;
        opacity: 0.5;
    }

    #open_twitter_button {
        padding: 0.5em 1em;
        border-radius: 0.25em;
        background: none;
        border: solid 0.1em var(--twitter-blue);
        color: var(--twitter-blue);
        cursor: pointer;
        transition: 0.3s;
        margin: 1em 0em;
    }

    #open_twitter_button:hover {
        background: var(--twitter-blue);
        color: white;
    }
</style>

<script>
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
</script>

## 説明

Twitterには、動画だけを引用リツイートできる機能があります。このツールに引用元ツイートのURLを貼り付けると、動画だけを引用したツイートの作成画面が開きます。

## 使い方

1. 動画が含まれた引用したいツイートを用意する
2. 共有ボタンなどからツイートのURLをコピーする
3. このツールのテキストボックスに貼り付ける
4. ［ツイート画面を開く］をクリック

## 用途

このツールは、たとえば次のような用途で利用できます。

- おもしろい動画を見つけて引用リツイートしたいが、通常の引用リツイートだと見た目がごちゃごちゃするとき
- 自分の過去の動画をツイートに添付したいが、毎回動画をアップロードし直すのが面倒なとき
  - 配信者さんが毎週固定ツイートを更新する際、動画だけ引用リツイートすれば、毎回アップロードせずに自己紹介動画を添付できる

## 注意事項

- このツールはTwitterの機能を利用しているものの、ツール自体はTwitter非公式です
- このツールを使用して生じたいかなる損害やトラブルの責任も負いません。自己責任で利用してください
- 他人のツイートから動画のみ引用リツイートする場合、無断転載だと勘違いされる可能性があります。特別な理由がない限り、他人のツイートは普通の引用リツイートを利用することを推奨します
- 動画のみ引用リツイートした場合、その動画の再生数は元ツイートの再生数として扱われます
