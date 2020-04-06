#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob


FOOTER_FILE_PATH = "etc/html/footer.min.html"
FOOTER_START_MESSAGE = "<footer>"
FOOTER_END_MESSAGE = "</footer>"

template_footer = ""

with open(FOOTER_FILE_PATH, mode="r", newline="", encoding="utf-8_sig") as f:
    template_footer = f.read().strip()

def change_footer(html_file_path):
    old_footer = ""
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        old_footer = f.read()
        old_footer = old_footer.replace("\r\n", "\n").replace("\r", "\n")
    with open(html_file_path, mode="w", newline="", encoding="utf-8_sig") as f:
        pattern = re.compile(f"{FOOTER_START_MESSAGE}.*?{FOOTER_END_MESSAGE}", re.MULTILINE | re.DOTALL)
        old_footer = re.sub(pattern, f"{FOOTER_START_MESSAGE}\n{template_footer}\n{FOOTER_END_MESSAGE}", old_footer)
        f.write(old_footer)

for file in glob.glob("**/*.html", recursive=True):
    change_footer(file)
print("Finished.")
