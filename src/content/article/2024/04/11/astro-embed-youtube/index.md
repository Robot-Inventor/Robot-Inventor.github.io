---
title: AstroにYouTubeを埋め込む「astro-embed-youtube」の使い方
description: AstroでYouTubeの通常の埋め込みコードを使用すると、ページの読み込み速度が低下してしまいます。この記事ではパフォーマンスを維持しながらAstroベースのサイトにYouTubeを埋め込める「astro-embed-youtube」を紹介します。
pubDate: "2024-04-11T16:44:20+09:00"
thumbnail: thumbnail
showToc: true
author: ろぼいん
tags:
    - web-development
    - astro
    - markdown
    - javascript
    - typescript
    - youtube
    - open-source
---

Astroは、近年人気が高まっている静的サイトジェネレーターです。フレームワークに依存せず、フロントエンドで動作させる必要があるスクリプトがないため、高速なページ読み込みが特徴です。

しかし、AstroでYouTubeの通常の埋め込みコードを使用すると、ページの読み込み速度が低下してしまいます。YouTubeの埋め込みコードは速度を重視していないため、PageSpeed Insightsなどのツールで評価が低下してしまいます。

そこで、この記事ではパフォーマンスを維持しながらAstroベースのサイトにYouTubeを埋め込める「[astro-embed-youtube](https://astro-embed.netlify.app/components/youtube/)」を紹介します。

<!-- toc -->

## astro-embed-youtubeとは

astro-embed-youtubeは、AstroにYouTubeを埋め込むためのコンポーネントです。

通常のYouTubeの埋め込みコードは、ページの読み込み速度が低下してしまいます。一方で、astro-embed-youtubeを使用することでパフォーマンスを維持しながらYouTubeを埋め込めます。

astro-embed-youtubeの内部では[Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed)が使われています。動画が埋め込まれた箇所には、デフォルトではサムネイル画像とYouTubeのロゴのみが表示されます。ユーザーがクリックしてはじめてYouTubeの``iframe``が読み込まれるため、ページの読み込み速度が低下しません。

Lite YouTube Embedの公式ドキュメントによると、YouTubeの埋め込みを224倍高速にレンダリングできるとのことです。

astro-embed-youtubeを使うと、このLite YouTube EmbedをAstroで簡単に利用できます。

:::caution
astro-embed-youtubeはコンポーネントなので、AstroファイルとMDXファイルでのみ利用できます。通常のMarkdownファイルでは利用できません。
:::

## インストール方法

astro-embed-youtubeは、次のコマンドでインストールできます。

```shell
npm install @astro-community/astro-embed-youtube
```

:::note
astro-embed-youtubeは、[Astro Embed](https://astro-embed.netlify.app/)の一部としても提供されています。ツイートやリンクカード、Vimeoなどの埋め込みもまとめて使いたい場合は、Astro Embedをインストールすることをオススメします。

```shell
npm install astro-embed
```

:::
