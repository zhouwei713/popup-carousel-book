#!/usr/bin/env python3
"""Build a single-file pop-up carousel book.

Usage:
    python3 build.py BOOK.js OUT.html [--images DIR]

BOOK.js   a JavaScript file that defines `const BOOK = {...}` (and optionally
          extra `ART.name = (args) => ({ dw, dh, draw(c) { ... } })` entries).
--images  folder of .png/.webp/.jpg files; each file becomes `img:<filename
          without extension>` usable as an `art` name in BOOK.
Only the Python standard library is used.
"""
import argparse
import base64
import json
import mimetypes
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENGINE = ROOT / "assets" / "engine.html"
PLACEHOLDER = "/*__BOOK_CONFIG__*/"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("book")
    ap.add_argument("out")
    ap.add_argument("--images", default=None)
    a = ap.parse_args()

    engine = ENGINE.read_text(encoding="utf-8")
    if engine.count(PLACEHOLDER) != 1:
        print("engine.html is missing the config placeholder", file=sys.stderr)
        return 1
    cfg = pathlib.Path(a.book).read_text(encoding="utf-8")
    if not re.search(r"\bconst\s+BOOK\s*=", cfg):
        print("BOOK.js must define `const BOOK = {...}`", file=sys.stderr)
        return 1

    images = {}
    total = 0
    if a.images:
        for p in sorted(pathlib.Path(a.images).iterdir()):
            if p.suffix.lower() not in (".png", ".webp", ".jpg", ".jpeg"):
                continue
            data = p.read_bytes()
            total += len(data)
            mime = mimetypes.guess_type(p.name)[0] or "image/png"
            images[p.stem] = f"data:{mime};base64," + base64.b64encode(data).decode()
            if len(data) > 400_000:
                print(f"warning: {p.name} is {len(data)//1024} KB; shrink it (max side 900px, webp) to keep the page light")
    used = set(re.findall(r"img:([A-Za-z0-9_\-]+)", cfg))
    missing = used - set(images)
    if missing:
        print("warning: BOOK uses images that were not found: " + ", ".join(sorted(missing)))

    title = re.search(r"title\s*:\s*['\"]([^'\"]+)['\"]", cfg)
    inject = "const BOOK_IMAGES = " + json.dumps(images) + ";\n" + cfg + "\n"
    html = engine.replace(PLACEHOLDER, inject)
    html = html.replace("__BOOK_TITLE__", (title.group(1) if title else "Pop-up Book").replace("<", ""))
    out = pathlib.Path(a.out)
    out.write_text(html, encoding="utf-8")
    size = out.stat().st_size
    print(f"built {out} ({size/1024:.0f} KB, {len(images)} images)")
    if size > 12 * 1024 * 1024:
        print("warning: file is over 12 MB; compress the images")
    return 0


if __name__ == "__main__":
    sys.exit(main())
