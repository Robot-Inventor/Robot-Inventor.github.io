---
title: 【Windows 11】PATHの設定なしでFFmpegをインストールする方法
description: Windowsユーザーが開発や動画編集をする際、FFmpegはほぼ避けて通れないツールのひとつです。しかし、FFmpegのインストールとPATHの設定は初心者にとっては少し難しいかもしれません。実は、Windowsにはwingetという強力なパッケージマネージャーがあります。これを使えば、PATHの手動設定不要でFFmpegを簡単にインストールできます。この記事では、まずFFmpegとwingetについての基本情報を紹介し、その後、具体的なインストール方法について説明します。
pubDate: "2024-02-25T21:39:08+09:00"
author: ろぼいん
tags:
    - windows
    - how-to
    - open-source
---

Windowsユーザーが開発や動画編集をする際、FFmpegはほぼ避けて通れないツールのひとつです。しかし、FFmpegのインストールとPATHの設定は初心者にとっては少し難しいかもしれません。

実は、Windowsには[winget](https://learn.microsoft.com/ja-jp/windows/package-manager/winget/)という強力なパッケージマネージャーがあります。これを使えば、**PATHの手動設定不要でFFmpegを簡単にインストールできます**。

この記事では、まずFFmpegとwingetについての基本情報を紹介し、その後、具体的なインストール方法について説明します。

## FFmpegとは？

**FFmpeg**は、動画や音声の録画、変換、ストリーミングを行うためのフリーソフトウェアです。多様なコーデックやフォーマットをサポートしており、高度な動画編集や加工が可能です。コマンドラインインターフェースを提供しており、複雑な処理もスクリプトを使って自動化できるのが大きな特徴です。

FFmpegはオープンソースプロジェクトで、開発者コミュニティーによって継続的に更新されています。非常に多くのアプリケーションやサービスが内部でFFmpegを使っており、その汎用性と強力な機能は高く評価されています。

## wingetとは？

**winget**は、Microsoftが開発したWindows用のパッケージマネージャーです。Windows 10 version 1709以降に対応しており、コマンドラインからアプリケーションの検索、インストール、更新、削除ができます。wingetを使うことで、ダウンロードサイトを探して手動でセットアップする手間が大幅に省けます。

## FFmpegをwingetでインストールする方法

それでは、wingetを使用してFFmpegをインストールする手順を説明します。この方法なら、PATHの手動での設定は一切不要で、簡単にFFmpegを使い始められます。

### ステップ1：wingetの確認

まず、自分のPCにwingetが既にインストールされているかどうかを確認します。

`Windows + S`を押してWindowsの検索メニューを開き、「Windows PowerShell」または「コマンドプロンプト」と入力します。

Windows PowerShellかコマンドプロンプトを開いたら、次のコマンドを入力してEnterで実行してください。

```shell
winget -v
```

もしwingetがインストールされていれば、wingetのバージョン番号が表示されます。

エラーが出た場合はまだインストールされていないので、[Microsoft Store](https://www.microsoft.com/p/app-installer/9nblggh4nns1#activetab=pivot:overviewtab) からアプリインストーラーをダウンロードし、インストールしてください。

### ステップ2：FFmpegのインストール

wingetが利用可能になったら、FFmpegをインストールします。Windows PowerShellまたはコマンドプロンプトで次のコマンドを入力して実行してください。

```shell
winget install ffmpeg
```

このコマンドを実行すると、wingetはFFmpegの最新版をインターネットから検索し、自動でダウンロードしてインストールします。

プロンプトにとくにエラーが表示されなければ、インストールは成功しています。

### ステップ3：インストールの確認

インストール後、FFmpegが正しくインストールされたかを確認します。

**先ほど開いていたWindows PowerShellまたはコマンドプロンプトを一度閉じてください**。再びWindows PowerShellかコマンドプロンプトを開き、次のコマンドを入力してください。

```shell
ffmpeg -version
```

これにより、インストールされたFFmpegのバージョン情報が表示されます。この情報が表示されれば、インストールは成功しています。

:::note
ffmpegがインストールされていることを確認する際には、Windows PowerShellまたはコマンドプロンプトを一度閉じてから開きなおす必要があります。一度閉じないと、ffmpegコマンドが見つからないというエラーが表示されることがあります。
:::

### ステップ4：FFmpegの利用

FFmpegが正常にインストールされたら、あとは他の方法でインストールしたときと同様に利用できます。動画や音声の変換、編集、ストリーミングなど、FFmpegの強力な機能を活用してください。

FFmpegをアップデートする際は、次のコマンドを実行してください。

```shell
winget upgrade ffmpeg
```

また、FFmpegをアンインストールする際は、次のコマンドを実行してください。

```shell
winget uninstall ffmpeg
```

## まとめ

この記事では、WindowsでPATHの手動での設定不要でFFmpegを簡単にインストールする方法を紹介しました。

wingetを使うことで、複雑な設定や手順を省略し、スムーズにFFmpegをインストールできます。FFmpegは非常に強力なツールなので、このインストール方法をぜひ試してみてください。
