---
title: Astroでカスタマイズ可能な目次を生成する「astro-custom-toc」
description: Astroでカスタマイズ可能な目次を生成するAstro integration「astro-custom-toc」を作りました！この記事では、astro-custom-tocの使い方や他のプラグインとの違い、カスタマイズ方法などについて説明します。
pubDate: "2024-03-03T20:40:50+09:00"
modifiedDate: "2024-03-04T01:33:49+09:00"
author: ろぼいん
showToc: true
tags:
    - markdown
    - astro
    - web-development
    - javascript
    - github
    - open-source
---

Astroでカスタマイズ可能な目次を生成するAstro integration「astro-custom-toc」を作りました！

この記事では、astro-custom-tocの使い方や他のプラグインとの違い、カスタマイズ方法などについて説明します。

<blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="ja" dir="ltr">I just released my first <a href="https://twitter.com/astrodotbuild?ref_src=twsrc%5Etfw">@astrodotbuild</a> integration! 🥳 It generates a customizable table of contents for your markdown pages.<br><br>初めてのAstro integrationを公開しました！🥳 Markdownのページにカスタマイズ可能な目次を生成します。<br><br>astro-custom-toc - npm<a href="https://t.co/RFDRF1qDhe">https://t.co/RFDRF1qDhe</a></p>&mdash; ろぼいん (@keita_roboin) <a href="https://twitter.com/keita_roboin/status/1764206314526572799?ref_src=twsrc%5Etfw">March 3, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!-- toc -->

## これは何？

astro-custom-tocは、Astroで任意の場所に任意の構造の目次を生成するためのAstro integrationです。MarkdownファイルとMDXファイルに対応しています。

https://github.com/Robot-Inventor/astro-custom-toc/

https://www.npmjs.com/package/astro-custom-toc

たとえば、次のようなMarkdownファイルがあったとします。

```markdown title="index.md" wrap=true
---
showToc: true
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<!-- toc -->

## hoge

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

### fuga

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

このファイルに対して、次のように目次を生成できます。目次を挿入する箇所や目次の構造は、自由に変更できます。

```html title="index.html"
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</p>
<aside class="toc">
    <h2>Contents</h2>
    <nav>
        <ul>
            <li>
                <a href="#hoge">hoge</a>
            </li>
            <ul>
                <li><a href="#fuga">fuga</a></li>
            </ul>
        </ul>
    </nav>
</aside>
<h2 id="hoge">hoge</h2>
<p>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</p>
<h3 id="fuga">fuga</h3>
<p>
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
```

## 他のプラグインとの違い

既存の主要なプラグインとしては、[remark-toc](https://github.com/remarkjs/remark-toc)があります。remark-tocは、[remark.js](https://github.com/remarkjs/remark)のプラグインで、基本的な機能をすべて備えています。

しかし、remark-tocにはいくつかの制限があります。デフォルトでは、目次は「Contents」「Table of contents」「ToC」などの見出しの下に生成されます。

これによって目次の位置を調整できますが、目次の構造はカスタマイズできません。また、目次を示す見出しを挿入したくない場合もあります。

私は次のような構造の目次を任意の場所に挿入する方法を探していました。

```html title="index.html"
<aside class="toc">
    <h2>目次</h2>
    <nav>
        <ul>
            <li>
                <a href="#hoge">hoge</a>
            </li>
            <ul>
                <li><a href="#fuga">fuga</a></li>
            </ul>
        </ul>
    </nav>
</aside>
```

これをremark-tocで実現するには、毎回``<aside class="toc"></aside>``と`<h2></h2>`を手動で挿入する必要があります。また、目次を``<nav></nav>``で囲むのは（おそらく）不可能です。

このような問題を解決するために、任意の場所に任意の構造の目次を生成する「astro-custom-toc」を開発しました

## インストール

ここからは、astro-custom-tocのインストール方法について説明します。

:::caution
このプラグインは[remark-comment](https://github.com/leebyron/remark-comment)を使用しています。コメントを利用する他のプラグインを利用している場合は、競合する可能性があります。
:::

### 自動インストール

astro-custom-tocは、``astro add``コマンドに対応しており、次のコマンドでインストールできます。

``astro add``を使う場合は、このコマンドだけで最低限の設定が完了します。

```bash
npx astro add astro-custom-toc
```

### 手動インストール

何らかの理由で``astro add``コマンドが使えない場合は、手動でインストールできます。

まず、次のコマンドでastro-custom-tocをインストールします。

```bash
npm install astro-custom-toc
```

次に、``astro.config.mjs``にastro-custom-tocを追加します。

```javascript title="astro.config.mjs" ins={2,8} ins="customToc()"
import { defineConfig } from "astro/config";
import customToc from "astro-custom-toc";

// https://astro.build/config
export default defineConfig({
    // ... other config
    integrations: [
        customToc()
    ]
});
```

:::caution
プロジェクトで[MDXインテグレーション](https://docs.astro.build/ja/guides/integrations-guide/mdx/)を利用している場合は、必ずMDXよりも前に読み込んでください。

```javascript title="astro.config.mjs" mark={8-9}
import { defineConfig } from "astro/config";
import customToc from "astro-custom-toc";

// https://astro.build/config
export default defineConfig({
    // ... other config
    integrations: [
        customToc(),
        mdx()
    ]
});
```

MDXよりもあとに読み込むと、次のようなエラーが発生します。

```txt frame="terminal" showLineNumbers=false
Unexpected character `!` (U+0021) before name, expected a character that can start a name, such as a letter, `$`, or `_` (note: to create a comment in MDX, use `{/* text */}`)
```

:::

## 使い方

astro-custom-tocのインストールが完了したら、実際に使ってみましょう。astro-custom-tocは、MarkdownファイルとMDXファイルに対応しています。

見出しを生成するには、frontmatterに``showToc: true``を追加し、目次を挿入したい場所に``<!-- toc -->``コメントを挿入します。

```markdown title="index.md" wrap=true mark={2,7}
---
showToc: true
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<!-- toc -->

## hoge

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
```

これで、astro-custom-tocが目次を生成し、コメントの位置に挿入します。``<!-- toc -->``コメントが見つからない場合は、先頭に目次が挿入されます。

## カスタマイズ

astro-custom-tocは、次のようなオプションを提供しています。

### ``template``

生成された目次のHTMLを受け取り、最終的なHTMLを返す関数です。これを使用して、目次をカスタムテンプレートでラップできます。

デフォルトのテンプレート関数：

```javascript
const defaultTemplate = (html) => {
    return `
<aside class="toc">
    <h2>Contents</h2>
    <nav>
        ${html}
    </nav>
</aside>`.trim();
};
```

### ``maxDepth``

生成される目次の最大の深さです。デフォルトは``3``で、``<h3>``までの見出しを目次に含めます。

### ``ordered``

目次を順序付きリスト（``<ol>``）にするかどうかです。デフォルトは``false``で、目次に``<ul>``を使用します。

### カスタマイズ例

私のブログでは、次のようなオプションを使用しています。

```javascript title="astro.config.mjs" mark={4-12,19}
import { defineConfig } from "astro/config";
import customToc from "astro-custom-toc";

const tocTemplate = (html) => {
    return `
<aside class="toc">
    <h2>目次</h2>
    <nav>
        ${html}
    </nav>
</aside>`.trim();
};

// https://astro.build/config
export default defineConfig({
    // ... other config
    integrations: [
        customToc({
            template: tocTemplate
        }),
        mdx()
    ]
});
```

## まとめ

astro-custom-tocは、Astroで任意の場所に任意の構造の目次を生成するためのAstro integrationです。remark-tocとは異なり、目次の位置や構造を自由に変更できます。

バグなどがあれば[GitHubのissue](https://github.com/Robot-Inventor/astro-custom-toc/issues)までお願いします。
