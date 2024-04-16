---
title: node-tar v7で破壊的な変更が加えられた件
description: node-tar 7では、従来のコードが動作しなくなる破壊的な変更が含まれています。この記事では、どのような変更が加えられたのか、既存のコードをどのように変更すればよいのかについて解説します。
pubDate: "2024-04-17T00:52:26+09:00"
showToc: true
author: ろぼいん
tags:
    - web-development
    - typescript
    - javascript
    - programming
    - explanation
    - nodejs
---

node-tar 7では、従来のコードが動作しなくなる破壊的な変更が含まれています。この記事では、どのような変更が加えられたのか、既存のコードをどのように変更すればよいのかについて解説します。

<!-- toc -->

## node-tar 7の変更点

node-tarは、``tar``パッケージとしてnpmで提供されている、tarアーカイブを操作するためのライブラリです。

```shell
npm install tar
```

node-tar 7はTypeScriptベースになり、ES ModulesとCommonJSのデュアルパッケージになりました。その関係で、従来のコードが動作しなくなる破壊的な変更が含まれています。

## コードの修正方法

### ES Modulesの場合

ES Modulesの場合、従来は次のようなコードでnode-tarを利用できました。

```javascript title="example.js"
// ES Modules
import tar from "tar";

tar.x({
  file: "archive.tar.gz"
});
```

しかし、node-tar 7からは、上記のコードは動作しません。従来のコードを使用すると、``TypeError``が発生します。

```ansi
[0;31;1m    await tar.x({
              ^
TypeError: Cannot read properties of undefined (reading 'x')
```

従来のコードは次のように修正する必要があります。

```diff lang="javascript" title="example.js"
-import tar from "tar";
+import * as tar from "tar";

tar.x({
  file: "archive.tar.gz"
});
```

または、次のように書くこともできます。

```javascript title="example.js"
import { x as extract } from "tar";

extract({
  file: "archive.tar.gz"
});
```

Tree Shakingによる最適化の恩恵を受けたい場合は、次のように書くと、最低限の関数のみをインポートできます。

```javascript title="example.js"
import { extract } from "tar/x";

extract({
  file: "archive.tar.gz"
});
```

### CommonJSの場合

CommonJSの場合は、従来と同じコードが動作します。

```javascript title="example.js"
// CommonJS
const tar = require("tar");

tar.x({
  file: "archive.tar.gz"
});
```

### TypeScriptの場合の注意点

node-tar 7は、従来のVanilla JSからTypeScriptベースに変わりました。従来はDefinitely Typedから[型定義（``@types/tar``）](https://www.npmjs.com/package/@types/tar)をインストールする必要がありましたが、node-tar 7からは型定義が同梱されているため、別途インストールする必要がなくなりました。

記事執筆時点では、Definitely Typedの型定義がnode-tar 7に対応していないため、コード補完が正しく動作しない可能性があります。不要になった型定義をアンインストールし、node-tarのビルトインの型定義を使用することをオススメします。

```shell
npm uninstall @types/tar
```

## 参考

- [tar - npm](https://www.npmjs.com/package/tar)
- [node-tar/CHANGELOG.md at main · isaacs/node-tar](https://github.com/isaacs/node-tar/blob/main/CHANGELOG.md)
- [@types/tar - npm](https://www.npmjs.com/package/@types/tar)
