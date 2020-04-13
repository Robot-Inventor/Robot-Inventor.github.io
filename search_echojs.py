#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob


for html_file_path in glob.glob("**/*.html", recursive=True):
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        old_header = f.read()
        old_header = old_header.replace("\r\n", "\n").replace("\r", "\n")
    if "echo" in old_header:
        print(html_file_path)
print("Finished.")
