#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob


CSS_FILE_PATH = "etc/css/main_style.min.css"
CSS_START_MESSAGE = "<!--template css start-->"
CSS_END_MESSAGE = "<!--template css end-->"

template_css = ""

with open(CSS_FILE_PATH, mode="r", newline="", encoding="utf-8_sig") as f:
    template_css = f.read().strip()

def change_css(html_file_path):
    old_css = ""
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        old_css = f.read()
        old_css = old_css.replace("\r\n", "\n").replace("\r", "\n")
    with open(html_file_path, mode="w", newline="", encoding="utf-8_sig") as f:
        pattern = re.compile(f"{CSS_START_MESSAGE}.*?{CSS_END_MESSAGE}", re.MULTILINE | re.DOTALL)
        old_css = re.sub(pattern, f"{CSS_START_MESSAGE}\n{template_css}\n{CSS_END_MESSAGE}", old_css)
        f.write(old_css)

for file in glob.glob("**/*.html", recursive=True):
    change_css(file)
print("Finished.")
