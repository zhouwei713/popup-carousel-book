#!/usr/bin/env python3
"""Turn a generated character image into a clean transparent PNG sprite.

Usage:
    python3 cutout.py IN.png OUT.png [--tol 48] [--max 900] [--keep-alpha]

* If the image already has real transparency (and --keep-alpha is given, or
  more than 5% of pixels are transparent) it is only trimmed and resized.
* Otherwise the background colour is sampled from the four corners and every
  pixel connected to the border within --tol colour distance is removed
  (flood fill, so white areas inside the character stay). Works best when the
  image was generated on a flat chroma-green (#00FF00) or flat white backdrop.
* Green/white fringe on the cut edge is cleaned, the result is trimmed with a
  small margin and scaled so the longest side is at most --max pixels.
Needs Pillow (pip install pillow).
"""
import argparse
import sys
from collections import deque

try:
    from PIL import Image, ImageFilter
except ImportError:
    print("Pillow is required: pip install pillow", file=sys.stderr)
    sys.exit(1)


def dist(a, b):
    return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** 0.5


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--tol", type=float, default=48)
    ap.add_argument("--max", type=int, default=900)
    ap.add_argument("--keep-alpha", action="store_true")
    a = ap.parse_args()

    im = Image.open(a.src).convert("RGBA")
    w, h = im.size
    alpha = im.getchannel("A")
    transparent = sum(alpha.histogram()[:16])
    if not (a.keep_alpha or transparent > w * h * 0.05):
        # work on a smaller copy for speed, then upscale the mask
        scale = min(1.0, 700 / max(w, h))
        sw, sh = max(1, int(w * scale)), max(1, int(h * scale))
        small = im.convert("RGB").resize((sw, sh), Image.BILINEAR)
        px = small.load()
        corners = [px[0, 0], px[sw - 1, 0], px[0, sh - 1], px[sw - 1, sh - 1]]
        bg = tuple(sorted(c[i] for c in corners)[1] for i in range(3))
        mask = Image.new("L", (sw, sh), 255)
        mp = mask.load()
        seen = bytearray(sw * sh)
        q = deque()
        for x in range(sw):
            q.append((x, 0)); q.append((x, sh - 1))
        for y in range(sh):
            q.append((0, y)); q.append((sw - 1, y))
        while q:
            x, y = q.popleft()
            i = y * sw + x
            if seen[i]:
                continue
            seen[i] = 1
            if dist(px[x, y], bg) > a.tol:
                continue
            mp[x, y] = 0
            if x > 0: q.append((x - 1, y))
            if x < sw - 1: q.append((x + 1, y))
            if y > 0: q.append((x, y - 1))
            if y < sh - 1: q.append((x, y + 1))
        mask = mask.filter(ImageFilter.MinFilter(3)).resize((w, h), Image.BILINEAR).filter(ImageFilter.GaussianBlur(1.2))
        im.putalpha(mask)
        # despill: pull background tint out of semi-transparent edge pixels
        data = im.load()
        greenish = bg[1] > bg[0] + 40 and bg[1] > bg[2] + 40
        for y in range(h):
            for x in range(w):
                r, g, b, al = data[x, y]
                if 0 < al < 250:
                    if greenish and g > max(r, b):
                        g = max(r, b)
                    data[x, y] = (r, g, b, al)
    bbox = im.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
    if not bbox:
        print("nothing left after cut-out; lower --tol or use a flatter background", file=sys.stderr)
        return 1
    pad = int(max(w, h) * 0.02)
    bbox = (max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(h, bbox[3] + pad))
    im = im.crop(bbox)
    if max(im.size) > a.max:
        r = a.max / max(im.size)
        im = im.resize((int(im.width * r), int(im.height * r)), Image.LANCZOS)
    im.save(a.dst, optimize=True)
    print(f"saved {a.dst} {im.size[0]}x{im.size[1]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
