#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob


HEADER_FILE_PATH = "etc/html/header_menu.min.html"
HEADER_START_MESSAGE = "<header>"
HEADER_END_MESSAGE = "</header>"

template_header = ""

with open(HEADER_FILE_PATH, mode="r", newline="", encoding="utf-8_sig") as f:
    template_header = f.read().strip()

def change_jquery(html_file_path):
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        old_header = f.read()
        old_header = old_header.replace("\r\n", "\n").replace("\r", "\n")
    with open(html_file_path, mode="w", newline="", encoding="utf-8_sig") as f:
        old_header = old_header.replace('<link rel="preload" href="https://code.jquery.com/jquery-3.2.1.min.js" as="script">',
                                        '<link rel="preload" href="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" as="script">').replace(
                                            '<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>',
                                            '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>')
        f.write(old_header)

for file in glob.glob("**/*.html", recursive=True):
    change_jquery(file)
print("Finished.")
