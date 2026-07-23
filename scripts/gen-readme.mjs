// Regenerates README.md from the book's source of truth (book.json + en/meta.json).
// Re-run whenever chapters change so the TOC never drifts:
//
//   node scripts/gen-readme.mjs
//
// ponytail: BOOK_DIR is hardcoded to the sibling website repo; override via env
// when the repos move or become submodules of a shared parent.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '..')

const BOOK_DIR =
  process.env.BOOK_DIR ||
  '/Users/mega/_MEGA_Local/Code/_projects/my-personal-website/current/src/content/books/vibe-coding'
const SITE = process.env.SITE || 'https://zalt.me'
const REPO_SLUG = process.env.REPO_SLUG || 'Mahmoudz/vibe-coding'

const book = JSON.parse(fs.readFileSync(path.join(BOOK_DIR, 'book.json'), 'utf8'))
const meta = JSON.parse(fs.readFileSync(path.join(BOOK_DIR, 'en', 'meta.json'), 'utf8'))
const base = SITE + book.basePath

// Title/subtitle/tagline come straight from the site's meta.json (source of truth).
// meta.title may carry a "\n" to control the web cover's line break; flatten
// it to one line for the README heading and image alt text.
const TITLE = meta.title.replace(/\s*\n\s*/g, ' ')
const SUBTITLE = meta.subtitle
const TAGLINE = meta.tagline.replace(/\.+$/, '')

// Build the table of contents as a scannable table: one row per part (not per
// chapter), numbered 01-N with the Introduction left unnumbered. Part-level
// links, so adding/renaming/reordering chapters inside a part never re-runs.
// ponytail: table + blurb from meta.json, no per-chapter listing to maintain.
const toc = ['| # | Stage | What you walk away with |', '|:---:|:---|:---|']
let stageNum = 0
for (const part of book.parts) {
  const p = meta.parts[part.id]
  const chapters = book.chapters.filter((c) => c.part === part.id && !c.hidden)
  if (!chapters.length) continue

  const num = part.id === 'intro' ? '' : `**${String(++stageNum).padStart(2, '0')}**`
  const url = `${base}/${part.id}`
  toc.push(`| ${num} | [**${p.stage}**](${url}) | ${p.blurb} |`)
}

const published = book.chapters.filter((c) => c.status === 'published').length
const total = book.chapters.filter((c) => !c.hidden).length
const partCount = book.parts.filter(
  (part) => book.chapters.some((c) => c.part === part.id && !c.hidden),
).length

const badge = (label, msg, color) =>
  `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(msg)}-${color}`

const readme = `<div align="center">

<img src="${SITE}/images/books/vibe-coding-cover.png" alt="${TITLE}" width="280" />

# ${TITLE}

### ${SUBTITLE}

${TAGLINE}.

**A free, end-to-end guide to building production-grade software with AI**, from a plain idea to live, scaling software, using agents like Cursor and Claude Code. No signup, no paywall to start.

[**Read it free online →**](${base})

[![Free to read](${badge('read', 'free', '16a34a')})](${base})
[![Web book](${badge('format', 'web book', '111')})](${base})
[![Chapters](${badge('chapters', `${total}`, '2563eb')})](${base})
[![Discussions](https://img.shields.io/github/discussions/${REPO_SLUG}?color=6d28d9&label=discussions)](../../discussions)

</div>

---

You get your AI to build something impressive in a weekend. A month later you're afraid to touch it.

Not because the model is bad. Not because your prompts were bad. Because **building software and maintaining software are completely different problems.**

Anyone can get AI to generate code. The hard part is keeping that app alive after the first version ships. Every new feature adds complexity. Every refactor risks breaking something else. The architecture drifts, context gets lost, old bugs come back, and technical debt grows faster than the AI can pay it down. Eventually you spend more time directing, checking, and repairing the AI than you'd have spent writing the code yourself.

That's the point where most people decide AI isn't ready. I think they're solving the wrong problem.

The question isn't *"How do I get AI to build my app?"*

The question is *"How do I build a system that can continuously build, test, deploy, monitor, and improve my app?"*

One produces code. The other produces **software that survives.**

That's also why prompting alone isn't enough. A prompt only tells the AI what to do next. A production system needs memory, architecture, standards, testing, deployment, monitoring, feedback loops, schedules, tools, and clear boundaries about what can happen automatically and what still needs a human.

Once those pieces exist, something changes. The AI stops behaving like a coding assistant and starts behaving like a **software engineering system**: it implements a feature, verifies it, deploys it, watches production, investigates failures, fixes safe issues on its own, proposes improvements from real usage, and comes back only when a decision actually needs you.

You don't get there with a magic prompt. You get there by building the engineering system first. **That's what this book walks you through, one stage at a time.**

**Who it's for:** people who build mostly by directing an AI agent (Cursor, Claude Code, and friends) and want apps that hold up in production, not demos that fall over. No CS degree assumed. If you can describe what you want and read what the agent gives back, you're in.

## The journey

The complete arc, one stage per part:

${toc.join('\n')}

Notice the shape:

- The **first half** teaches you to build software like a senior engineer.
- The **second half** teaches you how software stays alive without needing you.

Only once that lifecycle exists can you hand it over piece by piece. As the system earns your trust, you give it more responsibility, until it can safely build, deploy, and maintain your app with minimal supervision. You never fully disappear from the loop, you just stop being responsible for every step inside it.

## Want the ready-made system?

This book teaches you to build your **own** AI operating system to run your agents. That is the point: you learn how it works, and you get something shaped exactly for how you build.

If you would rather start from a working one, there may be a shortcut. The author runs a private, battle-tested system that does what this book describes, and it could be released as its own project.

**Want it? [Vote for it here →](../../discussions/3).** Enough interest and it ships.

## This repo

- **Read the book** at [zalt.me](${base}), free. This repo is the companion, not the book text.
- **Ask and discuss:** every chapter page has its own comment thread, or [open a discussion](../../discussions). Be kind, stay on topic, search before posting.
- **Contribute:** spotted an error, an outdated command, or a gap? Open a discussion or a pull request. Content fixes flow back into the book.

## License

Use anything here to build whatever you want, including commercial products. Just don't resell or redistribute the materials themselves as a standalone product. The book's text is not in this repo and is all rights reserved. See [LICENSE](./LICENSE).

---

<div align="center">

Written by [Mahmoud Zalt](${SITE}) · [zalt.me](${SITE})

</div>

<!-- Generated by scripts/gen-readme.mjs; do not hand-edit. -->
`

fs.writeFileSync(path.join(REPO, 'README.md'), readme)
console.log(`README.md written: ${published}/${total} chapters across ${partCount} parts.`)
