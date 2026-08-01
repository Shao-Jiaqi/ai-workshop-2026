# Claude Code Setup — Paper Practice Kit

A minimal academic Claude Code setup for the workshop practice, adapted from
Pedro Sant'Anna's public workflow (<https://psantanna.com/claude-code-my-workflow/>).
It gives you three things you will use across the three practice sessions:

| Piece | What it is | Used in |
|---|---|---|
| `CLAUDE.md` | Project memory — reading order, faithfulness rule, where outputs go | A, B, C |
| `rules/faithfulness.md` | The non-negotiable: never invent a number; cite a table | A, B, C |
| `rules/slides.md` | House Beamer style (zen theme) for any deck you build | B |
| `skills/paper-to-slides/` | A skill that turns a paper into a faithful talk deck | B |
| `agents/referee.md` | A subagent that writes a fair referee report | B |

## Install (2 minutes)

From your project folder (the one that holds the paper), copy this kit into
a `.claude/` directory so Claude Code loads it automatically:

```bash
mkdir -p .claude
cp claude-setup/CLAUDE.md        ./CLAUDE.md
cp -r claude-setup/rules          .claude/rules
cp -r claude-setup/skills         .claude/skills
cp -r claude-setup/agents         .claude/agents
```

Then start Claude Code in that folder:

```bash
claude
```

Check it loaded:

```
> /memory        # should show CLAUDE.md
> /agents        # should list: referee
```

## The paper and your outputs

- `RCT_paper.md` is handed out in class — it is an unpublished manuscript and is not in this repository. Read the `.md`, not the raw `.docx`.
- Build your work in `my_slides/` and `my_wiki/`. The instructor's finished versions are shown in the room as the answer key.
- The kit ships `zenbeamer.sty` + `assets/`; copy them into `my_slides/` before you compile a deck.

## What each session does with it

- **Practice A** — install this kit, point Claude at `RCT_paper.md`, get a *verified* overview.
- **Practice B** — use the `paper-to-slides` skill and the `referee` subagent to build a talk deck and a referee deck.
- **Practice C** — reuse the same faithfulness rule to ingest the paper into an LLM Wiki.

> `RCT_paper.md` is an **unpublished manuscript — classroom use only**. Never quote its numbers outside class.
