#!/usr/bin/env python3
"""
Fix <loc> in Wissen-Sitemaps:
- macht aus relativen /wissen/... Einträgen absolute https://enwendo.de/wissen/...
- lässt bereits absolute http(s):// Einträge in Ruhe
- arbeitet idempotent
- bewahrt XML-Header & Stylesheet-PI, da regex-basiert

Nutze ENV-Variablen BASE_URL und BASE_PATH bei Bedarf.
"""

import os
import re
import glob

BASE_URL = os.environ.get("BASE_URL", "https://enwendo.de").rstrip("/")
BASE_PATH = "/" + os.environ.get("BASE_PATH", "wissen").strip("/")

FILES = [
    "wissen/sitemap_index.xml",
    "wissen/sitemap.xml",
    "wissen/post-sitemap.xml",
    "wissen/page-sitemap.xml",
    "wissen/category-sitemap.xml",
]

# Match <loc>...</loc> mit relativem Pfad auf /wissen..., aber NICHT wenn schon http(s):// davor steht
pattern = re.compile(
    r"(<loc>\s*)(?!https?://)(/?"+ re.escape(BASE_PATH.lstrip("/")) + r"[^<\s]*)(\s*</loc>)",
    flags=re.IGNORECASE
)

def absolutize(content: str) -> str:
    def repl(m):
        path = m.group(2)
        if not path.startswith("/"):
            path = "/" + path
        return f"{m.group(1)}{BASE_URL}{path}{m.group(3)}"
    return pattern.sub(repl, content)

def process_file(path: str) -> bool:
    try:
        with open(path, "r", encoding="utf-8") as f:
            original = f.read()
    except FileNotFoundError:
        return False

    updated = absolutize(original)
    if updated != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(updated)
        print(f"Updated: {path}")
    else:
        print(f"No changes: {path}")
    return True

def main():
    any_found = False
    for f in FILES:
        if process_file(f):
            any_found = True

    # Fallback: alles matchen, falls Dateinamen abweichen
    if not any_found:
        for f in glob.glob("wissen/*sitemap*.xml"):
            process_file(f)

if __name__ == "__main__":
    main()