#!/usr/bin/env python
# -*- coding: utf8 -*-


import re
import glob


def change_css(html_file_path):
    old_css = ""
    with open(html_file_path, mode="r", newline="", encoding="utf-8_sig") as f:
        old_css = f.read()
        old_css = old_css.replace("\r\n", "\n").replace("\r", "\n")
    with open(html_file_path, mode="w", newline="", encoding="utf-8_sig") as f:
        old_css = old_css.replace('<link rel="preload" href="/etc/js/lazysizes.min.js" as="script">',
                                  '<link rel="preload" href="https://cdn.jsdelivr.net/npm/lazysizes@5.2.0/lazysizes.min.js" as="script">').replace(
                                      '<script async src="/etc/js/lazysizes.min.js"></script>',
                                      '<script async src="https://cdn.jsdelivr.net/npm/lazysizes@5.2.0/lazysizes.min.js"></script>')
        f.write(old_css)

for file in glob.glob("**/*.html", recursive=True):
    change_css(file)
print("Finished.")
