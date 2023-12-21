---
title: AstroをアップデートしたらRSSフィードを生成できなくなった
description: Astroをアップデートしたところ、それまで生成できていたRSSフィードが生成できなくなってしまいました。その解決方法を解説します。
pubDate: "2023-12-07T09:49:29+09:00"
author: ろぼいん
tags:
    - astro
    - web-development
---

Astroをアップデートしたところ、それまで生成できていたRSSフィードが生成できなくなってしまいました。その解決方法を解説します。

## 状況

RSSの生成には[@astrojs/rss](https://docs.astro.build/en/guides/rss/)を使用していました。

また、以前は正常に動作していましたが、AstroをアップデートしたところRSSフィードが生成されなくなってしまいました。エラーなどは表示されていません。Astroのどのバージョンから動かなくなっていたのかは不明です。

## 解決方法

`rss.xml.js`内の関数名を`get()`から`GET()`に変更するだけで直りました。

つまり、これを

```js
export function get(context) {
  return rss({
    // 色々なオプション
  });
}
```

このように変更すれば大丈夫でした。

```js
export function GET(context) {
  return rss({
    // 色々なオプション
  });
}
```

そういえば、少し前にビルド時に「小文字はサポートされなくなるから大文字にしてね」的なメッセージが出ていたような…？
