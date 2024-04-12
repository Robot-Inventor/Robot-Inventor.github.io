---
title: Astro v4.6リリース！i18n強化やCSRF保護などが追加
description: 2023年4月11日に、静的サイトジェネレーターであるAstroの最新バージョンAstro 4.6がリリースされました。このバージョンでは、国際化のための手動ルーティング戦略や開発者ツールバーの移動機能、CSRF保護の実験的サポートなど、多数の新機能と改善が追加されています。
pubDate: "2024-04-13T00:23:00+09:00"
thumbnail: ./thumbnail.webp
showToc: true
author: ろぼいん
tags:
    - astro
    - news
    - web-development
    - github
    - open-source
---

2023年4月11日に、静的サイトジェネレーターであるAstroの最新バージョン**Astro 4.6**がリリースされました。

このバージョンでは、**国際化のための手動ルーティング戦略**や**開発者ツールバーの移動機能**、**CSRF保護の実験的サポート**など、多数の新機能と改善が追加されています。この記事では、Astro 4.6の主要な変更点について解説します。

<!-- toc -->

## Astro v4.6の注目機能

Astro v4.6では次の機能が新たに追加されました。

- **手動i18nルーティング戦略**
- **開発者ツールバーの位置変更機能**
- **実験的なCSRF保護のサポート**
- **Cookieの改善**
- **旧バージョンのNode.jsのサポート終了**

それでは、これらの機能について一つずつ詳しく見ていきましょう。

### 手動i18nルーティング戦略

Astro v4.6では、**国際化（i18n）のための手動ルーティング戦略**が導入されました。この機能を利用することで、国際化されたAstroサイトのルーティングをより詳細に制御できるようになります。これは、デフォルトのルーティング戦略では不十分な場合に便利です。

手動ルーティングを有効にするには、``astro.config.mjs``で``i18n.routing``オプションを``manual``に設定します。

```js title="astro.config.mjs"
import { defineConfig } from "astro/config";

export default defineConfig({
    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "fr",
        routing: "manual",
    }
});
```

次に、ルーティングを処理するための[middlewareをプロジェクトに追加](https://docs.astro.build/en/guides/middleware/)します。

### 開発者ツールバーの位置変更機能

Astro v4.6では、**開発者ツールバーの位置を画面の下部の異なる位置に移動させる機能**が追加されました。これは、画面下部にヘッダーがある場合や、ツールバーを別の位置に移動させたい場合に役立ちます。

### 実験的なCSRF保護のサポート

Astro v4.6では、[CSRF保護](https://developer.mozilla.org/ja/docs/Glossary/CSRF)に対する**実験的な部分サポート**が追加されました。この機能は現在実験的なフラグの下にあり、将来的に変更される可能性があります。

CSRF保護を有効にするには、``astro.config.mjs``で``experimental.security.csrfProtection``オプションを設定します。ただし、この機能はSSRモードでのみサポートされています。

```js title="astro.config.mjs"
import { defineConfig } from "astro/config";

export default defineConfig({
    experimental: {
        security: {
            csrfProtection: {
              origin: true
            }
        }
    }
});
```

### Cookieの改善

AstroのCookie削除用ヘルパー（``Astro.cookies.delete``）では、``path``と``domain``属性だけでなく、**より多くの属性を設定できるようになりました**。これにより、Cookieの削除がより柔軟になり、より正確な制御が可能になります。

### 旧バージョンのNode.jsのサポート終了

新しいバージョンのAstroでは、[Node.jsのサポートポリシー](https://docs.astro.build/en/upgrade-astro/#nodejs-support-and-upgrade-policies)に従い、古いバージョンのNode.jsのサポートが終了しました。サポートが終了したバージョンを使用している場合でも、Astro v5がリリースされるまでは引き続き使用できますが、**いくつかの機能が期待どおりに動作しない可能性があります**。

## Astroのアップグレード方法

既存のプロジェクトをAstro v4.6にアップグレードするには、``@astrojs/upgrade``を使用できます。または、パッケージマネージャーのアップグレードコマンドを実行して手動でアップグレードすることもできます。

```shell
npx @astrojs/upgrade
```

```shell
npm install astro@latest
pnpm upgrade astro --latest
yarn upgrade astro --latest
```

## まとめ

Astro v4.6では、開発者がより細かい制御を行えるように多くの機能が追加・改善されています。とくに、国際化のための手動ルーティング戦略やCSRF保護のサポートなどの有用な機能が追加されています。

Astroの最新バージョンを使用することで、より柔軟で安全なWebサイトを構築できるようになります。Astroの公式ドキュメントを参照して、新しい機能を活用してみてください。

## 参考

- [Astro 4.6 | Astro](https://astro.build/blog/astro-460/)
