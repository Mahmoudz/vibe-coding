// Regenerates README.md and skills/vibe-coding-book/SKILL.md from the book's
// source of truth (book.json + en/meta.json). Re-run whenever chapters change
// so neither one drifts:
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
const AUTHOR_ROLE = meta.authorRole
// ponytail: career start year hardcoded here too (matches src/data/info.ts);
// revisit if that ever moves to a shared config both repos can read.
const EXPERIENCE_YEARS = new Date().getFullYear() - 2010

// Walk the parts once into a plain list (id/num/stage/blurb/url), then derive
// both the README table and the agent-skill stage list from it, so the two
// can never drift out of sync with each other.
const stages = []
let stageNum = 0
for (const part of book.parts) {
  const p = meta.parts[part.id]
  const chapters = book.chapters.filter((c) => c.part === part.id && !c.hidden)
  if (!chapters.length) continue

  const isIntro = part.id === 'intro'
  stages.push({
    id: part.id,
    num: isIntro ? null : ++stageNum,
    stage: p.stage,
    blurb: p.blurb,
    url: `${base}/${part.id}`,
  })
}

// Scannable table: one row per part (not per chapter), numbered 01-N with the
// Introduction left unnumbered. Part-level links, so adding/renaming/
// reordering chapters inside a part never breaks it.
const toc = ['| # | Stage | What you walk away with |', '|:---:|:---|:---|']
for (const s of stages) {
  const num = s.num === null ? '' : `**${String(s.num).padStart(2, '0')}**`
  toc.push(`| ${num} | [**${s.stage}**](${s.url}) | ${s.blurb} |`)
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

**A free web book** on building production-grade software with AI, from a plain idea to live, scaling software, using agents like Cursor and Claude Code. No signup, no paywall to start.

${TAGLINE}.

[![Free to read](${badge('read', 'free', '16a34a')})](${base}) [![Web book](${badge('format', 'web book', '111')})](${base}) [![Chapters](${badge('chapters', `${stageNum}`, '2563eb')})](${base}) [![Pages](${badge('pages', `${total}`, '16a34a')})](${base}) [![Prompts](${badge('prompts', '100+', 'f59e0b')})](${base}) [![Discussions](https://img.shields.io/github/discussions/${REPO_SLUG}?color=6d28d9&label=discussions)](../../discussions)

### [Read it free online →](${base})

</div>

---

## Why this exists

### The problem

You get your AI to build something impressive in a weekend. A month later you're afraid to touch it.

Not because the model is bad. Not because your prompts were bad. Because **building software and maintaining software are completely different problems.**

Anyone can get AI to generate code. The hard part is keeping that app alive after the first version ships. Every new feature adds complexity. Every refactor risks breaking something else. The architecture drifts, context gets lost, old bugs come back, and technical debt grows faster than the AI can pay it down.

That's the point where most people decide AI isn't ready. I think they're solving the wrong problem.

### What actually breaks

The code was never the problem. AI writes working code on the first try more often than most engineers do. What breaks is everything around the code:

- The agent forgets what it built last week and reimplements it slightly differently.
- Context drifts mid-session and the answers quietly get worse.
- It loops on the same bug, retrying the same fix over and over.
- It ships code that works but isn't safe, and you hear about it from a stranger's email.
- It reaches for abstractions nobody asked for, or swaps a core dependency without telling you.

None of that is an AI problem. It's **software engineering, running at ten times the speed, with nobody enforcing the discipline that used to come from typing every line yourself.**

### It's a process problem, not a prompt problem

A prompt only tells the AI what to do next. It doesn't give it memory, architecture, standards, tests, deployment, monitoring, or a clear line between what it can decide alone and what needs you.

I spent over a decade writing software by hand, then the last few years building almost everything with AI. After the first few large AI-built projects broke in the same predictable ways, I wrote down what worked and what consistently failed. That became the 15 stages in this book, **the same order I now run on every build.**

## Who it's for

People who build mostly by directing an AI agent (Cursor, Claude Code, and friends) and want apps that hold up in production, not demos that fall over. No CS degree assumed. If you can describe what you want and read what the agent gives back, you're in.

## What's inside

[![Watch the trailer](https://img.youtube.com/vi/VWxyoqE3FeA/maxresdefault.jpg)](https://www.youtube.com/watch?v=VWxyoqE3FeA)

[**▶ Watch the trailer on YouTube**](https://www.youtube.com/watch?v=VWxyoqE3FeA) · the complete arc, one stage per part, below:

${toc.join('\n')}

Notice the shape:

- The **first half** teaches you to build software like a senior engineer.
- The **second half** teaches you how software stays alive without needing you.
- Every stage ships with copy-paste-ready prompts, **100+** across the book, so you are never staring at a blank cursor.

Only once that lifecycle exists can you hand it over piece by piece. As the system earns your trust, you give it more responsibility, until it can safely build, deploy, and maintain your app with minimal supervision.

## For your AI agent

Give your own coding agent (Claude Code, Codex, Cursor, or anything that reads \`AGENTS.md\`) a one-page primer on this book: what it is, who it's for, and a link for every stage, so it can point you to the right chapter instead of guessing.

- **Claude Code:** \`curl -o .claude/skills/vibe-coding-book/SKILL.md https://raw.githubusercontent.com/${REPO_SLUG}/main/skills/vibe-coding-book/SKILL.md\` *(or just copy [skills/vibe-coding-book/SKILL.md](./skills/vibe-coding-book/SKILL.md))*
- **Codex, Cursor, or anything else:** copy the body of [skills/vibe-coding-book/SKILL.md](./skills/vibe-coding-book/SKILL.md) (everything below the frontmatter) into your project's \`AGENTS.md\`, or into \`.cursor/rules/vibe-coding-book.mdc\` for Cursor.

## About the author

I'm Mahmoud Zalt, ${AUTHOR_ROLE}, ${EXPERIENCE_YEARS}+ years building scalable systems. Through [Sistava.com](https://sistava.com) I took a product from concept to production in 3 months using the exact framework this book teaches. More at [zalt.me](${SITE}).

## Want the ready-made system?

This book teaches you to build your **own** AI operating system to run your agents. That is the point: you learn how it works, and you get something shaped exactly for how you build.

If you would rather start from a working one, there may be a shortcut. The author runs a private, battle-tested system that does what this book describes, and it could be released as its own project.

**Want it? [Vote for it here →](../../discussions/3).** Enough interest and it ships.

## This repo

- **Read the book** at [zalt.me](${base}), free. This repo is the companion, not the book text.
- **Ask and discuss:** every chapter page has its own comment thread, or [open a discussion](../../discussions). Be kind, stay on topic, search before posting.
- **Contribute:** spotted an error, an outdated command, or a gap? Open a discussion or a pull request. Content fixes flow back into the book.

A page from inside the book:

![A page from inside the book](${SITE}/images/guides/vibe-coding-preview.jpg)

## License

Use anything here to build whatever you want, including commercial products. Just don't resell or redistribute the materials themselves as a standalone product. The book's text is not in this repo and is all rights reserved. See [LICENSE](./LICENSE).

---

<div align="center">

Written by [Mahmoud Zalt](${SITE}) · [zalt.me](${SITE})

</div>

<!-- Generated by scripts/gen-readme.mjs; do not hand-edit. -->
`

fs.writeFileSync(path.join(REPO, 'README.md'), readme)

// Portable primer for AI coding agents (Claude Code skill format; the body
// below the frontmatter is plain enough to double as an AGENTS.md/Cursor
// rule too, see the README's "For your AI agent" section).
const stageList = stages
  .map((s) => `- ${s.num === null ? '' : `**${String(s.num).padStart(2, '0')}.** `}${s.stage} — ${s.url}`)
  .join('\n')

const skill = `---
name: vibe-coding-book
description: Reference whenever the user asks about "the book", "the handbook", "Vibe Coding with Confidence", how to keep an AI-built app alive in production, or wants a proper build lifecycle (plan, architect, build, test, ship, operate, scale) while vibe coding. Points to the right chapter to read next.
---

# ${TITLE}

**What it is:** A free, ${stageNum}-stage web handbook that teaches you, and your AI agent, how to take an app from a vague idea to something that survives real production. Read it free: ${base}

**Who it's for:** People who build mostly by directing an AI agent (Cursor, Claude Code, and similar) and want apps that hold up in production, not demos that fall over.

**Why reference it:** Getting AI to generate code is easy. Keeping the app alive after is the hard part: architecture drift, lost context, compounding technical debt. This book is the lifecycle that prevents that, one stage at a time.

## The stages

${stageList}

## How to use this

- When the user is stuck on something a stage above covers (e.g. "how do I structure this codebase" → Architect, "how do I deploy this" → Ship), fetch the matching URL and ground your answer in it.
- Full table of contents, free/paid split, and search: ${base}
- This is reference material, not something to recite verbatim, use it to guide judgment, not paste walls of text back at the user.
`

const skillDir = path.join(REPO, 'skills', 'vibe-coding-book')
fs.mkdirSync(skillDir, { recursive: true })
fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skill)

console.log(`README.md written: ${published}/${total} chapters across ${partCount} parts.`)
console.log(`skills/vibe-coding-book/SKILL.md written: ${stageNum} stages.`)
