---
description: AIの統合など、Google検索の新機能を試せるGoogle Search Labsが一部のユーザー限定で公開されました。この記事では、Search Labsの新機能を実際に使ってみて、日本最速でレビューします。
title: Google検索がAI搭載で進化！　Search Labsを日本最速レビュー
pubDate: "2023-06-01T19:34:11.518+09:00"
modifiedDate: "2023-08-31T02:02:00+09:00"
author: ろぼいん
thumbnail: ./2023-05-31-11-02-23.png
showThumbnail: false
tags: ["chrome", "microsoft", "google"]
---

![Search Labsの設定画面](./2023-05-31-11-02-23.png)

## Search Labsとは

Search Labsは、Google検索の新機能の実験に参加できるプログラムです。Googleが開発中のAI関連のさまざまな機能にアクセスできます。記事執筆時点では3つの新機能が用意されており、それらを試してフィードバックを送れます。

この記事では、使えるようになったばかりのSearch Labsを実際に使ってみて、日本最速（※）でレビューします！

※日本人による日本語での最速のレビュー記事。筆者調べ。

## 使い方

Search Labsは現在、順番待ちリストに登録した少数のユーザーにのみ提供されています。まずは、[登録ページ](https://labs.google.com/search/)にアクセスして、順番待ちリストに登録してください。

順番待ちリストは現在、次のすべての条件を満たすユーザーのみ登録できます。~~日本での展開時期は記事執筆時点では発表されていません。~~ 2023年8月30日から日本でも利用できるようになりました！

- ~~アメリカからアクセスしていること~~ アメリカか日本からアクセスしていること
- Googleの[言語設定](https://myaccount.google.com/language)が~~英語になっていること~~ 英語か日本語になっていること
- PC版のGoogle Chromeか、スマホのGoogleアプリからアクセスしていること

数日から数週間ほど待つと、Search Labsにアクセスできるようになったことを伝える通知が届きます。私の場合は5月15日に登録し、5月31日にスマホのGoogleアプリの通知として届きました。

![Search Labsが使えるようになったことを知らせる通知](./2023-05-31-11-09-32.png)

通知をタップするか、Search Labsの[設定ページ](https://labs.google.com/search/onboarding)を開くと、このような画面が表示されます。

![Search Labsの設定画面](./2023-05-31-11-02-23.png)

［Get started］をクリックすると、Search Labsで利用可能な機能を個別にオンオフできる[ページ](https://labs.google.com/search/experiments)が表示されます。

![Search Labsの個別の機能が表示されており、それぞれオンオフを切り替えられる](./2023-05-31-11-12-41.png)

SGEとCode Tipsは「Ends Dec 2023」、Add to Sheetsは「Ends Sep 2023」と表示されていることから、それぞれのテストは今年の12月と9月に終了することが分かります。ベータ扱いが解除され、一般提供されるのがその時期なのかもしれません。

## SGEを使ってみる

SGE（*Search Generative Experience*）は、Google検索とチャットAIを統合した新機能です。有効にすると、検索結果の上部に結果のまとめが表示され、個別のWebページを開かなくても情報を得られるようになります。

SGEを有効にするには、前述のページでトグルスイッチをオンにします。プライバシーポリシーと利用規約が表示されるので、同意して続行する場合は［I agree］をクリックします。

![プライバシーポリシーと利用規約が表示されたダイアログ](./2023-05-31-11-18-19.png)

同意すると［Try an example］というボタンが有効になるので、これをクリックします。

![［Try an example］というボタンがクリック可能になっている](./2023-05-31-11-19-21.png)

すると、Google検索の画面が開き、検索ボックスの下に［Generating…］というメッセージが表示されます。また、検索結果の各ページのリンクが水色から白に変更されています。これは人によって好みが分かれそうです。

![検索ボックスの下部に［Generating…］と表示されている](./2023-05-31-11-23-32.png)

少し待つと、画像のように検索ボックスの下に検索結果の概要が表示されました。また、概要の文章の右隣にはいくつかの画像付きリンクがカルーセル形式で表示され、下部には［Ask a follow up］というボタンと、追加の質問の候補が表示されます。

![検索ボックスの下に検索結果の概要が表示されている](./2023-05-31-11-39-04.png)

もし、概要が表示されずに画像のように「Can't generate an AI overview right now. Try again later.」と表示された場合は、ブラウザーにインストールしている拡張機能を無効にしてみてください。私の場合は[ClearURLs](https://chrome.google.com/webstore/detail/clearurls/lckanjgmijmafbedllaakclkaicjfmnk)が原因でした。

![概要を生成できなかったというメッセージが表示されている](./2023-05-31-11-21-36.png)

では、今度は別のキーワードで検索してみます。「Major news in Japan today」と入力すると、今日の主要なニュースのまとめが表示されました。まとめ部分の背景色は毎回変わるようです。

![主要なニュースのまとめが表示されている](./2023-05-31-11-37-24.png)

［Ask a follow up］をクリックしてみます。するとチャット画面が表示され、AIに追加の質問をできるようになります。

![チャット画面が表示される](./2023-05-31-11-43-42.png)

では、台風のニュースについて詳しく聞いてみます。「Please tell me more about the typhoon approaching Okinawa.」と入力して送信すると、沖縄に接近中の台風について詳しく教えてくれました。

![沖縄に接近中の台風について詳しく説明を求めたようす](./2023-05-31-11-48-46.png)

スクロールすると、追加の質問の候補といくつかのWebページへのリンクが表示されます。

![追加の質問の候補とWebページへのリンクが表示されている](./2023-05-31-11-52-03.png)

~~また、回答を日本語に翻訳できるか尋ねたところ「Here are some results」とだけ表示され、翻訳はしてくれませんでした。その他にも日本語で質問をしてみましたが、同様の挙動でした。やはり、現在はまだ英語のみの対応のようです。~~ 現在は日本語に対応しています。

![回答を日本語に翻訳するよう頼んだが、「Here are some results」としか表示されなかった](./2023-05-31-11-55-17.png)

## Code Tipsを使ってみる

今度は、Code Tipsを使ってみます。Code TipsはJavaScript、Pythonなどのトピックを検索するだけで、検索結果にコードのヒントが直接表示される機能です。SGEのときと同様の手順で有効化します。

［Try an example］をクリックすると、JavaScriptのコードが表示されました。内容を確認すると、正しくコードを書けていることが分かります。

![生成されたJavaScriptのコードが表示されているようす](./2023-05-31-12-05-25.png)

指定した場所の天気を取得するツールのコードを、JavaScriptで書くように依頼したところ、［No AI response to that search］と表示され、コードは生成されませんでした。どうやら、簡単なコードしか生成できないようです。

より複雑なコードを生成したければ[Google Bard](https://bard.google.com/)を使ってね、ということかもしれません。（もしそうなら［Bardで開く］みたいなボタンがあると嬉しいですね）

![複雑なコードを依頼するとコードが生成されない](./2023-05-31-12-10-08.png)

## Add to Sheetsを使ってみる

Add to Sheetsは、検索結果を直接Googleスプレッドシート（Google Sheets）に追加できるようになる機能です。

Add to Sheetsも同様の手順で有効化します。［Start planning］というボタンをクリックすると、いくつかの旅行の候補が表示されました。

![検索ボックスの下に旅行の候補が表示されている](./2023-06-01-18-39-30.png)

検索結果のリンクの上にカーソルを乗せると、左隣にメニューが表示されるようになりました。

![検索結果のリンクの横にメニューが表示されている](./2023-06-01-18-43-16.png)

メニューの中には3つのボタンが用意されており、それぞれ上から順に次の操作ができます。

- [コレクション](https://www.google.com/save)のFavorite pagesへ追加
- リンクとタイトルをFacebook、Twitter、またはメールで共有
- Googleスプレッドシートに追加

今回は、一番下のボタンでGoogleスプレッドシートに追加してみます。既存のスプレッドシートに追加するか、新しくスプレッドシートを作成するかを選択できます。ここでは、新しくスプレッドシートを作成してみます。

![追加先のスプレッドシートの選択画面](./2023-06-01-18-56-12.png)

シート名を入力して次へ進むと、画面の下にシートへの保存が完了したというメッセージが表示されます。メッセージ内のリンクをクリックすることで、保存したスプレッドシートを開けます。どうやら、この機能は単純にスプレッドシートへリンクを挿入するだけのようです。

![スプレッドシートのスクリーンショット](./2023-06-01-18-59-31.png)

何かこう…もう少しすごいものを期待していたのでちょっと期待外れです。

## まとめ

今回、Googleが開発中の新機能をいくつか試せました。検索とAI、そして他のGoogleサービスを結び付け、より便利にしたいという方向性が伝わってきました。

Google検索の競合のMicrosoft BingではチャットAIが統合され、さまざまなことができるようになりました。GoogleもMicrosoftに追従して検索にAIを統合し、検索からさまざまなアクションをできるようにしたい、という意図を感じました。Google WorkspaceにAIを統合するという[動き](https://www.gizmodo.jp/2023/05/google-workplace-generative-ai-update.html)もありますし、検索からGoogleのエコシステムを強化しようとしているようです。

一方で、現時点では~~英語ユーザー限定のテストなので日本語に対応していないのは当たり前として、~~ 簡単なコードしか生成できなかったり、Googleシートに追加する機能が期待外れだったりと、いくつか残念な部分もありました。

今回紹介したSearch Labsの機能は、限定的なテスト段階なので今後の進化に期待したいです。

## 更新履歴

- 2023年08月31日：日本でも利用できるようになったことを追記しました