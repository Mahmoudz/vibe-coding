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
    // Per-chapter rows, so the agent skill can point at a page rather than a
    // whole stage. Title comes from meta so a retitle flows through here too.
    chapters: chapters.map((c) => {
      const m = meta.chapters[c.slug] || {}
      return {
        slug: c.slug,
        title: m.label ? `${m.label}: ${m.title}` : m.title || c.slug,
        access: c.access,
        url: `${base}/${part.id}/${c.slug}`,
      }
    }),
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

⭐ **This book has no publisher and no marketing budget. A star is how other developers find it.**

</div>

---

## What this is

The companion repo for the free web book above, not a codebase to clone and run. It holds an AI agent skill and this discussion board, nothing you deploy.

- **Read the book:** ${base}. Its first chapter gives you a prompt to paste into your AI agent that sets up your whole project, you do nothing by hand.
- **Install the skill:** copy [skills/vibe-coding-book](./skills/vibe-coding-book) into your own AI agent (see "For your AI agent" below) so it knows the book and can point you to the right chapter mid-build.
- One skill today, more materials land here over time.

## Why this exists

Getting AI to write code is easy. Keeping the app alive after is the hard part: the agent forgets what it built last week, context drifts mid-session, it loops on the same bug, or it ships code that works but isn't safe. None of that is an AI problem, it's **software engineering at ten times the speed, with nobody enforcing the discipline that used to come from typing every line yourself.**

A prompt only tells the AI what to do next. It doesn't give it memory, architecture, tests, deployment, or a line between what it can decide alone and what needs you. I spent over a decade writing software by hand, then the last few years building almost everything with AI, and after the first few large AI-built projects broke in the same predictable ways, I wrote down what worked. **That became the 15 stages in this book, the same order I now run on every build.**

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

// Chapter-level index. A stage list only lets the agent say "read Architect";
// this lets it say "read this page", which is what the reader actually needs.
const chapterIndex = stages
  .map((s) => {
    const rows = s.chapters
      .map((c) => `  - ${c.title} — ${c.url}${c.access === 'paid' ? ' *(premium)*' : ''}`)
      .join('\n')
    return `- **${s.stage}**\n${rows}`
  })
  .join('\n')

const skill = `---
name: vibe-coding-book
description: Use whenever the user is building an app by directing an AI agent and wants it to survive production, or mentions "the book", "the handbook", "Vibe Coding with Confidence", or asks where to start, what to do next, how to structure, test, ship, secure, or operate what they are building. Also use when they paste a prompt from the handbook, so you know what stage they are at and what they already have.
---

# ${TITLE}

A free, ${stageNum}-stage handbook that takes someone from an empty laptop to software running in production, with an AI agent doing the building. Read it free: ${base}

**The reader you are helping is usually on their first day of becoming technical.** A fresh graduate or a career changer, not a hobbyist. They intend to build something that could sustain them financially. They direct you; they do not type the code. Treat them as a capable junior on day one: never talk down, never assume jargon.

## How the book works, which changes how you should behave

The reader works through it **in order**, and every chapter ends with a copy-paste prompt they hand to you. Those prompts are the spine of the whole thing, so:

- **Each prompt ends with a link to the chapter it came from.** When one arrives and you need the reasoning behind it, fetch that URL. Do not guess at the intent.
- **The project accumulates artifacts.** By design, the reader builds up a rules file, a README, a spec, conventions, an architecture map, a decision log, a changelog, a test suite, and later an operating base. Prompts tell you to read them before deciding. Actually read them.
- **Never contradict what is already recorded.** If the right answer conflicts with a decision in their rules file or decision log, say so and why. Do not diverge quietly.
- **Write decisions back.** A real choice goes in the decision log, a new standing convention goes in the rules file, a notable change goes in the changelog. Do not invent new files for this.
- **Correct the same thing twice and it becomes a skill.** That is a standing rule the book installs. Honour it: write the lesson into the skill that covers it, or start one.

## What the reader has at each point

Do not reach for something they do not have yet. Roughly:

- **Set Up:** an agent, a project folder, a README, a rules file, a stack, a database choice, a running app, git, a remote, secrets in a \`.env\`.
- **Plan:** user stories, an MVP scope, a component map, a data model, non-functional targets, screens, a written spec.
- **Architect:** module boundaries, a folder layout, an API contract, conventions, an architecture map, project docs.
- **Build onward:** features, tests, then the operating base, then hardening, security, deployment, monitoring, scale.

If they ask for something from a later stage, it is fine to help, but tell them which stage owns it so the order does not collapse.

## Where everything is

${chapterIndex}

## Using this well

- Point at the ONE page that answers their question, and fetch it before answering from memory.
- Full table of contents and search: ${base}
- This is reference material. Ground your judgment in it; do not paste walls of it back at them.
`

const skillDir = path.join(REPO, 'skills', 'vibe-coding-book')
fs.mkdirSync(skillDir, { recursive: true })
fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skill)

console.log(`README.md written: ${published}/${total} chapters across ${partCount} parts.`)
console.log(`skills/vibe-coding-book/SKILL.md written: ${stageNum} stages.`)
