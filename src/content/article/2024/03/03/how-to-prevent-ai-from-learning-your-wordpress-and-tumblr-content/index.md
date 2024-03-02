---
title: WordPressやTumblrがAIに学習されるのを防ぐ方法
description: WordPressやTumblrを使っていると、自分の作成したコンテンツがAIに学習される可能性があることをご存知ですか？もし、自分のブログや記事がAIの学習素材として利用されるのを防ぎたい場合、どうすればよいのでしょうか。この記事では、オプトアウトの設定方法を詳しく解説します。
pubDate: "2024-03-03T02:46:05+09:00"
showToc: true
author: ろぼいん
tags:
    - news
    - ai
    - how-to
---

WordPress.comやTumblrを使っていると、自分の作成したコンテンツがAIに学習される可能性があることをご存知ですか？もし、自分のブログや記事がAIの学習素材として利用されるのを防ぎたい場合、どうすればよいのでしょうか。

この記事では、オプトアウトの設定方法を詳しく解説します。

:::note
今回問題となっているのは、WordPress.comです。WordPress.org（自分でホスティングするWordPress）は、この問題には関係ないことに注意してください。
:::

## WordPressやTumblrのコンテンツはAIの学習に利用される

[404 Mediaによる報道](https://www.404media.co/tumblr-and-wordpress-to-sell-users-data-to-train-ai-tools/)で、WordPress.comやTumblrの運営元の[Automattic](https://automattic.com/)がユーザーデータを収集し、OpenAIやMidjourneyのようなAI企業に販売しようとしていることが明らかになりました。

これは、AI技術が急速に進化し、コンテンツ制作や消費の方法までも変革している現代において重要な話題です。

AIは、機械学習によってインターネット上の大量のデータから学び、進化します。そのため、公開されているブログや記事がAIの学習材料として使用される可能性があります。

報道を受けて、WordPress.comとTumblrには、AI企業へのデータ提供を拒否する設定が追加され、検索エンジンのインデックス除外と同じように設定できるようになりました。

なお、この設定は「オプトアウト」になっており、デフォルトではAI企業にデータが提供される設定になっています。

### Automatticの主張

Automatticは、主要なAIプラットフォームのクローラーをブロックしていると[主張](https://automattic.com/2024/02/27/protecting-user-choice/)しています。一方で、提携しているAI企業には、オプトアウトしていないユーザーの公開コンテンツを提供するとしています。

また、AI企業に提供するデータについて、「[Jetpack](https://jetpack.com/ja/)や[WooCommerce](https://woo.com/woocommerce/)のようなAutomatticのプラグインを使用していても、他の場所でホストされているサイトのコンテンツは含まれていません」と述べています。

## WordPressとTumblrでAIの学習を防ぐ方法

### WordPressでの対策

WordPress.comでは、［サードパーティのデータ共有を防止する］という新しいオプションが導入されました。これにより、公開ブログのコンテンツがAIプラットフォームを含む第三者と共有されるのを防ぐことができます。

設定方法は次のとおりです。

1. WordPress.comの設定にアクセスし、［一般］>［プライバシー］セクションを開きます
2. ［Prevent third-party data sharing（サードパーティのデータ共有を防止する）］オプションを有効にします

もし、すでにサイトの検索エンジンによるクロールを抑制する設定をしている場合、この新しい設定は自動的に適用されます。

### Tumblrでの対策

Tumblrも同様に、［サードパーティとの共有の防止］というオプションを追加しました。これにより、公開ブログのコンテンツが第三者、とくにAIプラットフォームと共有されることを回避できます。

設定方法は次のとおりです。

1. TumblrのWebインターフェース経由で、公開ブログのブログ設定にアクセスします
2. ［サードパーティとの共有の防止］オプションを有効にします

検索クロールの抑制設定をすでに有効にしている場合、このオプションも自動的に有効化されます。

## まとめ

WordPress.comやTumblrを使っている場合、自分の作成したコンテンツがAIの学習素材として利用される可能性があることを知っておくことが重要です。

WordPress.comでは、［サードパーティのデータ共有を防止する］オプションを有効にすることで、AIプラットフォームとのデータ共有を防ぐことができます。Tumblrでも同様に、［サードパーティとの共有の防止］オプションを有効にすることで、対策が可能です。

自分のコンテンツがAIの学習素材として利用されるのが気になる場合は、設定を確認してみてください。

## 参考

- [Tumblr and WordPress to Sell Users’ Data to Train AI Tools](https://www.404media.co/tumblr-and-wordpress-to-sell-users-data-to-train-ai-tools/)
- [Protecting User Choice – Automattic](https://automattic.com/2024/02/27/protecting-user-choice/)
- [More Control Over the Content You Share – WordPress.com News](https://wordpress.com/blog/2024/02/27/more-control-over-the-content-you-share/)
- [Tumblr Staff — Hi, Tumblr. It’s Tumblr. We’re working on some...](https://staff.tumblr.com/post/743510217982083072/hi-tumblr-its-tumblr-were-working-on-some)
