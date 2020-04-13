#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob



def change_css(html_file_path):
    old_css = ""
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        old_css = f.read()
        old_css = old_css.replace("\r\n", "\n").replace("\r", "\n")
    if "lazysizes" in old_css:
        print(html_file_path)

for file in glob.glob("**/*.html", recursive=True):
    change_css(file)
print("Finished.")
