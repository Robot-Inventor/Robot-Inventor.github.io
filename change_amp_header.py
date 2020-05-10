#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob


HEADER_FILE_PATH = "etc/html/header_menu_amp.min.html"
HEADER_START_MESSAGE = "<!--header start-->"
HEADER_END_MESSAGE = "<!--header end-->"

template_header = ""

with open(HEADER_FILE_PATH, mode="r", newline="", encoding="utf-8_sig") as f:
    template_header = f.read().strip()

def change_header(html_file_path):
    old_header = ""
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        old_header = f.read()
        old_header = old_header.replace("\r\n", "\n").replace("\r", "\n")
    if "<html amp" in old_header:
        with open(html_file_path, mode="w", newline="", encoding="utf-8_sig") as f:
            pattern = re.compile(f"{HEADER_START_MESSAGE}.*?{HEADER_END_MESSAGE}", re.MULTILINE | re.DOTALL)
            old_header = re.sub(pattern, f"{HEADER_START_MESSAGE}\n{template_header}\n{HEADER_END_MESSAGE}", old_header)
            f.write(old_header)
    return

for file in glob.glob("**/*.html", recursive=True):
    change_header(file)
print("Finished.")
