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

記事執筆時点で、Windows 10とWindows 11の両方で、すべてのプリンターのモデル名が実際のメーカーや型番に関係なく「HP LaserJet M101-M106」として表示される問題が発生しています。

たとえHPのプリンターをPCに接続したことがなくても、あらゆるプリンターが「HP LaserJet M101-M106」として表示されます。

また、Microsoft Store経由でユーザーの許可なく勝手に「HP Smart」アプリもインストールされてしまうようです。

## 原因

これは、Windowsの問題です。海外のニュースサイト「Windows Latest」によれば、プリンターメーカーからMicrosoftに提供されているメタデータに問題があるのではないかとのことです。メタデータの問題により、Windowsがすべてのプリンターを「HP LaserJet M101-M106」として認識してしまうようです。

また、それによってHP製のプリンターを使用しているとWindowsが誤認してしまい、「HP Smart」アプリがインストールされるようです。

## 解決策

これはWindows側の問題なので、ユーザーでできる解決策はありません。Microsoftがアップデートを提供するのを待つ必要があります。

ただし、プリンターが「HP LaserJet M101-M106」として表示されていても動作はします。そのため、どれがどのプリンターか区別がつかないことを除けば、問題なく使用できます。

## 参考

- [Why all my printer model converted to HP LaserJet M101-M106? - Microsoft Community](https://answers.microsoft.com/en-us/windows/forum/all/why-all-my-printer-model-converted-to-hp-laserjet/1b39d3c1-199e-4a5f-987f-729401d7e8f5)
- [Windows Update accidentally renames all printers to HP M101-M106 on Windows 11, Windows 10](https://www.windowslatest.com/2023/12/04/windows-update-accidentally-renames-all-printers-to-hp-m101-m106-on-windows-11-windows-10/)
