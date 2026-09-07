#!/usr/bin/env python3
"""Install a speaker portrait: square crop, 600px, no metadata.

    python3 assets/install-photo.py <src> <slug> [focus]

`focus` is where the centre of the square sits vertically, 0 = top edge,
1 = bottom edge, default 0.42 — portraits put the face above centre, so a
blind centre crop tends to slice the top of the head.
"""
import sys
from PIL import Image

src, slug = sys.argv[1], sys.argv[2]
focus = float(sys.argv[3]) if len(sys.argv) > 3 else 0.42

im = Image.open(src)
im = im.convert('RGB')
w, h = im.size
side = min(w, h)

# horizontal: centred. vertical: centred on `focus`, clamped inside the frame.
left = (w - side) // 2
top = int(focus * h - side / 2)
top = max(0, min(top, h - side))

im = im.crop((left, top, left + side, top + side)).resize((600, 600), Image.LANCZOS)
out = 'assets/people/%s.jpg' % slug
im.save(out, 'JPEG', quality=86, optimize=True)   # re-encode drops all EXIF
print('%s  %dx%d from %dx%d  crop_top=%d' % (out, 600, 600, w, h, top))
