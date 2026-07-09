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

// Build the table of contents, one link per part (not per chapter), so
// adding/renaming/reordering chapters inside a part never requires a re-run.
// ponytail: part-level links + blurb from meta.json, no per-chapter listing to maintain.
const toc = []
for (const part of book.parts) {
  const p = meta.parts[part.id]
  const chapters = book.chapters.filter((c) => c.part === part.id && !c.hidden)
  if (!chapters.length) continue

  const heading = p.stage === p.title ? p.stage : `${p.stage}: ${p.title}`
  const url = `${base}/${part.id}`
  toc.push(`- [${heading}](${url}) - ${p.blurb}`)
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

**A free, end-to-end guide to vibe coding production-grade software with AI**, from a plain idea to live, monitored, scaling software, built with agents like Cursor and Claude Code. No signup, no paywall to start reading.

[**Read it free online →**](${base})

[![Free to read](${badge('read', 'free', '16a34a')})](${base})
[![Web book](${badge('format', 'web book', '111')})](${base})
[![Chapters](${badge('chapters', `${total}`, '2563eb')})](${base})
[![Discussions](https://img.shields.io/github/discussions/${REPO_SLUG}?color=6d28d9&label=discussions)](../../discussions)

</div>

---

This is the **community and companion repository** for the book, not the book text itself. It exists for two things:

1. **Discussions and Q&A** on the book and on every chapter. Ask questions, share what you built, and correct or extend a chapter, right where you read it.
2. **Companion materials you can install and use**: an AI OS, agents, boilerplates, Claude Code skills, and worked examples. See [Coming soon](#coming-soon).

## Who it's for

People who build software mostly by directing an AI agent (Cursor, Claude Code, and friends) and want to ship apps that are actually reliable, secure, and maintainable, not just demos that fall over in production. No CS degree assumed. If you can describe what you want and read what the agent gives back, this is for you.

## Why it exists

AI can write the code. It cannot yet decide what to build, how to structure it, when it is wrong, or what "production-grade" means. This book teaches the professional lifecycle around the code, from a plain idea to live, monitored, scaling software, at a level a non-pro can follow. Full reasoning lives in the book itself.

## Table of contents

The complete arc, from a plain idea to live, scaling software:

${toc.join('\n')}

## Coming soon

Companion materials you'll be able to install and use, landing here as their chapters go live:

- **AI OS**: a ready-to-run operating system for your agents, the control center, departments, scheduling, and reports the book builds.
- **Agents**: preconfigured Claude Code agents you drop in and run.
- **Boilerplates and starters**: production-shaped project scaffolds with the modular structure and agent house-rules already wired.
- **Claude Code skills**: reusable agent workflows the book teaches, drop into \`.claude/skills/\` and go.
- **Examples**: worked, runnable code and artifacts from the chapters.

Nothing shipped yet, this is where it will land. Watch or star the repo to catch it.

## Discussions and comments

Every chapter page has its own comment thread. Comment right from the page, or [open a discussion here](../../discussions). Be kind, stay on topic, and search before posting.

## Contributing

Spotted an error, an outdated command, or a gap? Open a discussion or a pull request. Content fixes flow back into the book; skills, starters, and examples live and evolve here.

## License

Use the materials here to build anything you want, including commercial products. Just don't resell or redistribute the materials themselves as a standalone product. The book's text is not in this repo and is all rights reserved. See [LICENSE](./LICENSE).

---

<div align="center">

Written by [Mahmoud Zalt](${SITE}) · [zalt.me](${SITE})

</div>

<!-- TOC generated by scripts/gen-readme.mjs; do not hand-edit it. -->
`

fs.writeFileSync(path.join(REPO, 'README.md'), readme)
console.log(`README.md written: ${published}/${total} chapters across ${partCount} parts.`)
