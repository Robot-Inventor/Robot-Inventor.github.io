---
title: E2EEの写真アプリ「Ente」が完全オープンソース化！写真アプリの新たな選択肢
description: 2024年3月、写真保存・管理アプリのEnteが、エンドツーエンドの暗号化を備えた自社のサーバーコードを含め、すべてのコードをオープンソース化したことを発表しました。
pubDate: "2024-03-02T01:51:03+09:00"
modifiedDate: "2024-03-03T14:21:50+09:00"
author: ろぼいん
tags:
    - news
    - open-source
    - github
    - privacy
---

2024年3月、写真保存・管理アプリのEnteが、エンドツーエンドの暗号化を備えた自社のサーバーコードを含め、すべてのコードをオープンソース化したことを発表しました。

## Enteとは？

[Ente](https://ente.io/)は、セキュリティやプライバシーを重視した写真保存・管理アプリです。エンドツーエンドの暗号化（E2EE）を備えており、データを地下の核シェルターを含む3か所に保存するなどの堅牢性を持っています。

[Googleフォト](https://www.google.com/intl/ja/photos/about/)や[Apple Photos](https://www.apple.com/jp/ios/photos/)のようなサービスに代わる選択肢として、プライバシーを重視するユーザーにとって興味深いものとなっています。

## Enteのオープンソース化

Enteはこれまで、モバイルアプリやデスクトップクライアント、さらにはFigmaのデザインファイルまでをオープンソース化してきました。

そして、2024年3月、同社は自社のサーバーコードを含むすべてのコードをオープンソース化したことを発表しました。

<blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="en" dir="ltr">Ente is now fully <a href="https://twitter.com/hashtag/opensource?src=hash&amp;ref_src=twsrc%5Etfw">#opensource</a>!<br><br>You can find the source to our apps and SERVER @ <a href="https://t.co/A7rWX1rGQI">https://t.co/A7rWX1rGQI</a><br><br>Thank YOU for helping us get this far! 🙏<br><br>Please star the repo to watch us take <a href="https://twitter.com/hashtag/privacy?src=hash&amp;ref_src=twsrc%5Etfw">#privacy</a> and <a href="https://twitter.com/hashtag/security?src=hash&amp;ref_src=twsrc%5Etfw">#security</a> to the stars ✨ 😉</p>&mdash; Ente (@enteio) <a href="https://twitter.com/enteio/status/1763564466040647692?ref_src=twsrc%5Etfw">March 1, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

これにより、ユーザーは、[GitHub上のリポジトリー](https://github.com/ente-io/ente)をクローンするだけで、フルスタックのフォトストレージソリューションを手に入れられるようになります。

Enteのこの一歩は、同社の顧客やE2EEのサービスの将来の創業者、セルフホストの愛好家、さらにはGo/Flutter/TypeScriptを扱うエンジニアにまで、多くの利益をもたらすものです。

オープンソース化の背景には、ポスタリティ（後世への継続）、信頼、そして感謝の思いが込められています。また、Enteはオープンソース化する本当の目的として、「顧客がEnteを選んだことが正しい選択だったと自負できるもうひとつの理由を提供すること」を挙げています。

## オープンソース化の背景

### ポスタリティの観点

Enteはこれまで、顧客のデータがE2EEで暗号化されていることから、サーバーコードのオープンソース化を優先していませんでした。

しかし、同社は顧客が安心して利用できるように、またEnteに何かがあったときの保険として、サーバーコードのオープンソース化を決定したと述べています。

これにより、仮にEnte自体に何か起きたとしても、ユーザーは自らのデータを保護するためにEnteのコードを利用し続けられます。

### 信頼の構築

Enteは過去にも、その透明性を高めるために[Figmaのファイル](https://www.figma.com/file/SYtMyLBs5SAOkTbfMMzhqt/ente-Visual-Design)をオープンソース化するなどの取り組みを行ってきましたが、サーバーコードの公開により、ユーザーとの信頼関係をさらに深めることができます。

顧客からは、このような透明性が信頼の証と捉えられており、サーバーコードのオープンソース化も信頼性の向上に寄与するものと期待しているとのことです。

### 感謝の表明

Enteチームは、長年にわたる開発の過程でオープンソーステクノロジーの恩恵を受けてきました。この恩恵に対する感謝の意を示すため、同社は自らのコードを世界に公開することを決定しました。

これにより、Enteはオープンソースコミュニティに貢献し、さらなるイノベーションを促進することを目指しています。

## オープンソース化に至る道のり

Enteのオープンソース化は即断即決のものではありませんでした。まず、コードの確認と微調整、外部監査の実施などのプロセスを経て、ユーザーに安全に提供できる状態にする必要があったとのことです。

オープンソース化の前に、監査で指摘されたいくつかの改善点が修正されました。また、Gitのコミット履歴をsquashすることで、過去のコミットから誤ってトークンが漏れ出すリスクを回避しています。

## Enteのオープンソース化から得られるもの

- **プライバシー保護**：エンドツーエンドの暗号化に加え、ソースコードの公開により、ユーザーは自身のデータの安全性を直接確認できるようになります
- **カスタマイズ性**：セルフホストの愛好家や開発者は、Enteのコードを自由に改変し、パーソナライズされたフォトストレージを構築できます
- **コミュニティとの連携**：Enteのオープンソース化により、同社だけでなく、他の開発者や企業がこのコードをもとに新たな機能を開発し、互いに貢献し合うことで、全体としてのイノベーションが加速します

EnteのGitHubリポジトリーでは、現在のコードを公開するだけでなく、今後も更新を続ける予定とのことです。そのため、技術者だけでなく、一般のユーザーも最新の情報を得られるようになっています。

## まとめ

Enteのサーバーコードのオープンソース化は、同社のプライバシー保護への取り組みをさらに進化させるもので、ユーザーにとっても開発者にとっても、大きな利益をもたらすものとなっています。

また、Enteのオープンソース化は、同社の透明性と信頼性を高めるだけでなく、オープンソースコミュニティに貢献し、新たなイノベーションを促進することにもつながるものです。

Enteのオープンソース化により、プライバシーを重視するユーザーや開発者にとって、新たな選択肢が生まれることとなります。

Enteは今後、パスキーのサポートを追加する予定とのことです。

## 参考

- [Open sourcing our server | Ente](https://ente.io/blog/open-sourcing-our-server/)
