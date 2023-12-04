---
title: Windowsですべてのプリンターが「HP LaserJet M101-M106」になる問題
description: 記事執筆時点で、Windows 10とWindows 11の両方で、すべてのプリンターのモデル名が実際のメーカーや型番に関係なく「HP LaserJet M101-M106」として表示される問題が発生しています。
pubDate: "2023-12-04T13:55:22+09:00"
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

また、それによってWindowsがHPのプリンターが接続されていると誤って認識し、Microsoft Storeから「HP Smart」というアプリを自動的にインストールしてしまいます。一部のユーザーでは、PCのスタートメニューに「HP Smart」のショートカットが表示されているかもしれません。

## 解決策

これはWindows側の問題なので、ユーザーでできる簡単な解決策はありません。MicrosoftがWindowsのアップデートを提供するのを待つ必要があります。

Windowsのクリーンインストールによって問題が解決する可能性もありますが、データのバックアップやソフトの再インストールなどが必要になるため、オススメできません。

Microsoftはこの問題を調査しており、近日中にメタデータを修正したアップデートを配信する可能性があります。基本的には、それまで待つことをオススメします。

なお、プリンターが「HP LaserJet M101-M106」として表示されていても通常どおり印刷できます。そのため、この問題の影響を受けていても、どれがどのプリンターか区別がつかないことを除けば、問題なく使用できます。

## 参考

この問題に関する、海外のニュースサイトやコミュニティーの情報を以下に示します。

- [Why all my printer model converted to HP LaserJet M101-M106? - Microsoft Community](https://answers.microsoft.com/en-us/windows/forum/all/why-all-my-printer-model-converted-to-hp-laserjet/1b39d3c1-199e-4a5f-987f-729401d7e8f5)
- [Windows Update accidentally renames all printers to HP M101-M106 on Windows 11, Windows 10](https://www.windowslatest.com/2023/12/04/windows-update-accidentally-renames-all-printers-to-hp-m101-m106-on-windows-11-windows-10/)
