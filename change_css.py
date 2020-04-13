#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob


CSS_START_MESSAGE = "<!--template preload start-->"
CSS_END_MESSAGE = "<!--template preload end-->"


def change_css(html_file_path):
    old_css = ""
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        old_css = f.read()
        old_css = old_css.replace("\r\n", "\n").replace("\r", "\n")
    with open(html_file_path, mode="w", newline="", encoding="utf-8_sig") as f:
        old_css = old_css.replace(
            '        <link rel="preload" href="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" as="script">\n        <link rel="preload" href="/etc/js/basic.min.js" as="script">',
            f'{CSS_START_MESSAGE}\n<link rel="preload" href="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" as="script">\n<link rel="preload" href="/etc/js/basic.min.js" as="script">\n<link rel="preload" href="https://cdn.jsdelivr.net/npm/lazysizes@5.2.0/lazysizes.min.js" as="script">\n{CSS_END_MESSAGE}')
        f.write(old_css)

for file in glob.glob("**/*.html", recursive=True):
    change_css(file)
#change_css("test.html")
print("Finished.")
