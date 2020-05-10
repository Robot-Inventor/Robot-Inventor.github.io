#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob


PRELOAD_FILE_PATH = "preload_items.html"
PRELOAD_START_MESSAGE = "<!--template preload start-->"
PRELOAD_END_MESSAGE = "<!--template preload end-->"

template_preload = ""

with open(PRELOAD_FILE_PATH, mode="r", newline="", encoding="utf-8_sig") as f:
    template_preload = f.read().strip()

def change_preload(html_file_path):
    old_preload = ""
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        old_preload = f.read()
        old_preload = old_preload.replace("\r\n", "\n").replace("\r", "\n")
    if "<html amp" in old_preload:
        return
    with open(html_file_path, mode="w", newline="", encoding="utf-8_sig") as f:
        pattern = re.compile(f"{PRELOAD_START_MESSAGE}.*?{PRELOAD_END_MESSAGE}", re.MULTILINE | re.DOTALL)
        old_preload = re.sub(pattern, f"{PRELOAD_START_MESSAGE}\n{template_preload}\n{PRELOAD_END_MESSAGE}", old_preload)
        f.write(old_preload)
    return

for file in glob.glob("**/*.html", recursive=True):
    change_preload(file)
print("Finished.")
