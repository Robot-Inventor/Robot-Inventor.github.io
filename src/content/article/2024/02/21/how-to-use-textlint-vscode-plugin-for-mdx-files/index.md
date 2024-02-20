---
title: textlintをMDXファイルで使う方法
description: textlintのVS CodeプラグインをMDXファイルで使う方法を紹介します。
pubDate: "2024-02-21T02:00:54+09:00"
author: ろぼいん
tags:
    - vscode
    - github
    - web-development
    - how-to
    - markdown
    - open-source
    - programming
---

タイトルのとおり、[MDX](https://github.com/mdx-js/mdx)ファイルで[textlint](https://github.com/textlint/textlint)を使う方法を紹介します。

textlintは文章校正に非常に役立ちますが、その[VS Codeプラグイン](https://marketplace.visualstudio.com/items?itemName=taichi.vscode-textlint)は、デフォルトではMDXファイルをサポートしていません。

MDXファイルに対してもtextlintが適用されるようにするには、[@textlint/textlint-plugin-markdown](https://www.npmjs.com/package/@textlint/textlint-plugin-markdown)をインストールします。

```shell
npm install @textlint/textlint-plugin-markdown
```

次に、`.textlintrc`に次のような設定を追加します。

```jsonc title=".textlintrc" ins={2-6}
{
    "plugins": {
        "@textlint/markdown": {
            "extensions": [".mdx"]
        }
    },
    // ルールの記述など
}
```

設定を変更したら、VS Codeを再起動してください。これで、MDXファイルに対してもtextlintが適用されるようになります。

## 参考

- [textlint/packages/@textlint/textlint-plugin-markdown at master · textlint/textlint](https://github.com/textlint/textlint/tree/master/packages/@textlint/textlint-plugin-markdown)
