---
layout: /src/layouts/Layout.astro
title: 文字数カウンター
description: 文字数をできるだけ正確にカウントします。データはサーバーに送信されません。
author: ろぼいん
pubDate: "2024-01-13T01:36:36+09:00"
---

文字数をできるだけ正確にカウントします。データはサーバーに送信されません。

<textarea id="input" placeholder="ここに文字を入力してください。"></textarea>

<input type="checkbox" id="count-line-breaks" checked><label for="count-line-breaks">改行を数える</label>

<div id="result">文字数：</div>

<style>
    #input {
        width: 100%;
        max-width: 35rem;
        height: 10rem;
        font-size: 1rem;
        font-family: sans-serif;
        padding: 0.5rem;
        box-sizing: border-box;
        resize: vertical;
        background: transparent;
    }
</style>

<script>
    if (Intl.Segmenter === undefined) {
        alert("お使いのブラウザーには対応していません。最新バージョンにアップデートするか、Chromeをお使いください。")
    }

    const input = document.querySelector("#input");
    const countLineBreaks = document.querySelector("#count-line-breaks");
    const result = document.querySelector("#result");

    const updateCounter = () => {
        const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
        const text = countLineBreaks.checked ? input.value : input.value.replace(/\n/g, "");
        const length = [...segmenter.segment(text)].length;
        result.textContent = `文字数：${length}文字`;
    };

    input.addEventListener("input", updateCounter);
    countLineBreaks.addEventListener("change", updateCounter);
</script>
