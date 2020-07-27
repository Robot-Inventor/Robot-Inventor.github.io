#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob
import typing


def search_class(html_file_path: str, class_name: str) -> typing.List[str]:
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        html_content = f.read()
        html_content = html_content.replace("\r\n", "\n").replace("\r", "\n")
    class_list = re.findall("class=[\'\"].*?[\'\"]", html_content)
    result = []
    for class in class_list:
        if class_name in class:
            result.append(html_file_path)
    return result


def check(html_file_path: str) -> None:
    html_content = ""
    html_file_path = html_file_path.replace("\\", "/")
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        html_content = f.read()
        html_content = html_content.replace("\r\n", "\n").replace("\r", "\n")
    a_elements = re.findall("<a.*?href=[\"\'].*?[\"\'].*?>.*?</a>", html_content)
    if a_elements:
        for content in a_elements:
            if (not re.search("href=[\"\'](/|https://robot-inventor|#).*[\"\']", content) and re.search("href=[\"\']http.*[\"\']", content)) and not re.search("target=[\"\']_blank[\'\"]", content):
                print(f"{html_file_path}  外部リンク{content}にはtarget=\"_blank\"が必要です。")
            if (re.search("href=[\"\'](/|https://robot-inventor|#).*[\"\']", content) or not  re.search("href=[\"\']http.*[\"\']", content)):
                if "target=" in content:
                    print(f"{html_file_path}  内部リンク{content}にtarget属性は不要です。")
                if "rel=" in content:
                    print(f"{html_file_path}  内部リンク{content}にrel属性は不要です。")
            if re.search("target=[\"\']_blank[\'\"]", content) and (not re.search("rel=[\"\'].*?noopener", content) or not re.search("rel=[\"\'].*?noreferrer", content)):
                print(f"{html_file_path}  target=\"_blank\"が指定されている{content}にはrel=\"noopener noreferrer\"が必要です。")
    if "<html amp" in html_content:
        if not (re.search(f'<link rel=[\'\"]canonical[\'\"] href="https://robot-inventor.github.io/{html_file_path}">', html_content) or re.search('<link rel=[\'\"]canonical[\'\"] href=[\'\"]https://robot-inventor.github.io/' + re.sub("index\.html$", "", html_file_path) + '[\'\"]>', html_content)):
            print(f"{html_file_path}  canonicalの値が不正です。")
        if re.search(f'<link rel=[\'\"]canonical[\'\"] href="https://robot-inventor.github.io/{html_file_path}">', html_content) and re.search("index\.html$", html_file_path):
            print(f"{html_file_path}  canonicalの末尾のindex.htmlは不要です。")
    return

for file in glob.glob("**/*.html", recursive=True):
    check(file)
print("Finished.")
