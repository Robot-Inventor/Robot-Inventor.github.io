---
title: Astro v4.4リリース！開発ツールバーやパフォーマンス改善をチェック
pubDate: "2024-02-16T03:14:56+09:00"
description: Astroはコンテンツファーストの静的サイトジェネレーターです。その最新バージョンであるAstro v4.4がリリースされました。このアップデートは、開発者の生産性向上とパフォーマンス改善に焦点を当てています。この記事では、Astro v4.4の主要なアップデートポイントを紹介します。
thumbnail: ./post-header-4.4.webp
author: ろぼいん
tags:
    - astro
    - news
    - github
    - web-development
---

[Astro](https://astro.build/)はコンテンツファーストの静的サイトジェネレーターです。その最新バージョンである**Astro v4.4**がリリースされました。

このアップデートは、開発者の生産性向上とパフォーマンス改善に焦点を当てています。この記事では、Astro v4.4の主要なアップデートポイントを紹介します。

## 開発ツールバーのパフォーマンス監査機能

**パフォーマンス監査**はAstro v4.4の目玉機能の一つです。アクセシビリティ監査機能に続き、この新機能はWebサイトのパフォーマンス問題を特定し、解決策を提案するのに役立ちます。

たとえば、開発ツールバーは画面上部に配置された遅延読み込みの画像を警告し、より優れたパフォーマンスのために**イーガーロード**を推奨します。

多くのWebサイトでは、最初の通信量を減らして高速化するために画像を遅れて読み込む「遅延読み込み」が使われています。しかし、最初に表示されるビューポート内の画像が遅延読み込みされると、パフォーマンスが悪化することが[知られています](https://web.dev/articles/browser-level-image-lazy-loading?hl=ja#avoid_lazy_loading_images_that_are_in_the_first_visible_viewport)。

Astro v4.4の開発ツールバーはこのような問題を特定し、修正するためのガイダンスを提供します。

## 監査リストUI

Astro v4.4から、開発ツールバーの監査アプリには、検出された問題の小さなUIが含まれるようになりました。このリストを使うと対処すべき問題が一目でわかり、問題のあるページ部分に素早く移動して修正できます。

今後、このUIはさらに改善され、各問題についての詳細情報や修正方法に関するガイダンスが提供される予定です。

## ストリーミングパフォーマンスの改善

Astroは[Node.js](https://nodejs.org/)上での``ReadableStreams``のパフォーマンスが想定以上に遅いことを発見し、``AsyncIterable``を使用するよう移行しました。この変更により、大きなサイドバーをもつ[Starlight](https://starlight.astro.build/ja/)ベースのWebサイトの**ビルド時間が最大で47%短縮**されるなど、顕著なパフォーマンス向上が見られました。

## リモート画像の寸法を自動推測

Astro v4.4はリモートの画像の寸法を**自動的に推測**できるようになりました。新しい``inferSize``属性を使うことで、従来必須だった``width``と``height``の属性を省略できます。

これはCMSや他の外部ソースからの画像を扱うときなど、ビルド時に画像の寸法が分からない場合にとくに便利です。

```astro
---
import { Image, Picture } from "astro:assets";
---

<Image src="https://example.com/image.jpg" alt="A cool image" inferSize />
<Picture src="https://example.com/image.jpg" alt="A cool image" inferSize />
```

ただし、この機能を使用するととくにSSRを使用している場合にパフォーマンスが悪化するとのことです。そのため、必要な場合にのみ使用することが推奨されています。

この機能の詳細は[公式ドキュメント](https://docs.astro.build/en/guides/images/#infersize)を参照してください。

## まとめ

次のいずれかのコマンドを実行すると、Astroをv4.4にアップデートできます。

```bash
npx @astrojs/upgrade
npm install astro@latest
pnpm upgrade astro --latest
yarn upgrade astro --latest
```

このリリースには多数のバグ修正も含まれています。詳細は[リリースノート](https://github.com/withastro/astro/blob/refs/heads/main/packages/astro/CHANGELOG.md#440)で確認できます。

## 参考

- [Astro 4.4 | Astro](https://astro.build/blog/astro-440/)
