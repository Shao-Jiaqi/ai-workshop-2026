# Practices A · B · C

Three hands-on blocks, 20 minutes each, all on the **same paper**. They compound: A
gets you a verified reading, B turns it into two deliverables, C turns it into
knowledge that keeps paying back.

The paper is a field RCT. It is an **unpublished manuscript**, so it is not distributed
here — you get it in the room at the start of Session 1B, together with a folder to work
in. Everything else you need is in this repository, so you can read ahead.

Please do not redistribute the paper, and do not quote its numbers or tables outside the
exercises.

---

## Install the kit first (2 minutes)

Everything runs out of [`claude-setup/`](claude-setup/). From the folder that holds the
paper:

```bash
mkdir -p .claude
cp claude-setup/CLAUDE.md ./CLAUDE.md
cp -r claude-setup/{rules,skills,agents} .claude/
claude
```

Check it loaded:

```
> /memory     # should show CLAUDE.md
> /agents     # should list: referee
```

What the kit gives you:

| Piece | What it is | Used in |
|---|---|---|
| `CLAUDE.md` | Project memory — reading order, the faithfulness rule, where outputs go | A · B · C |
| `rules/faithfulness.md` | The non-negotiable: never invent a number; cite a table | A · B · C |
| `rules/slides.md` | House Beamer style (zen theme) for any deck you build | B |
| `skills/paper-to-slides/` | A skill that turns a paper into a faithful talk deck | B |
| `agents/referee.md` | A subagent that writes a fair referee report | B |

It is adapted from Pedro Sant'Anna's public academic workflow —
<https://psantanna.com/claude-code-my-workflow/>.

---

## Practice A — Set up, then understand the paper

**Session 1B · 20 min · [`A-first-session/PA_practice.pdf`](A-first-session/PA_practice.pdf)**

You have just met the agent; now put it on a real paper.

- **Produce:** a working Claude Code setup, and a *verified* one-paragraph overview.
- **Rhythm:** set up (5 min) → orient (8 min) → verify (6 min).
- **The habit you keep:** read and verify. Never accept a number without naming the
  table it came from.

## Practice B — Paper to talk, then to referee

**Session 2 · 20 min · [`B-paper-to-slides/PB_practice.pdf`](B-paper-to-slides/PB_practice.pdf)**

Two finished artifacts from one paper: present it fairly, then referee it fairly.

- **Produce:** a faithful talk deck (`present.tex`) and a referee report (`critic.tex`).
- **Rhythm:** plan (4 min) → talk (8 min) → referee (8 min).
- **Levers:** plan mode (Shift+Tab), the `paper-to-slides` skill, the `referee` subagent.
- Your instructor's demo is the target. Yours need not match slide-for-slide — only
  fact-for-fact.

## Practice C — Make the paper compound

**Session 3A · 20 min · [`C-llm-wiki/PC_practice.pdf`](C-llm-wiki/PC_practice.pdf)**

A talk is used once; a wiki keeps paying back every time you return to the paper.

- **Produce:** a mini LLM wiki — `index.md`, a few pages, `log.md`, then a lint pass.
- **Rhythm:** schema → ingest → query → lint.
- **Pattern:** the raw source stays read-only; the agent maintains the knowledge pages.
- **Payoff:** next time you query the wiki instead of re-reading 40 pages.

---

## Where your work goes

Build in `my_slides/` and `my_wiki/` so you never overwrite the instructor's demo.
Copy `claude-setup/zenbeamer.sty` and `claude-setup/assets/` next to your `.tex`
before compiling, and run `xelatex` **twice**.

The instructor's finished wiki is the answer key for Practice C. It quotes the paper's
results, so it is shown in the room rather than published here — after you have built
your own, not before.
