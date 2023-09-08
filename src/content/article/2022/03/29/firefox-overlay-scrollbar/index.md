---
description: Windows 11では、さまざまなソフトでオーバーレイスクロールバーが採用されています。Firefoxのオーバーレイスクロールバーを有効にする方法について説明します。
title: FirefoxでWindows 11のオーバーレイスクロールバーを有効にする
pubDate: "2022-03-29T01:00:23.783+09:00"
modifiedDate: "2022-03-29T09:34:04.676+09:00"
author: ろぼいん
thumbnail: ./windows11_version_information.png
showThumbnail: false
---

:::note alert
この記事の内容は、開発中の機能を有効にするものを含みます。バージョンによって操作方法が変更されたり、機能を有効にすることで不具合が生じたりする可能性があります。自己責任で試してください。
:::

Windows 11では、さまざまなソフトでオーバーレイスクロールバーが採用されています。この記事では、Firefoxのオーバーレイスクロールバーを有効にする方法について説明します。

## 動作確認環境

この記事は、次のような環境で動作確認しています。環境が違うと操作方法などが異なる場合があります。

- OS：Windows 11 21H2（22000.556）
- Firefox：Developer Edition v99.0b8

![Windows 11 21H2](./windows11_version_information.png)

![Firefox v99.0b8](./firefox99_information.png)

## オーバーレイスクロールバーとは

最初に、オーバーレイスクロールバーがどのようなものか説明します。やり方だけ知りたい場合は読み飛ばしてください。

通常のスクロールバーがこれです。左が何もしていないとき、右がスクロールバーにマウスを乗せたときです。

![通常のスクロールバー](./normal_scrollbar.png)

そして、これがオーバーレイスクロールバーです。先ほどと同様に、左が何もしていないとき、右がマウスを乗せたときです。

![オーバーレイスクロールバー](./overlay_scrollbar.png)

スクロールバーがコンテンツを邪魔しないようになっています。また、一定時間スクロールしないとスクロールバーが非表示になる機能も付いています。

## 有効にする方法

オーバーレイスクロールバーを有効にする方法について説明します。

まず、Firefoxのアドレスバーに``about:config``と入力します。注意をよく読み、理解したうえで［危険性を承知の上で使用する］をクリックします。

![注意書き](./about_config.png)

［設定名を検索］と書かれた検索ボックスに``overlay``と入力します。

![overlayの検索結果](./about_config_search_result.png)

表示された検索結果のうち、次の2つの項目の矢印⇌をクリックし、``false``から``true``に変更します。

- ``widget.non-native-theme.win11.scrollbar.force-overlay-style``
- ``widget.windows.overlay_scrollbars.enabled``

![falseからtrueに変更したようす](./overlay_true.png)

ブラウザーを再起動すると、オーバーレイスクロールバーが有効になります。
