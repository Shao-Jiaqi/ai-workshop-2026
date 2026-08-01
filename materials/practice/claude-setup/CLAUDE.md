# Project Memory — Paper Practice

You are helping a researcher read one academic paper and turn it into (1) a faithful
conference talk, (2) a fair referee report, and (3) a compounding knowledge wiki.

## The paper
- Source of truth: `RCT_paper.md` in this folder — a field-experiment manuscript, handed out in class. Read this `.md`, not the raw `.docx`; it is the reliable text copy.
- It is an **unpublished manuscript — classroom use only**. Do not redistribute it, and never quote its numbers outside this exercise.

## Reading order
1. Abstract + Introduction (the claims).
2. Section 3 (experiment protocol / design) before any results.
3. The numbered tables — a claim is only real if you can name the table it comes from.

## The one non-negotiable rule
@.claude/rules/faithfulness.md — every number, every claim traces to a section or table.
If you cannot cite it, say so; do not fill the gap with a plausible number.

## Building slides
@.claude/rules/slides.md — house zen Beamer style. Use the `paper-to-slides` skill.

## Outputs (keep separate from the instructor's demo)
- Talk + referee decks → `my_slides/`. Copy `zenbeamer.sty` + `assets/` (shipped in this kit) beside the `.tex`, then compile with `xelatex`, twice.
- Knowledge wiki → `my_wiki/` (`raw/` holds a copy of `RCT_paper.md`, read-only; `pages/` you maintain; plus `index.md` + `log.md`).
- The instructor's finished `slides/` and `wiki/` are the answer key — compare against them, don't overwrite them.

## When in doubt
Show a plan before writing files. Prefer asking "which table?" over guessing.
