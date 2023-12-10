---
title: Arduinoで「No DFU capable USB device available」エラーが出たときの対処法
description: Arduinoで「No DFU capable USB device available」エラーが出たときの対処法をメモしておきます。
pubDate: "2023-12-11T01:21:41+09:00"
author: ろぼいん
tags:
    - arduino
---

Arduino Uno R4 Minimaにスケッチを書き込もうとしていたところ、次のようなエラーが出て書き込みに失敗しました。

```console
Cannot open DFU device 2341:0069 found on devnum 16 (LIBUSB_ERROR_NOT_FOUND)
No DFU capable USB device available
Failed uploading: uploading error: exit status 74
```

このエラーの解決方法をメモしておきます。

## 原因

このエラーは、どうやらドライバーが正しくインストールされていないことが原因のようです。

## 解決方法

Arduinoのフォーラムを参考にして、次のパスに存在するexeファイルを**管理者権限で**実行することで解決しました。

ただし、`[ユーザー名]`は自分のユーザー名に置き換えてください。また、`1.0.5`の部分はバージョンによって異なる可能性があります。

```path
C:\Users\[ユーザー名]\AppData\Local\Arduino15\packages\arduino\hardware\renesas_uno\1.0.5\drivers\dpinst-amd64.exe
```

上のexeファイルは64ビットのパソコン用です。32ビットのパソコンの場合は、`dpinst-amd64.exe`ではなく`dpinst-x86.exe`を実行してください。

## 参考

- [DFU Error - Cannot Upload Sketch to R4 Minima - UNO R4 / UNO R4 Minima - Arduino Forum](https://forum.arduino.cc/t/dfu-error-cannot-upload-sketch-to-r4-minima/1143436)
