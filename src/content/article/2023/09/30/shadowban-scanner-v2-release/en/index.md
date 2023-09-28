---
title: Shadowban Scanner v2 is now available to check shadowban and sensitive judgments
description: It has been almost three months since the last update, and I have released version 2 of Shadowban Scanner, an extension that allows you to check Twitter (X) shadowban and sensitive judgments without having to go to an external site. in Shadowban Scanner v2, many improvements and new features have been added in the three months since the last update of v1.
author: ろぼいん
thumbnail: ./v2-cover.png
pubDate: "2023-09-30T00:00:00+09:00"
---

It has been almost three months since the last update, but I have released version 2 of Shadowban Scanner, an extension that allows you to check Twitter (X) shadowban and sensitive judgments without having to go to an external site.

The [official website](https://robot-inventor.github.io/shadowban-scanner/) is also now available. Please take a look at it as well.

## What Is Shadowban Scanner?

Shadowban Scanner is an extension that allows you to check Twitter's so-called shadowban and sensitive judgments on the fly without having to go to an external site.

Shadowban Scanner can be downloaded from the following links:

<div id="extension-badge-container">

[![Chrome](./chrome.svg)](https://chrome.google.com/webstore/detail/enlganfikppbjhabhkkilafmkhifadjd/)
[![Edge](./Edge.svg)](https://microsoftedge.microsoft.com/addons/detail/shadowban-scanner/kfeecmboomhggeeceipnbbdjmhjoccbl)
[![Firefox](./Firefox.svg)](https://addons.mozilla.org/firefox/addon/shadowban-scanner/)

</div>
<style>
#extension-badge-container p {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
}
#extension-badge-container img {
  width: auto;
  height: 5rem;
}
</style>

Just install it on your web browser and you will have access to the following features

- Per-account shadowban and sensitive flag detection
- Sensitive flag detection for profile media (icons and header images)
- Detection of sensitive flags per tweet
- Detect age restrictions on tweets

![screenshot of Shadowban Scanner](./screenshot2_en.png)

All processing is done on the user's computer. There is no communication with external servers or access to Twitter's internal APIs to obtain your credentials without your permission, as is the case with some extensions. Your data and privacy are protected.

Shadowban Scanner is available in the latest versions of Google Chrome, Microsoft Edge, and Mozilla Firefox for PCs. For technical reasons, it is not available on smartphones (except Firefox Nightly for Android).

More information on how it works can be found on the following page.

- [How Shadowban Scanner Works and About Shadowban - Shadowban Scanner](https://github.com/Robot-Inventor/shadowban-scanner/blob/main/doc/en/about-shadowban.md)

:::note info
Shadowban Scanner, like other similar tools, can produce false positives and false negatives; I recommend using it in conjunction with other tools while continuously checking account and tweet status with Shadowban Scanner.
:::

## Highlights of v2

Shadowban Scanner v2 has seen many improvements and new features added in the nearly three months since the last update of v1.

The following list is a sampling of the major changes. All changes can be found on the [release page](https://github.com/Robot-Inventor/shadowban-scanner/releases/tag/v2.0.0).

### 🎉New Features

- Added the ability to detect sensitive flags in profiles
- Function to display check results only on your own tweets is now officially available
- Launched [official website](https://robot-inventor.github.io/shadowban-scanner/)
- Support for Traditional Chinese and Korean
- Support for Microsoft Edge
- Added explanations about shadowban, sensitive judgment, and Shadowban Scanner
- Version number text linked to the release notes added to the settings window

### 🔧Changes

- Changed to use [Twemoji](https://twemoji.twitter.com/) instead of OS standard emoji
- Changed the text of setting items to make them easier to understand.
- Added a loading animation when it takes time to load results
- Changed message wording to be clearer and easier to understand

### 📝Other

- Added [localization guide](https://github.com/Robot-Inventor/shadowban-scanner/blob/main/doc/localization.md)
- Disclosed detailed technical information about Shadowban Scanner
- Added JSDoc

## Schedule for v3

I am currently preparing for the development of Shadowban Scanner v3.

As a private developer, I cannot make any promises regarding the release of v3, but I hope to be able to release it sooner than v2.

Shadowban Scanner v3 will include a button to tweet the results and the ability to detect display restrictions for legal reasons.

Shadowban Scanner offers all features for free. Please [follow me on Twitter](https://twitter.com/keita_roboin) and spread the word about Shadowban Scanner as it will encourage development!

Also, if you have any problems, please send me a DM on Twitter or [GitHub](https://github.com/Robot-Inventor/shadowban-scanner).
