#!/usr/bin/env python3
"""Inline assets/enso.svg into the <!--ENSO--> placeholder in a page.

The enso has to be inline rather than an <img> so the stylesheet can colour it
with the theme tokens and animate the draw-on. Run from the site root after
editing either the SVG or a page:

    python3 assets/inject-enso.py index.html
"""
import re
import sys
import pathlib

root = pathlib.Path(__file__).resolve().parent.parent
svg = (root / "assets" / "enso.svg").read_text()

for name in sys.argv[1:]:
    p = root / name
    html = p.read_text()
    # replace the placeholder, or an already-injected <svg> block, idempotently
    pattern = re.compile(
        r'(<div class="enso"[^>]*>)(.*?)(</div>)', re.S)
    if not pattern.search(html):
        print(f"{name}: no .enso container, skipped")
        continue
    html = pattern.sub(lambda m: m.group(1) + "\n" + svg.rstrip() + "\n      " + m.group(3),
                       html, count=1)
    p.write_text(html)
    print(f"{name}: enso inlined ({len(svg)} bytes)")
