# Rule — House Slide Style (zen Beamer)

Any deck you build uses the shared zen theme so it matches the course.

## Boilerplate
- Output decks to `my_slides/`. First copy `zenbeamer.sty` and `assets/` (shipped in this kit) into `my_slides/` so the `.tex` compiles.
- `\documentclass[aspectratio=169,10pt]{beamer}` + `\usepackage{zenbeamer}`.
- Set `\zensession`, `\zentitletext`, `\zensubtitle`, `\zenpresenter`, `\zenfootsession`.
- Compile with **xelatex, twice** (the NUS crest is an overlay). Never pdflatex.

## Palette (colour-blind safe)
`seal` = emphasis/alert · `ink`/`inksoft` = normal/secondary · `stone` = muted. No blue/orange.

## Content rules
- One framing italic sentence per slide, then telegraphic bullets (≤ 2 lines each).
- Every slide carries a substantive element: a diagram, a table, or a command box.
- **No overlays** (`\pause`, `\only`, `\onslide`, `\uncover`) — build with separate slides + colour.
- Max 2 coloured boxes per slide.
- Motivation before formalism; a worked example within two slides of any definition.
- Second-to-last slide = References (`thebibliography`, `\small`); then a Thank-you; then backup slides.

## Faithfulness on slides
Every number on a slide names its table. See @.claude/rules/faithfulness.md.
