---
name: paper-to-slides
description: Turn an academic paper into a faithful conference talk deck (zen Beamer). Use when the user asks to build a presentation, talk, or slides from a paper PDF/DOCX/Markdown. Produces present.tex + a compiled PDF where every number traces to a table.
---

# Paper → Talk

Build a conference-length talk (~18–24 slides) that a co-author would be happy to give.
Faithfulness first: see `.claude/rules/faithfulness.md` and `.claude/rules/slides.md`.

## Workflow

1. **Extract a brief.** Read the paper and write `paper_brief.md`: the question, the design,
   each main result WITH its table number, the mechanism/interpretation, and author-flagged
   limitations. This brief is the single source every slide traces back to. Do NOT skip it.

2. **Outline.** Propose a slide outline (motivation → question → identification problem →
   setting → design → sample → main result → heterogeneity → mechanism → contribution →
   limitations → takeaways → references → backup). Get a nod before drafting.

3. **Draft in the house style.** Write `my_slides/present.tex` using `zenbeamer.sty` (copy `zenbeamer.sty` + `assets/` from the kit into `my_slides/` first). Telegraphic bullets,
   one framing sentence per slide, a diagram/table/command box on every slide, colour emphasis
   (`seal`) on the one number that matters. Put the exact table number next to each statistic.

4. **Compile & verify.** `xelatex present.tex` twice. Then re-read every slide against
   `paper_brief.md`: does each number name its table? Fix any that don't. Fix overfull boxes.

5. **Report.** Page count, any number you could not source (should be zero), and open choices.

## Guardrails
- The talk presents the paper's own claims — not your opinion of them (that is the `referee` agent's job).
- Mark the title slide: "Unpublished manuscript — classroom use only."
- Never invent a statistic to fill a slide; cut the slide instead.
