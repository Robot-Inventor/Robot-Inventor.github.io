---
title: Markdownで簡単改行！remark-breaksプラグインの使い方
description: Markdownで（改段落ではなく）改行するには、行末に半角スペースを2つ入れるか、<br/>タグを使用する必要があり、煩わしさを感じさせます。remark-breaksは、このような問題を解決する、remark.jsのプラグインです。
pubDate: "2024-03-20T16:38:18+09:00"
thumbnail: ./image.png
author: ろぼいん
tags:
    - astro
    - markdown
    - javascript
    - web-development
    - how-to
    - programming
---

Markdownで（改段落ではなく）改行するには、行末に半角スペースを2つ入れるか、``<br/>``タグを使用する必要があり、煩わしさを感じさせます。

**remark-breaks**は、このような問題を解決する、remark.jsのプラグインです。remark.jsの公式のプラグインとして提供されており、remark.jsを使っているプロジェクトであれば、簡単に導入できます。

## なぜremark-breaksが必要なのか？

Markdownで文書を作成しているときは、改行ではなく改段落を用いることが多いですが、改行を手軽に使いたいときもあります。たとえば、ブログの文章では、人によっては改行を多用することがあります。

そのような場合、従来の改行方法では非常に手間がかかります。Markdownでは、段落を変えるためには空行を挿入しますが、行内での改行（改段落ではない）をするには、行末に半角スペース2つを追加するか、``<br/>``タグを用いる必要があります。

また、コードフォーマッターは、しばしば行末のスペースを削除してしまいます。これによって、意図的に挿入した改行が消えてしまうという問題も存在します。

remark-breaksプラグインを使用すると、改行したい場所で単純にエンターキーを押すだけで、自然な改行がMarkdown文書に反映されるようになります。Word文書のように直感的に改行できるようになるため、Markdownで改行を多用する場合は非常に便利です。

## remark-breaksの導入方法

remark-breaksを使うには、Markdownパーサーとしてremark.jsを使っている必要があります。remark.jsは、Markdown文書を解析し、変換するためのJavaScriptライブラリです。

既存のプロジェクトに導入するにはまず、remark-breaksをインストールします。次に、remark.jsの設定にremark-breaksをプラグインとして追加します。

```sh
npm install remark-breaks
```

```javascript ins={2,16}
import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const markdown = `
# Hello, world!

This is a paragraph.
This is another paragraph.
`.trim();

const result = await unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

console.log(result.toString());
```

Astroを使っている場合は、``astro.config.mjs``にremark-breaksを追加します。

```javascript title="astro.config.mjs" ins={2,12}
import { defineConfig } from "astro/config";
import remarkBreaks from "remark-breaks";

// https://astro.build/config
export default defineConfig({
    site: "https://example.com",
    integrations: [
        // ...
    ],
    markdown: {
        remarkPlugins: [
            remarkBreaks
        ],
        rehypePlugins: [
            // ...
        ]
    }
});
```

これにより、Markdown中での改行がそのまま反映されるようになります。

## まとめ

remark-breaksは、Markdown文書中で簡単に改行できるようにするremark.jsのプラグインです。従来の改行方法では手間がかかるため、改行を多用する場合には非常に便利です。

remark-breaksを使うには、remark.jsを使っている必要があります。既存のプロジェクトに導入するには、remark-breaksをインストールし、remark.jsの設定にremark-breaksをプラグインとして追加します。

remark-breaksを使うことで、Markdown文書中での改行が直感的になります。これにより、Markdown文書の作成がより快適になります。
