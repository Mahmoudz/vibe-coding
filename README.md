<div align="center">

<img src="https://zalt.me/images/books/vibe-coding-cover.png" alt="Vibe Coding with Confidence" width="280" />

# Vibe Coding with Confidence

### The Vibecoder's Handbook, from idea to production

Build Apps That Work Beyond the Demo.

**A free, end-to-end guide to building production-grade software with AI**, from a plain idea to live, scaling software, using agents like Cursor and Claude Code. No signup, no paywall to start.

[**Read it free online →**](https://zalt.me/guides/vibe-coding)

[![Free to read](https://img.shields.io/badge/read-free-16a34a)](https://zalt.me/guides/vibe-coding)
[![Web book](https://img.shields.io/badge/format-web%20book-111)](https://zalt.me/guides/vibe-coding)
[![Chapters](https://img.shields.io/badge/chapters-134-2563eb)](https://zalt.me/guides/vibe-coding)
[![Discussions](https://img.shields.io/github/discussions/Mahmoudz/vibe-coding?color=6d28d9&label=discussions)](../../discussions)

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

| # | Stage | What you walk away with |
|:---:|:---|:---|
|  | [**Introduction**](https://zalt.me/guides/vibe-coding/intro) | What this book is, how to read it, and who wrote it, the on-ramp before chapter one. |
| **01** | [**Plan**](https://zalt.me/guides/vibe-coding/plan) | Turn a vague idea into a clear, buildable spec before your AI agent writes a single line. |
| **02** | [**Set Up**](https://zalt.me/guides/vibe-coding/setup) | Set up your machine, your stack, and your AI agent so you're building, not fighting tools. |
| **03** | [**Automate**](https://zalt.me/guides/vibe-coding/ai-os) | Give your agents a real operating system: memory, tools, scheduling, and guardrails, not one-off chats. |
| **04** | [**Read**](https://zalt.me/guides/vibe-coding/read) | Optional. Learn to look at the code your agent writes, recognize what the files and pieces are, and judge whether it is any good. Skip it if you just want to ship. |
| **05** | [**Architect**](https://zalt.me/guides/vibe-coding/architect) | Lay out a modular codebase your AI agent can actually navigate, extend, and not wreck. |
| **06** | [**Build**](https://zalt.me/guides/vibe-coding/build) | Direct your agent through small, reviewable slices instead of one giant, unreviewable generation. |
| **07** | [**Debug**](https://zalt.me/guides/vibe-coding/debug) | Read stack traces, break agent loops, bisect regressions, and roll back safely when it breaks. |
| **08** | [**Test**](https://zalt.me/guides/vibe-coding/test) | Lock the app behind tests so you can change it fast without breaking what worked. |
| **09** | [**Harden**](https://zalt.me/guides/vibe-coding/harden) | Round out the real product: interface, accounts, data changes, reliability, and clean code. |
| **10** | [**Secure**](https://zalt.me/guides/vibe-coding/secure) | Learn what to protect and how to make your AI lock it down. No security degree required. |
| **11** | [**Protect**](https://zalt.me/guides/vibe-coding/protect) | The moment you have real users, their data is your responsibility. Do it right. |
| **12** | [**Ship**](https://zalt.me/guides/vibe-coding/ship) | Deploy to real infrastructure with environments, CI/CD, and releases you can roll back. |
| **13** | [**Operate**](https://zalt.me/guides/vibe-coding/operate) | Keep it alive: logging, observability, alerting, backups, and incident response. |
| **14** | [**Scale**](https://zalt.me/guides/vibe-coding/scale) | Grow it to handle real traffic and data without blowing the budget or the database. |

Notice the shape:

- The **first half** teaches you to build software like a senior engineer.
- The **second half** teaches you how software stays alive without needing you.

Only once that lifecycle exists can you hand it over piece by piece. As the system earns your trust, you give it more responsibility, until it can safely build, deploy, and maintain your app with minimal supervision. You never fully disappear from the loop, you just stop being responsible for every step inside it.

## Want the ready-made system?

This book teaches you to build your **own** AI operating system to run your agents. That is the point: you learn how it works, and you get something shaped exactly for how you build.

If you would rather start from a working one, there may be a shortcut. The author runs a private, battle-tested system that does what this book describes, and it could be released as its own project.

**Want it? [Vote for it here →](../../discussions/3).** Enough interest and it ships.

## This repo

- **Read the book** at [zalt.me](https://zalt.me/guides/vibe-coding), free. This repo is the companion, not the book text.
- **Ask and discuss:** every chapter page has its own comment thread, or [open a discussion](../../discussions). Be kind, stay on topic, search before posting.
- **Contribute:** spotted an error, an outdated command, or a gap? Open a discussion or a pull request. Content fixes flow back into the book.

## License

Use anything here to build whatever you want, including commercial products. Just don't resell or redistribute the materials themselves as a standalone product. The book's text is not in this repo and is all rights reserved. See [LICENSE](./LICENSE).

---

<div align="center">

Written by [Mahmoud Zalt](https://zalt.me) · [zalt.me](https://zalt.me)

</div>

<!-- Generated by scripts/gen-readme.mjs; do not hand-edit. -->
