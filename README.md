<div align="center">

<img src="https://zalt.me/images/books/vibe-coding-cover.png" alt="Vibe Coding with Confidence" width="280" />

# Vibe Coding with Confidence

### The Vibecoder's Handbook, from idea to production

**A free web book** on building production-grade software with AI, from a plain idea to live, scaling software, using agents like Cursor and Claude Code. No signup, no paywall to start.

Build Reliable Apps That Survive Production.

[![Free to read](https://img.shields.io/badge/read-free-16a34a)](https://zalt.me/guides/vibe-coding) [![Web book](https://img.shields.io/badge/format-web%20book-111)](https://zalt.me/guides/vibe-coding) [![Chapters](https://img.shields.io/badge/chapters-15-2563eb)](https://zalt.me/guides/vibe-coding) [![Pages](https://img.shields.io/badge/pages-140-16a34a)](https://zalt.me/guides/vibe-coding) [![Prompts](https://img.shields.io/badge/prompts-100%2B-f59e0b)](https://zalt.me/guides/vibe-coding) [![Discussions](https://img.shields.io/github/discussions/Mahmoudz/vibe-coding?color=6d28d9&label=discussions)](../../discussions)

### [Read it free online →](https://zalt.me/guides/vibe-coding)

⭐ **This book has no publisher and no marketing budget. A star is how other developers find it.**

</div>

---

## What this is

The companion repo for the free web book above, not a codebase to clone and run. It holds an AI agent skill and this discussion board, nothing you deploy.

- **Read the book:** https://zalt.me/guides/vibe-coding. Its first chapter gives you a prompt to paste into your AI agent that sets up your whole project, you do nothing by hand.
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

| # | Stage | What you walk away with |
|:---:|:---|:---|
|  | [**Introduction**](https://zalt.me/guides/vibe-coding/intro) | What this book is, how to read it, and who wrote it, the on-ramp before chapter one. |
| **01** | [**Set Up**](https://zalt.me/guides/vibe-coding/setup) | Set up your machine, your agent, and your stack, then get a real app booting and safely saved before you plan a single feature. |
| **02** | [**Plan**](https://zalt.me/guides/vibe-coding/plan) | Turn a vague idea into a clear, buildable spec before your AI agent writes a single line. |
| **03** | [**Architect**](https://zalt.me/guides/vibe-coding/architect) | Lay out a modular codebase your AI agent can actually navigate, extend, and not wreck. |
| **04** | [**Build**](https://zalt.me/guides/vibe-coding/build) | Direct your agent through small, reviewable slices instead of one giant, unreviewable generation. |
| **05** | [**Inspect**](https://zalt.me/guides/vibe-coding/read) | Optional. Learn to look at the code your agent writes, recognize what the files and pieces are, and judge whether it is any good. Skip it if you just want to ship. |
| **06** | [**Amplify**](https://zalt.me/guides/vibe-coding/amplify) | Give your product a brain: model calls, grounding it in your own data, in-app agents, workflows, and making AI reliable. |
| **07** | [**Debug**](https://zalt.me/guides/vibe-coding/debug) | Read stack traces, break agent loops, bisect regressions, and roll back safely when it breaks. |
| **08** | [**Test**](https://zalt.me/guides/vibe-coding/test) | Lock the app behind tests so you can change it fast without breaking what worked. |
| **09** | [**Automate**](https://zalt.me/guides/vibe-coding/ai-os) | Give your agents a real operating system: memory, tools, scheduling, and guardrails, not one-off chats. |
| **10** | [**Harden**](https://zalt.me/guides/vibe-coding/harden) | Round out the real product: interface, accounts, data changes, reliability, and clean code. |
| **11** | [**Secure**](https://zalt.me/guides/vibe-coding/secure) | Learn what to protect and how to make your AI lock it down. No security degree required. |
| **12** | [**Protect**](https://zalt.me/guides/vibe-coding/protect) | The moment you have real users, their data is your responsibility. Do it right. |
| **13** | [**Ship**](https://zalt.me/guides/vibe-coding/ship) | Deploy to real infrastructure with environments, CI/CD, and releases you can roll back. |
| **14** | [**Operate**](https://zalt.me/guides/vibe-coding/operate) | Keep it alive: logging, observability, alerting, backups, and incident response. |
| **15** | [**Scale**](https://zalt.me/guides/vibe-coding/scale) | Grow it to handle real traffic and data without blowing the budget or the database. |

Notice the shape:

- The **first half** teaches you to build software like a senior engineer.
- The **second half** teaches you how software stays alive without needing you.
- Every stage ships with copy-paste-ready prompts, **100+** across the book, so you are never staring at a blank cursor.

Only once that lifecycle exists can you hand it over piece by piece. As the system earns your trust, you give it more responsibility, until it can safely build, deploy, and maintain your app with minimal supervision.

## For your AI agent

Give your own coding agent (Claude Code, Codex, Cursor, or anything that reads `AGENTS.md`) a one-page primer on this book: what it is, who it's for, and a link for every stage, so it can point you to the right chapter instead of guessing.

- **Claude Code:** `curl -o .claude/skills/vibe-coding-book/SKILL.md https://raw.githubusercontent.com/Mahmoudz/vibe-coding/main/skills/vibe-coding-book/SKILL.md` *(or just copy [skills/vibe-coding-book/SKILL.md](./skills/vibe-coding-book/SKILL.md))*
- **Codex, Cursor, or anything else:** copy the body of [skills/vibe-coding-book/SKILL.md](./skills/vibe-coding-book/SKILL.md) (everything below the frontmatter) into your project's `AGENTS.md`, or into `.cursor/rules/vibe-coding-book.mdc` for Cursor.

## About the author

I'm Mahmoud Zalt, Principal AI Architect, 16+ years building scalable systems. Through [Sistava.com](https://sistava.com) I took a product from concept to production in 3 months using the exact framework this book teaches. More at [zalt.me](https://zalt.me).

## Want the ready-made system?

This book teaches you to build your **own** AI operating system to run your agents. That is the point: you learn how it works, and you get something shaped exactly for how you build.

If you would rather start from a working one, there may be a shortcut. The author runs a private, battle-tested system that does what this book describes, and it could be released as its own project.

**Want it? [Vote for it here →](../../discussions/3).** Enough interest and it ships.

## This repo

- **Read the book** at [zalt.me](https://zalt.me/guides/vibe-coding), free. This repo is the companion, not the book text.
- **Ask and discuss:** every chapter page has its own comment thread, or [open a discussion](../../discussions). Be kind, stay on topic, search before posting.
- **Contribute:** spotted an error, an outdated command, or a gap? Open a discussion or a pull request. Content fixes flow back into the book.

A page from inside the book:

![A page from inside the book](https://zalt.me/images/guides/vibe-coding-preview.jpg)

## License

Use anything here to build whatever you want, including commercial products. Just don't resell or redistribute the materials themselves as a standalone product. The book's text is not in this repo and is all rights reserved. See [LICENSE](./LICENSE).

---

<div align="center">

Written by [Mahmoud Zalt](https://zalt.me) · [zalt.me](https://zalt.me)

</div>

<!-- Generated by scripts/gen-readme.mjs; do not hand-edit. -->
