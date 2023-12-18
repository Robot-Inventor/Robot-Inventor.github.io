---
title: Windowsでプリンターが「HP LaserJet M101-M106」になる問題と修正方法
description: 記事執筆時点で、Windows 10とWindows 11の両方で、すべてのプリンターのモデル名が実際のメーカーや型番に関係なく「HP LaserJet M101-M106」として表示される問題が発生しています。
pubDate: "2023-12-04T13:55:22+09:00"
modifiedDate: "2023-12-18T12:59:58+09:00"
author: ろぼいん
tags:
    - windows
    - explanation
---

## 概要

現在、Windowsが誤ってさまざまなプリンターの名前やアイコンを「HP LaserJet M101-M106」に変更してしまう問題が発生しています。この問題はWindows 10とWindows 11の両方に影響しています。この問題は、Windows Updateによって発生していると考えられています。

たとえHPのプリンターをPCに接続したことがなくても、プリンターが「HP LaserJet M101-M106」として表示されます。また、Microsoft Store経由でユーザーの許可なく勝手に「HP Smart」アプリもインストールされてしまうようです。

## 原因

これは、Windowsの問題です。海外のニュースサイト「Windows Latest」によれば、プリンターメーカーからMicrosoftに提供されているメタデータに問題があるのではないかとのことです。Windows Updateによって問題のあるメタデータが読み込まれるようになってしまったことで、Windowsがすべてのプリンターを「HP LaserJet M101-M106」として認識してしまうようです。

ただし、Microsoftの[調査](https://learn.microsoft.com/en-us/windows/release-health/status-windows-11-23h2#:~:text=our%20investigations%20indicate%20that%20this%20issue%20is%20not%20caused%20by%20an%20hp%20update.%20)ではHPのアップデートが原因ではないとしています。一方で、修正ツールが「Microsoft プリンター メタデータ トラブルシューティング ツール」という名前のため、メタデータが原因であることは事実のようです。

また、それによってWindowsがHPのプリンターが接続されていると誤って認識し、Microsoft Storeから「HP Smart」というアプリを自動的にインストールしてしまいます。一部のユーザーでは、PCのスタートメニューに「HP Smart」のショートカットが表示されているかもしれません。

## 解決策

12月16日（現地時間）、Microsoftはこの問題を解決したと[発表](https://learn.microsoft.com/ja-JP/windows/release-health/status-windows-11-23h2#-------------------hp-smart-------------------------)しました。

問題を修正するには、修正ツールをMicrosoftダウンロードセンターからダウンロードし、実行します。

- [Download Microsoft Printer Metadata Troubleshooter Tool December 2023 from Official Microsoft Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=105763)

［Download］ボタンをクリックするとダイアログが表示されるので、その中からお使いのPCにあったファイルをダウンロードします。

どのファイルをダウンロードするべきか分からない場合や、実行方法が不明な場合は、Microsoftのサポートページを参照してください。

- [KB5034510: Microsoft プリンター メタデータ トラブルシューティング ツール - 2023 年 12 月 - Microsoft サポート](https://support.microsoft.com/ja-jp/topic/kb5034510-microsoft-%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC-%E3%83%A1%E3%82%BF%E3%83%87%E3%83%BC%E3%82%BF-%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0-%E3%83%84%E3%83%BC%E3%83%AB-2023-%E5%B9%B4-12-%E6%9C%88-b3197f24-fd25-430d-96d2-70f2044ce6a1)

## 参考

この問題に関する、海外のニュースサイトやコミュニティーなどの情報を以下に示します。

- [Why all my printer model converted to HP LaserJet M101-M106? - Microsoft Community](https://answers.microsoft.com/en-us/windows/forum/all/why-all-my-printer-model-converted-to-hp-laserjet/1b39d3c1-199e-4a5f-987f-729401d7e8f5)
- [Windows Update accidentally renames all printers to HP M101-M106 on Windows 11, Windows 10](https://www.windowslatest.com/2023/12/04/windows-update-accidentally-renames-all-printers-to-hp-m101-m106-on-windows-11-windows-10/)
- [Windows 11、バージョン 23H2 の既知の問題と通知 | Microsoft Learn](https://learn.microsoft.com/ja-JP/windows/release-health/status-windows-11-23h2#-------------------hp-smart-------------------------)
- [KB5034510: Microsoft プリンター メタデータ トラブルシューティング ツール - 2023 年 12 月 - Microsoft サポート](https://support.microsoft.com/ja-jp/topic/kb5034510-microsoft-%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC-%E3%83%A1%E3%82%BF%E3%83%87%E3%83%BC%E3%82%BF-%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0-%E3%83%84%E3%83%BC%E3%83%AB-2023-%E5%B9%B4-12-%E6%9C%88-b3197f24-fd25-430d-96d2-70f2044ce6a1)
- [Download Microsoft Printer Metadata Troubleshooter Tool December 2023 from Official Microsoft Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=105763)

## 更新履歴

- 2023年12月18日：問題の修正方法が公開されたため記事を更新
