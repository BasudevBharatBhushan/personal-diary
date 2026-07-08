# B3 OS 🌈

A calm, colorful, playful **personal operating system** — a private dashboard that greets you, tells you the time, shows what you should be doing right now, and quietly removes unnecessary decisions from your day.

It is not a productivity app. It should feel like opening your own room: like Google Keep meets a Nintendo children's planner. 🎈

> _"I don't need more motivation. I need fewer decisions."_

## ✨ Features

- **Live Header** — date, time (Asia/Kolkata), current phase, next activity, and a friendly per-phase message, auto-updating every minute.
- **Dashboard** — a live status card + full-day timeline with the current block highlighted.
- **Decision Panel** — decide today's dinner + two productive hours once. Autosaves.
- **Tomorrow Card** — set up tomorrow's dinner, focus, one important thing, and mood. Autosaves.
- **Random Thoughts** — quick plain-text notes, newest first. Autosaves.
- **Food System** — weekly dinner rotation (today highlighted), emergency dinners, the "never skip dinner" rule, and a grocery list.
- **Sunday Reset** — a weekly checklist with progress + reset.
- **Rules & Philosophy** — the five rules and the guiding quote.

Every page has its own accent color, rounded cards, friendly fonts, and lots of whitespace.

## 🧱 Tech stack

- **Next.js** (App Router) + **React 19** + **TypeScript** (strict)
- **TailwindCSS v4**
- **pnpm** workspaces (monorepo)
- **LocalStorage** for all persistence — **no backend, no auth, fully offline**

## 📁 Structure

```
b3-os/                     (monorepo root — pnpm workspaces)
├── packages/
│   └── core/              @b3os/core — framework-agnostic shared code
│       └── src/
│           ├── types.ts       domain types (Phase, TimelineBlock, Note, …)
│           ├── schedule.ts     SCHEDULE — the day's timeline blocks
│           ├── messages.ts     PHASE_MESSAGES — per-phase copy
│           ├── time.ts         time engine (getCurrentBlock / getNextBlock, Asia/Kolkata)
│           ├── food.ts         dinner rotation, emergency dinners, grocery list
│           ├── rules.ts / philosophy.ts / sundayReset.ts
│           └── storageKeys.ts  LocalStorage keys
│
└── apps/
    └── web/              @b3os/web — the Next.js app
        └── src/
            ├── app/           routes (/, /decisions, /tomorrow, /thoughts,
            │                          /food, /sunday, /rules, /philosophy)
            ├── components/     Sidebar, Header, ui/ primitives, per-feature folders
            ├── hooks/          useNow, useLocalStorage
            └── lib/            accents, nav, cn
```

## 🚀 Getting started

**Prerequisites:** Node.js ≥ 22 and pnpm (enable once with `corepack enable pnpm`).

```bash
# 1. Install dependencies
pnpm install

# 2. Start the dev server → http://localhost:3000
pnpm dev
```

## 🛠️ Commands

Run from the repo root:

| Command          | What it does                                      |
| ---------------- | ------------------------------------------------- |
| `pnpm dev`       | Start the Next.js dev server (http://localhost:3000) |
| `pnpm build`     | Production build (static export of all routes)    |
| `pnpm typecheck` | Type-check the app with `tsc --noEmit`            |

To preview the production build locally:

```bash
pnpm build
pnpm --filter @b3os/web start
```

## 🎨 Design principles

Calm, colorful, playful, friendly. Palette: sky blue, green, orange, yellow, pink, purple. Rounded cards, friendly fonts (Baloo 2 + Nunito), cute emojis, generous whitespace, simple transitions only.

**Avoid:** black minimalism, monochrome, glassmorphism, neon, futuristic UI, corporate dashboards.

## 🔒 Scope

All data lives in your browser's LocalStorage. No login, no backend, no cloud sync, no notifications, no analytics. This app is for personal use only.
