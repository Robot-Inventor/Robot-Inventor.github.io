---
title: ESLintでTypeScriptのクラスのpublicやprivateを強制する方法
description: この記事では、ESLintと@typescript-eslintプラグインを使用して、TypeScriptのクラスメンバーに対するアクセシビリティ（public、protected、private）の明示を強制する方法について解説します。
pubDate: "2024-03-16T03:05:59+09:00"
showToc: true
author: ろぼいん
tags:
    - web-development
    - javascript
    - programming
    - how-to
    - typescript
---

TypeScriptを使う開発において、コードのメンテナンス性と可読性を保つことは非常に重要です。とくに、大規模なプロジェクトやチームでの開発では、コードの一貫性を保つためのルールが求められます。

この記事では、ESLintと``@typescript-eslint``プラグインを使用して、TypeScriptのクラスメンバーに対するアクセシビリティ（``public``、``protected``、``private``）の明示を強制する方法について解説します。

<!-- toc -->

## ``@typescript-eslint/explicit-member-accessibility``ルール

このルールを使うと、TypeScriptのクラスメンバーについて、アクセシビリティを明示的に宣言することを強制できます。これにより、クラスの外部からアクセスできるプロパティやメソッドが明確になり、コードの可読性が向上します。

通常のJavaScriptと違い、TypeScriptではアクセシビリティ修飾子（``public``、``protected``、``private``）を使用できます。

たとえば、次のようにクラスを定義すると、``Dog.bark()``メソッドはクラスの外部から呼びだせますが、``Dog.eat()``メソッドはクラスの外部から呼びだせません。また、``Dog.sleep()``メソッドは、``Dog``クラス自身と、``Dog``クラスを継承したサブクラスからのみ呼びだせます。

```typescript "public" "private" "protected"
class Dog {
    constructor(name: string) {
        // ...
    }

    public bark() {
        // ...
    }

    private eat() {
        // ...
    }

    protected sleep() {
        // ...
    }
}
```

このように、アクセシビリティ修飾子を使用することで、クラスのメンバーに対するアクセスレベルを明確にできます。

こうすることで、外部からの呼びだしを意図していないメソッドやプロパティに対して、誤ってアクセスすることを防げます。さらに、``private``なメソッドやプロパティがクラスの内部でのみ使用されることを保証できるため、コードを変更しやすくなります。

アクセシビリティ修飾子を省略した場合、TypeScriptはデフォルトで``public``として扱います。しかし、アクセシビリティ修飾子が省略されている場合、単なる書き忘れなのか、``public``として意図されているのかが分かりにくくなります。

ESLintの``@typescript-eslint/explicit-member-accessibility``ルールを使用することで、このようなアクセシビリティ修飾子を明示的に記述することを強制できます。

### インストール方法

まず、まだインストールしていない場合はESLintと``@typescript-eslint``プラグインをインストールします。

```bash
npm install --save-dev eslint @typescript-eslint/eslint-plugin
```

### 設定方法

``@typescript-eslint``をインストールしたら、プラグインとルールを有効化します。

```json title=".eslintrc.json" ins={3,6}
{
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/explicit-member-accessibility": "error"
    }
}
```

たいていの場合はこれで十分ですが、より詳細な設定も可能です。たとえば、次のようにすると、特定の拡張子をもつファイルに対してのみこのルールを有効にできます。これは、JavaScriptファイルとTypeScriptファイルが混在しているプロジェクトで便利です。

```jsonc title=".eslintrc.json" mark={3-4} ins={6-14}
{
    "rules": {
        // ルールをデフォルトで無効にする
        "@typescript-eslint/explicit-member-accessibility": "off"
    },
    "overrides": [
        {
            // TypeScriptファイルに対してのみ有効にする
            "files": ["*.ts", "*.mts", "*.cts", "*.tsx"],
            "rules": {
                "@typescript-eslint/explicit-member-accessibility": "error"
            }
        }
    ]
}
```

:::note
JavaScriptファイルではアクセシビリティ修飾子を使用できないため、JavaScriptファイルとTypeScriptファイルが混在しているプロジェクトでは、適切に``overrides``設定を使用してください。
:::

### オプション

``explicit-member-accessibility``ルールは、他にもさまざまなオプションでカスタマイズが可能です。たとえば、次の設定では、デフォルトですべてのメンバーにアクセシビリティを明示することを要求し、一部のメンバータイプに対しては特定のアクセシビリティを禁止します。

```json title=".eslintrc.json" mark={5-14}
{
    "rules": {
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "accessibility": "explicit",
                "overrides": {
                    "accessors": "explicit",
                    "constructors": "no-public",
                    "methods": "explicit",
                    "properties": "off",
                    "parameterProperties": "explicit"
                }
            }
        ]
    }
}
```

この設定により、プロパティに対してはアクセシビリティの明示を求めず（``"properties": "off"``）、他のメンバー（アクセサーやメソッドなど）については明示を要求します。また、コンストラクターに``public``を使用することを禁止します（``"constructors": "no-public"``）。

### コード例

以下は、`explicit-member-accessibility`ルールが有効な場合の正しいコードの例と、不適切なコードの例です。

**正しいコード例（デフォルト設定）**:

```typescript "public" "private" "protected"
class Animal {
    public constructor(public breed, name) {
        this.animalName = name;
    }

    private animalName: string;

    public get name(): string {
        return this.animalName;
    }

    public set name(value: string) {
        this.animalName = value;
    }

    public walk() {
        // method
    }
}
```

**不適切なコード例**:

```typescript
class Animal {
    constructor(name) {
        this.animalName = name;
    }

    animalName: string;

    get name(): string {
        return this.animalName;
    }

    set name(value: string) {
        this.animalName = value;
    }

    walk() {
        // method
    }
}
```

この例では、すべてのクラスメンバーにアクセシビリティ修飾子が欠けています。修飾子を追加することで、クラスの使用方法やメンバーへのアクセスレベルが明確になります。

## まとめ

``@typescript-eslint/explicit-member-accessibility``ルールを使用することで、TypeScriptのクラスメンバーに対するアクセシビリティ修飾子の明示を強制し、コードの可読性を高めることができます。
