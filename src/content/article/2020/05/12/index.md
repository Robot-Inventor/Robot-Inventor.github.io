---
description: ブログをAMPに対応させました。途中でいくつかつまずいた点があったので記事にします。
title: ページのAMP化でつまずいたこと
pubDate: "2020-05-12T00:00:00.000+09:00"
modifiedDate: "2022-04-05T23:04:58.299+09:00"
author: ろぼいん
thumbnail: ./flash-845848_1920.jpg
showThumbnail: false
tags: ["google"]
---

:::note info
この記事と同じ内容を[Qiita](https://qiita.com/Robot-Inventor/items/9dfd2f4d0a674e43150f)にも投稿してあります。また2021年6月11日現在、ブログの改修にともない、本ブログのAMPサポートは終了しました。
:::

![木に雷が落ちている画像](./flash-845848_1920.jpg)

とうとう本ブログもAMPに対応し、ページの読み込み速度が改善されました。

AMPに対応させる前は画像の遅延読み込みだけでなくscriptタグにdefer属性を付けたりpreloadやpreconnectを使ったりなどのさまざまな工夫をしていました。しかし、AMPにしたらそんなことをしなくても高速になりました。

また、AMPとは関係ありませんが、日本語Webフォントをなくしただけで[Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=JA)のモバイルの点数が30点上がりました。

この記事では、AMP化のときにつまずいたことや、解決した方法を書いていきます。そもそもAMPの概要や対応方法を知りたいという場合は他の記事を見てください。

## 1. amp-imgの終了タグ

amp-imgタグはimgタグと違い終了タグが必要です。終了タグがなくても正常に動く場合もありますが、画像が引き伸ばされたり場所がずれたりします。

最初は原因がわからなかったのですが、公式サイトを読んでいるうちに「あれ？終了タグ付け忘れていた」となりました。

それに気づいたのは、ほぼ全ページAMP化が終わったあとでした。記事数が少なかったおかげでAMP化の作業は1日くらいで終わりましたが、さすがに全ページにamp-imgの終了タグを付けていくのはきついです。

ということで、Pythonに自動で修正させました。プログラムはすでに作ってあった「全ページ共通のインラインCSSやheader、footerを自動で書き換える」プログラムをベースに作ったのですぐにできました。

## 2. amp-imgのフォールバックが機能しない

amp-imgタグのフォールバックが機能せず悩んでいたのですが、 [公式サイトの「プレースホルダーとフォールバック」](https://amp.dev/ja/documentation/guides-and-tutorials/develop/style_and_layout/placeholders/#%E3%83%95%E3%82%A9%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF)に、さらっと書いてあります。

> fallback 属性は、AMP 要素だけでなく、どの HTML 要素でも設定できます。指定する場合、fallback 要素は AMP 要素の直接の子にする必要があります。
>
> [https://amp.dev/ja/documentation/guides-and-tutorials/develop/style_and_layout/placeholders/](https://amp.dev/ja/documentation/guides-and-tutorials/develop/style_and_layout/placeholders/)より

ということで、フォールバックはフォールバックでない要素の子要素にする必要があります。悪い例を見てみましょう。

```html
<amp-img src="path_to_image" alt="" width="1920" height="1080" layout="responsive"></amp-img>
<amp-img fallback src="path_to_fallback_image" alt="" width="1920" height="1080" layout="responsive"></amp-img>
```

フォールバックは子要素にしなければいけません。

最初これで書いてしまっていて、全ページを修正するはめになりました。

上の悪い例を修正するとこうなります。

```html
<amp-img src="path_to_image" alt="" width="1920" height="1080" layout="responsive">
    <amp-img fallback src="path_to_fallback_image" alt="" width="1920" height="1080" layout="responsive"></amp-img>
</amp-img>
```

ちゃんと子要素になっていますね。

## 3. CSSのobject-fitを使った画像の切り抜きができない

このブログでは、このページの一番上にあるように、画像を貼っています。そして、その画像はCSSのobject-fitをつかって切り抜いているのですがAMPにしたら切り抜かれず、無理やり引き伸ばされてしまいました。

解決方法は、 公式サイトの[「How to support Images with unknown Dimensions」](https://amp.dev/documentation/examples/style-layout/how_to_support_images_with_unknown_dimensions/#object-fit-to-the-rescue)のObject-Fit to the rescueのobject-fit: coverの方に書かれていました。

ページ自体は「サイズがわからない画像ってどうすればいいの？」という内容ですが、CSSのobject-fitでトリミングする方法も書かれていました。

レスポンシブに画像を正方形に切り抜くならこんな感じでしょうか。

CSS

```css
.cropping-container {
    position: relative;
    width: 100vw;
    height: 100vw;
}

.cropping-container amp-img,
.cropping-container img {
    object-fit: cover;
}
```

HTML

```html
<div class="cropping-container">
    <amp-img layout="fill" src="path_to_image"></amp-img>
</div>
```

ちなみに、CSSにamp-imgだけでなく普通のimgもありますが、これを消すと上手く動きません。これは、AMPのスクリプトがimgタグを使って画像を表示しているからです。

## 4. 直書きのSVG画像のエラー

[AMPテスト](https://search.google.com/test/amp?hl=JA)をしたら、SVGのxmlns:dc、paint-order、gとかが許可されてないよ☆的なこと言われました。

そのため、テキストエディターでSVGを開いて許可されてないと言われたものを消していきました。

ただし、paint-orderとgタグは削除すると画像が破壊されることもあるので、ブラウザーなどで画像をプレビューしながら作業することをオススメします。

また、上で挙げた許可されていないものはすべて小文字にされていましたが、実際のSVGのデータは大文字も混ざっているので検索するときは気をつけてください。

paint-orderはフィルやストロークの重なりの順番を指定するものです。ストロークの塗りがなければ消してもおそらく問題ないでしょう。

しかし、ストロークを使って袋文字（縁取りのある文字）などを作っている場合は注意が必要です。場合によってはpaint-orderを消すと縁取りが外側だけでなく内側にも付いてしまいます。

その場合はSVGエディターを使って袋文字の上に袋文字でない（＝ストロークの塗りがない）ものを重ねてからpaint-orderを消せばうまくいくはずです（試していません）。

また、gタグについては、gタグにstyle属性が使われている場合、自分で消さないほうがいいです。gタグはグループ化をしているので、SVGエディターですべてのグループ化を解除すれば直接ファイルをいじらずに解決します。

ただし、画像を編集しやすくするなどの理由があってグループ化しているはずなので、もとの画像のバックアップを取っておいたほうがいいです。

SVGの作成には[Inkscape](https://inkscape.org/)を使っていて、SVGファイルをテキストエディターで開くと「inkscape」という文字列を含んだ属性があったので、それらも削除しました。

最後に注意点として、頑張って削除した属性やタグは、Inkscapeで開いて保存すると復活するので気をつけてください。

## さいごに

こんな感じで、色々ありながら、Pythonの力も借りながらほぼすべてのページをAMP化しました。

今回は維持・管理のしやすさから、AMP化したページは通常のHTMLページを用意していませんが、IEのアクセスも考えるなら通常のHTML版も用意する必要があります。

AMP化の作業は、ページ数が少ないにもかかわらず丸1日潰れました。

ちなみに新型コロナウイルスの影響で休校中だったので気分転換にやったのですが、全然気分転換にはなりませんでした...。

今回はページ数が少なかったので1人でできましたが、普通のサイトではAMP化のツールを使ったり、WordPressならプラグインを使ったりするべきです。

ということで、最後までお読みいただき、ありがとうございました。
