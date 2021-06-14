---
description: Inkscapeで作成したSVGから個人情報流出の可能性があることに気づいたので記事にしました。
---

# Inkscapeで作成したSVGから個人情報流出の可能性

<info-block>
    この記事と同じ内容を<a href="https://qiita.com/Robot-Inventor/items/f7d18438de290a250051">Qiita</a>にも投稿してあります。
</info-block>

![パソコンの上に南京錠が置かれた画像](computer-1591018_1920.jpg)

[今日の別の記事](https://robot-inventor.github.io/article/2020/05/12/)にも書きましたが、このブログのAMP化の作業をしました。そのとき、SVGファイルをテキストエディターで開いたら個人情報が含まれていたので記事にしました。

最初に断っておきますが、SVGに含まれる個人情報というのはPCのユーザー名です。PCのユーザー名はパスワードや住所でもないので個人情報だと考えるかは人それぞれですが、場合によっては本名がバレるということでここでは個人情報として扱います。

ちなみに、こんな記事を書いておきながら、私はPCのユーザー名くらい別にいいかなと思います...。

この問題が発生するのはオープンソースのベクターグラフィックエディターの[Inkscape](https://inkscape.org/)とWindows 10を使用した場合です。他の環境ではどうなるか分かりませんが、おそらくInkscapeを使用していればOSに関係なくこの問題が発生するでしょう。

## 詳細

この問題はInkscapeを使用してSVG画像を作成し、そのデータをインターネットでの公開を含め誰かに渡したり見せたりする場合に発生します。

まず、以下がInkscapeで作成した空のSVGファイルです。ファイルの保存形式はデフォルトのInkscape SVGを選択しました。この時点ではまだ個人情報は含まれていません。

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   sodipodi:docname="ファイル名.svg"
   inkscape:version="1.0 (4035a4fb49, 2020-05-01)"
   id="svg8"
   version="1.1"
   viewBox="0 0 210 297"
   height="297mm"
   width="210mm">
  <defs
     id="defs2" />
  <sodipodi:namedview
     inkscape:window-maximized="1"
     inkscape:window-y="-6"
     inkscape:window-x="-6"
     inkscape:window-height="850"
     inkscape:window-width="1368"
     showgrid="false"
     inkscape:document-rotation="0"
     inkscape:current-layer="layer1"
     inkscape:document-units="mm"
     inkscape:cy="560"
     inkscape:cx="400"
     inkscape:zoom="0.35"
     inkscape:pageshadow="2"
     inkscape:pageopacity="0.0"
     borderopacity="1.0"
     bordercolor="#666666"
     pagecolor="#ffffff"
     id="base" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="layer1"
     inkscape:groupmode="layer"
     inkscape:label="レイヤー 1" />
</svg>
```

そして、以下は同じ内容をプレーンSVGを選択して保存したものです。同じく、これもまだ個人情報は含まれていません。

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg836"
   version="1.1"
   viewBox="0 0 210 297"
   height="297mm"
   width="210mm">
  <defs
     id="defs830" />
  <metadata
     id="metadata833">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="layer1" />
</svg>
```

ところが、Inkscapeの「PNG画像にエクスポート」機能を使ったあとのSVGファイルには個人情報が含まれるようになります。以下は、Inkscape SVGで保存した場合です。

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   inkscape:export-ydpi="96"
   inkscape:export-xdpi="96"
   inkscape:export-filename="C:\Users\ユーザー名\エクスポート先のファイル名.png"
   width="210mm"
   height="297mm"
   viewBox="0 0 210 297"
   version="1.1"
   id="svg8"
   inkscape:version="1.0 (4035a4fb49, 2020-05-01)"
   sodipodi:docname="ファイル名.svg">
  <defs
     id="defs2" />
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="0.35"
     inkscape:cx="400"
     inkscape:cy="560"
     inkscape:document-units="mm"
     inkscape:current-layer="layer1"
     inkscape:document-rotation="0"
     showgrid="false"
     inkscape:window-width="1368"
     inkscape:window-height="850"
     inkscape:window-x="-6"
     inkscape:window-y="-6"
     inkscape:window-maximized="1" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="レイヤー 1"
     inkscape:groupmode="layer"
     id="layer1" />
</svg>
```

以下は、プレーンSVGの場合です。

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   inkscape:export-ydpi="96"
   inkscape:export-xdpi="96"
   inkscape:export-filename="C:\Users\ユーザー名\エクスポート先のファイル名.png"
   sodipodi:docname="ファイル名.svg"
   inkscape:version="1.0 (4035a4fb49, 2020-05-01)"
   id="svg836"
   version="1.1"
   viewBox="0 0 210 297"
   height="297mm"
   width="210mm">
  <defs
     id="defs830" />
  <sodipodi:namedview
     inkscape:window-maximized="0"
     inkscape:window-y="0"
     inkscape:window-x="0"
     inkscape:window-height="872"
     inkscape:window-width="1368"
     showgrid="false"
     inkscape:document-rotation="0"
     inkscape:current-layer="layer1"
     inkscape:document-units="mm"
     inkscape:cy="560"
     inkscape:cx="400"
     inkscape:zoom="0.35"
     inkscape:pageshadow="2"
     inkscape:pageopacity="0.0"
     borderopacity="1.0"
     bordercolor="#666666"
     pagecolor="#ffffff"
     id="base" />
  <metadata
     id="metadata833">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="layer1"
     inkscape:groupmode="layer"
     inkscape:label="レイヤー 1" />
</svg>
```

さて、どこが問題か分かりましたか？問題があるのは、次の部分です。これは、Inkscape SVGとプレーンSVGで共通です。

```
inkscape:export-filename="C:\Users\ユーザー名\エクスポート先のファイル名.png"
```

注）「ユーザー名」と「エクスポート先のファイル名」にはそれぞれ実際の値が入りますが、ここでは例としてこのように書いています。

これらは、エクスポートしたPNG画像の絶対パスです。設定として保存されているのでしょう。

「ユーザー名」にはそのPCにログインしているユーザー名が入ります。Windows 10以外のOSでもパスのどこかしらにユーザー名が入るでしょう。

このように、個人情報が含まれているのです。これをローカルで使用するだけなら問題ないですが、ファイルを配布したりインターネットで公開したりすると、ユーザー名が流出することになります。

## 対策方法

この問題は、ユーザー名を初期設定のときに設定したものから変更している場合は古いユーザー名が流出するだけなので問題ないですね。

しかし、変更していない場合は影響を受けます。対策方法としては、テキストエディターでそのファイルを開いて

```
inkscape:export-filename="C:\Users\ユーザー名\エクスポート先のファイル名.png"
```

の1行をまるごと削除します。

## ちなみに

ちなみに、そんな人がいるか分かりませんが、ファイル名に嫌いな人の悪口やFワードを付けて保存している場合はもう1つ気をつける点があります。

配布や公開する前にファイル名だけ変えても、前のファイル名がバレてしまいます。これは、「PNG画像にエクスポート」を使用しなくても発生します。問題があるのは、Inkscape SVGとプレーンSVGに共通で次の部分です。

```
sodipodi:docname="ファイル名.svg"
```

注）「ファイル名」には実際のSVGのファイル名が入ります。

ちなみに、ファイル名変更後Inkscapeでファイルを開き、編集して保存すれば「ファイル名」の部分は更新されます。Inkscapeで開いて保存しても、ファイルを編集しないと更新されません。

## さいごに

こんな記事を書きましたが、別にInkscapeが嫌いで批判したいわけではありません。

あのソフトが無料で使えるのは本当に素晴らしいですし、この記事で指摘した問題のある部分は設定を保存することでInkscapeをより使いやすくするためのものですから、仕方ないでしょう。また、個人情報といってもPCのユーザー名です。

一方で、気にする人がいるのも事実なので、この記事がSVG画像を公開する人の役に少しでも立てば嬉しいです。

最後までお読みいただき、ありがとうございました。
