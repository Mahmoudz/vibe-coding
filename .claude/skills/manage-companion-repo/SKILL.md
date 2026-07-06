---
name: manage-companion-repo
description: Use whenever working in the vibe-coding companion repo (github.com/Mahmoudz/vibe-coding) or asked to update "the companion repo", "the vibe-coding repo", "the handbook repo", its README, its table of contents, its discussions, or its downloadable materials (AI OS, agents, boilerplates, skills, examples). Defines what this repo is, why it exists, and exactly how to change it safely.
---

# Manage the Companion Repo

## What this repo is

This is the **public companion and community repo** for the book *Vibe Coding with Confidence: The Vibecoder's Handbook* (read online: https://zalt.me/guides/vibe-coding). It is **not** the book. It exists for two jobs:

1. **Community**: it is the backend for on-page comments and discussion. Every chapter page on the site embeds [giscus](https://giscus.app), which maps each page to a **GitHub Discussion in this repo**. Readers ask questions, share what they built, and correct chapters, right where they read. Discussions must be enabled and the giscus app installed for this to work.
2. **Materials**: it ships the downloadable, installable companion assets, an AI OS, preconfigured agents, boilerplates and starters, Claude Code skills, and worked examples. See the `Coming soon` section of the README for the roadmap.

## Why it exists

- The book's paid chapters are the product and are **sold, never published here**. This repo is the free surface that drives reach: comments create engagement and UGC (good for SEO/AEO), and the free materials pull people toward the book and the author's services.
- Keeping community + materials in one public repo means one place to star/watch, one discussions home, and one license.

## The golden rule: NO book content here

Never put chapter body text (free or paid) in this repo. It holds the **table of contents, the pitch, the coming-soon roadmap, discussions, and materials** only. Book prose lives in the private book source and on the site.

## Structure

```
README.md              <- the public face: hero, TOC, who-it's-for, coming-soon, license. TOC is GENERATED.
LICENSE                <- build anything with the materials, don't resell the materials themselves; book all rights reserved.
assets/cover.webp      <- book cover shown in the README hero.
scripts/gen-readme.mjs <- regenerates README.md from the book's source of truth. DO NOT hand-edit the TOC.
skills/                <- (coming) Claude Code skills that ship with the book.
starters/              <- (coming) boilerplates and starter scaffolds.
examples/              <- (coming) worked example projects.
.claude/skills/        <- this skill.
```

## How to update the README (the common task)

The README's table of contents is **generated**, not hand-written. It is built from the book's `book.json` + `<lang>/meta.json` in the website repo. So:

- **To change the TOC** (chapters added/renamed/reordered/retitled): do NOT edit the README. Change the book source, then run:
  ```bash
  node scripts/gen-readme.mjs
  ```
  `BOOK_DIR` env var points at the book source (defaults to the local website path; override if repos move). `REPO_SLUG` and `SITE` are also overridable.
- **To change the title, subtitle, tagline, or prose sections** (who-it's-for, why-it-exists, coming-soon, license): edit the template strings inside `scripts/gen-readme.mjs`, then re-run it. Editing `README.md` directly will be overwritten on the next generate.

The book source is the master. Whenever the book's chapters change, this README must be regenerated in the same change (the website's `manage-handbook` skill enforces this from the other side).

## Adding materials

Each material is self-contained in its own folder under `skills/`, `starters/`, or `examples/`, with its own README explaining install/use (e.g. "copy into `.claude/skills/`"). Keep them independent so people can take just the one they need. When you add one, remove it from the README's `Coming soon` list.

## Discussions / giscus

- The site's giscus config points at THIS repo; do not rename the repo without updating the giscus config on the site (GitHub redirects the repo, but the giscus `data-repo-id` should still be re-verified).
- Discussion threads are created per page pathname on first comment. Do not delete them; they are the comment history for that chapter.

## License

Custom, plain-language (see `LICENSE`): people may use and modify the materials to build anything, including commercial products, but may not resell or redistribute the materials themselves as a standalone product. Book text is all rights reserved and not in this repo.
