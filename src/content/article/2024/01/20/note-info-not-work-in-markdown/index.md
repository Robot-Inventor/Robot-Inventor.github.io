---
title: Markdownでnoteやinfoを使えない理由と対処法
description: Markdownは、テキストをマークアップするための軽量な記法です。ブログやドキュメントの作成によく使用されています。Markdownでは、いくつかのキーワードを使用して、テキストのスタイルや構造を指定できます。一部のサイトでは、Markdownで「note」や「info」などのキーワードで注釈を表現できます。しかし、これらの機能が使えないことがあります。この記事では、Markdownで「note」や「info」を使用できない理由と代替方法についても紹介します。
author: ろぼいん
pubDate: "2024-01-20T16:56:24+09:00"
tags:
    - explanation
    - web-development
---

Markdownは、テキストをマークアップするための軽量な記法です。ブログやドキュメントの作成によく使用されています。Markdownでは、いくつかのキーワードを使用して、テキストのスタイルや構造を指定できます。

一部のサイトでは、Markdownで「note」や「info」などのキーワードで注釈を表現できます。しかし、これらの機能が使えないことがあります。

この記事では、Markdownで「note」や「info」を使用できない理由と代替方法についても紹介します。

## Note記法とは

Markdownで「note」や「info」といったキーワードを使って注釈を書く機能は、「**Note記法**」や「**メッセージ**」などと呼ばれています。Markdownの仕様ではなく、**各サイトで独自に実装されている機能**です。そのため、**サイトによっては使えないことがあります**。

主要なWebサイトでは、次のような構文で注釈を書けます。

たとえば、Qiitaでは次のような構文が[サポート](https://qiita.com/Qiita/items/c686397e4a0f4f11683d#note---%E8%A3%9C%E8%B6%B3%E8%AA%AC%E6%98%8E)されています。

```markdown
:::note info
補足などのメッセージ
:::

:::note warn
警告のメッセージ
:::

:::note alert
より強い警告のメッセージ
:::
```

また、Zennでは次のような構文が[サポート](https://zenn.dev/zenn/articles/markdown-guide#%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8)されています。

```markdown
:::message
警告のメッセージ
:::

:::message alert
より強い警告のメッセージ
:::
```

GitHubでは、次のような構文が[サポート](https://github.com/orgs/community/discussions/16925)されています。

```markdown
> [!NOTE]
> 補足などのメッセージ

> [!TIP]
> tipのメッセージ

> [!IMPORTANT]
> 重要なメッセージ

> [!WARNING]
> 警告のメッセージ

> [!CAUTION]
> より強い警告のメッセージ
```

## VS CodeでNote記法を使う

前述のように、Note記法はMarkdownの仕様ではないため一部のサイトでしか利用できません。しかし、**VS Codeでは拡張機能をインストールするとNote記法を使えるようになります**。

Markdown向けの便利な機能が搭載されている、拡張機能の「[Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)」をインストールすると、VS CodeでもGitHubと同様の記法を使えるようになります。

## 任意のMarkdownパーサーでNote記法を使う

主要なMarkdownパーサーでは、プラグインを使うことでNote記法を利用できるようになります。

[Marked](https://github.com/markedjs/marked)では、筆者が開発した[qnote-parser](https://github.com/Robot-Inventor/qnote)というプラグインを利用できます。また、[remark](https://github.com/remarkjs/remark)では[remark-github-beta-blockquote-admonitions](https://github.com/myl7/remark-github-beta-blockquote-admonitions)というプラグインを利用できます。

前者はQiitaのNote記法、後者はGitHubのNote記法に対応しています。

ちなみに、このブログではStarlightというドキュメント作成フレームワークの[コード](https://github.com/withastro/starlight/blob/f12efa789f27fa3f6a7828847d63be6dce7b3ccc/packages/starlight/integrations/asides.ts)の一部を利用しています。Starlightでは、次のような構文でNote記法を使えます。remarkを使っている場合は、Starlightのコードを参考にしてもよいでしょう。

```markdown
:::note
補足などのメッセージ
:::

:::tip
tipのメッセージ
:::

:::caution
警告のメッセージ
:::

:::danger
より強い警告のメッセージ
:::
```

## まとめ

Markdownで「note」や「info」を使えない理由と対処法について紹介しました。主要なWebサイトやMarkdownパーサーなどでは、Note記法やそれに似た記法を使えるようになっています。

Note記法を使うと情報を整理しやすくなるため、ぜひ活用してみてください。
