---
title: 既存のFigmaプラグインをDynamic Page Loadingに対応させる
description: 私は「Smart Chroma」というFigmaプラグインを開発しています。先日、Figmaから「ファイルの読み込み時間を短縮するdynamic page loadingをロールアウト中だからプラグインを新しいAPI対応させてね」というメールが届きました。ということで、今回は公式のガイドに従いながら、既存のFigmaプラグインをDynamic Page Loadingに対応させる方法を紹介します。
pubDate: "2024-03-10T23:09:40+09:00"
showToc: true
author: ろぼいん
tags:
    - figma
    - javascript
    - programming
---

私は「[Smart Chroma](https://www.figma.com/community/plugin/1202157980535479255/smart-chroma)」というFigmaプラグインを開発しています。

https://www.figma.com/community/plugin/1202157980535479255/smart-chroma

先日、Figmaから「ファイルの読み込み時間を短縮するDynamic Page Loadingをロールアウト中だから、プラグインを新しいAPIに対応させてね」というメールが届きました。現時点で既存のプラグインを必ずしも修正する必要はありませんが、4月以降に新規公開する場合は必ず対応する必要があるようです。

ということで、今回は[公式のガイド](https://www.figma.com/plugin-docs/migrating-to-dynamic-loading/)に従いながら、既存のFigmaプラグインをDynamic Page Loadingに対応させる方法を紹介します。

<!-- toc -->

## 型定義を更新する

新しいAPIが追加されたり、既存のAPIが非推奨になっていたりするので、まずは型定義を更新します。GitHubのコミット履歴を見たところ、[v1.88.0以降にアップデートすれば良さそう](https://github.com/figma/plugin-typings/commit/e1514f5407e7339b3d8cbdc64834735696bd2a9c)でした。

この作業は、TypeScriptを使用していない場合は不要です。

```bash
npm uninstall @figma/plugin-typings
npm install -D @figma/plugin-typings
```

## ESLintを追加する

更新が必要な箇所を半自動的に修正してくれるESLintのプラグインが提供されています。まだESLintを導入していない場合は導入してから、プラグインをインストールします。

```bash
npm install -D @figma/eslint-plugin-figma-plugins
```

```jsonc title=".eslintrc.json" ins={5}
{
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@figma/figma-plugins/recommended"
    ],
    // ...
}
```

あとは、ESLintにしたがって修正すれば、対応が完了します。

:::note
公式のESLintプラグインは、TypeScriptにのみ対応しています。JavaScriptを使っている場合や、ESLintを導入したくない場合は、次の正規表現を使うと修正が必要な箇所を簡易的に検索できます。

```regex showLineNumbers=false
((figma\.getNodeById)|(figma\.getStyleById)|(figma\.getFileThumbnailNode)|(figma\.getLocalTextStyles)|(figma\.getLocalPaintStyles)|(figma\.getLocalEffectStyles)|(figma\.getLocalGridStyles)|(figma\.variables\.getVariableById)|(figma\.variables\.getVariableCollectionById)|(figma\.variables\.getLocalVariableCollections)|(figma\.variables\.getLocalVariables)|(\.instances)|(\.consumers)|(\.mainComponent)|(\.effectStyleId =)|(\.fillStyleId =)|(\.gridStyleId =)|(\.textStyleId =)|(\.backgroundStyleId =)|(\.strokeStyleId =)|(\.setRangeTextStyleId)|(\.setRangeFillStyleId)|(\.setRangeTextStyleId)|(\.setRangeFillStyleId)|(\.setBoundVariable)|(figma\.variables\.setBoundVariableForPaint)|(createVariable))
```

出典：[Migrating Plugins to Dynamically Load Pages | Plugin API](https://www.figma.com/plugin-docs/migrating-to-dynamic-loading/)

:::

私の場合は、とくに修正が必要な箇所はなさそうでした。Dynamic Page Loadingではプロジェクトを動的に読み込むようになるため、要素を検索して取得するようなコードがある場合は修正が必要です。

## マニフェストの修正

``manifest.json``に``"documentAccess": "dynamic-page"``を追加します。これによって、プラグインがDynamic Page Loadingに対応していることをFigmaに伝えられます。

```jsonc title="manifest.json" ins={3}
{
    // ...
    "documentAccess": "dynamic-page"
}
```

## アップデートの公開

ここまでの修正が完了したら、Figmaで正しくプラグインが動作することを確認して、アップデートを公開します。お疲れ様でした！

## おまけ

プラグインを公開してから1年間アップデートしていなかったので、開発中のプラグインをFigmaに読み込む方法が変わっていて戸惑いました。

以前はプロフィールのアイコンをクリックして設定の中から読み込めたと思うのですが、現在は任意のファイルを開いて左上のFigmaロゴをクリックし、［プラグイン］>［開発］>［マニフェストからプラグインをインポート］から読み込めるようです。

また、依存関係をまとめてアップデートしたせいで、[エラーが出て2時間半くらい悩みました](https://twitter.com/keita_roboin/status/1766764696802386197)。結局、HCT色空間を扱うために使っていた``@material/material-color-utilities``が原因でした。

material-color-utilitiesを使うコードをバックエンドからUIのコード（フロントエンド）に移動したら動きました。たぶん、Figmaのプラグインのバックエンドで実行できる処理には制限があり、その制限に引っかかってしまったのでしょう。

私が公開しているSmart Chromaの詳しい仕組みはこちらの記事で解説しているので、気になる方はぜひ読んでみてください。

https://qiita.com/Robot-Inventor/items/ae087297bff8d8e6c465

## 参考

- [Version 1, Update 87 | Plugin API](https://www.figma.com/plugin-docs/updates/2024/02/21/version-1-update-87/)
- [Migrating Plugins to Dynamically Load Pages | Plugin API](https://www.figma.com/plugin-docs/migrating-to-dynamic-loading/)
