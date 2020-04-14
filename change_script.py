#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob


SCRIPT_FILE_PATH = "template_script.html"
SCRIPT_START_MESSAGE = "<!--template script start-->"
SCRIPT_END_MESSAGE = "<!--template script end-->"

template_script = ""

with open(SCRIPT_FILE_PATH, mode="r", newline="", encoding="utf-8_sig") as f:
    template_script = f.read().strip()

def change_script(html_file_path):
    old_script = ""
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        old_script = f.read()
        old_script = old_script.replace("\r\n", "\n").replace("\r", "\n")
    with open(html_file_path, mode="w", newline="", encoding="utf-8_sig") as f:
        pattern = re.compile(f"{SCRIPT_START_MESSAGE}.*?{SCRIPT_END_MESSAGE}", re.MULTILINE | re.DOTALL)
        old_script = re.sub(pattern, f"{SCRIPT_START_MESSAGE}\n{template_script}\n{SCRIPT_END_MESSAGE}", old_script)
        f.write(old_script)

for file in glob.glob("**/*.html", recursive=True):
    change_script(file)
print("Finished.")
