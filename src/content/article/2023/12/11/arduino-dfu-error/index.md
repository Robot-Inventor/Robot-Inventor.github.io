---
title: Arduinoで「No DFU capable USB device available」エラーが出たときの対処法
description: Arduinoで「No DFU capable USB device available」エラーが出たときの対処法をメモしておきます。
pubDate: "2023-12-11T01:21:41+09:00"
modifiedDate: "2023-12-11T15:03:02+09:00"
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

このエラーは、Arduinoとパソコンが正しく接続されていないか、認識していないときに発生するようにです。

次のような原因が考えられます。

- Arduinoが書き込み可能な状態になっていない
- Arduinoとパソコンが接続されていない
- Arduinoのドライバーが正しくインストールされていない

## 解決方法

### Arduinoが書き込み可能な状態になっていない

Arduinoが書き込み可能な状態になっていないときは、Arduinoのリセットボタンを2回押してください。

### Arduinoとパソコンが接続されていない

ArduinoとパソコンをつなぐUSBケーブルがしっかりと刺さっているか確認してください。

また、データ転送に対応していない充電のみのUSBケーブルを使っている可能性があります。データ転送に対応しているUSBケーブルを使ってください。

### Arduinoのドライバーが正しくインストールされていない

私の場合はこれが原因でした。

Arduinoのフォーラムを参考にして、次のパスに存在するexeファイルを**管理者権限で**実行することで解決しました。

ただし、`[ユーザー名]`は自分のユーザー名に置き換えてください。また、`1.0.5`の部分はバージョンによって異なる可能性があります。

```path
C:\Users\[ユーザー名]\AppData\Local\Arduino15\packages\arduino\hardware\renesas_uno\1.0.5\drivers\dpinst-amd64.exe
```

上のexeファイルは64ビットのパソコン用です。32ビットのパソコンの場合は、`dpinst-amd64.exe`ではなく`dpinst-x86.exe`を実行してください。

## 参考

- [DFU Error - Cannot Upload Sketch to R4 Minima - UNO R4 / UNO R4 Minima - Arduino Forum](https://forum.arduino.cc/t/dfu-error-cannot-upload-sketch-to-r4-minima/1143436)
