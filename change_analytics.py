#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob


def change_script(html_file_path):
    old_script = ""
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        old_script = f.read()
        old_script = old_script.replace("\r\n", "\n").replace("\r", "\n")
    with open(html_file_path, mode="w", newline="", encoding="utf-8_sig") as f:
        old_script = old_script.replace(
            '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-140830854-3"></script>',
            '<script defer src="https://www.googletagmanager.com/gtag/js?id=UA-140830854-3"></script>')
        f.write(old_script)

for file in glob.glob("**/*.html", recursive=True):
    change_script(file)
print("Finished.")
