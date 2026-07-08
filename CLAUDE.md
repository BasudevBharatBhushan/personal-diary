# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

**B3 OS** — a personal, offline, single-user dashboard. It is deliberately **not** a productivity app: it should feel calm, colorful, and playful (Google Keep / Nintendo / children's-planner energy). The full product spec lives in [scope.md](scope.md) and is the source of truth for content, structure, and design philosophy.

## Tech stack

- **Next.js** (App Router) + **React 19** + **TypeScript** (strict, `tsc --noEmit` must stay clean)
- **TailwindCSS v4** (config via `@theme` in `globals.css`, not a JS config file)
- **pnpm** workspaces monorepo
- **LocalStorage** only — **no backend, no auth, no network, fully offline.** Do not add any of these; they are explicitly out of scope.

## Commands (run from repo root)

```bash
pnpm install                    # install deps
pnpm dev                        # dev server → http://localhost:3000
pnpm build                      # production build (verifies all routes render)
pnpm typecheck                  # tsc --noEmit
pnpm --filter @b3os/web start   # serve the production build
```

Node ≥ 22 required. If pnpm is missing: `corepack enable pnpm`.

## Layout

- `packages/core` (`@b3os/core`) — **framework-agnostic** shared code: domain types, all static data (schedule, phase messages, food, rules, philosophy), the time engine, and LocalStorage keys. No React, no DOM. Consumed as raw TypeScript via `transpilePackages: ['@b3os/core']` in `next.config.ts` — **no build step**, edits are live.
- `apps/web` (`@b3os/web`) — the Next.js app.
  - `src/app/` — one folder per route: `/`, `/decisions`, `/tomorrow`, `/thoughts`, `/food`, `/sunday`, `/rules`, `/philosophy`.
  - `src/components/ui/` — shared primitives (`Card`, `PageShell`, `PageHeader`, `Button`, `TextInput`, `TextArea`, `Checkbox`, `EmptyState`).
  - `src/components/<feature>/` — components owned by a single page.
  - `src/components/Sidebar.tsx`, `Header.tsx` — the app shell.
  - `src/hooks/` — `useNow`, `useLocalStorage`.
  - `src/lib/` — `accents.ts`, `nav.ts`, `cn.ts`.

## Conventions

- **Import alias:** `@/*` → `apps/web/src/*`. Shared domain code imports from `@b3os/core`.
- **`"use client"`** at the top of any component using hooks, state, intervals, `localStorage`, or `usePathname`.
- **Reuse the `ui/` primitives** — don't roll your own container/button/input. Don't restyle primitives from a feature page.
- **Accents:** every page has one accent (`Accent = 'sky'|'green'|'orange'|'yellow'|'pink'|'purple'`). Use `getAccentClasses`/`ACCENT_CLASSES` from `@/lib/accents` — never hardcode raw Tailwind color classes in feature code. Page accents: Dashboard=sky, Decisions=orange, Tomorrow=purple, Thoughts=yellow, Food=green, Sunday=pink, Rules=sky, Philosophy=purple.
- **Persistence:** go through `useLocalStorage(STORAGE_KEYS.xxx, initial)` (SSR-safe, autosaves). Keys come from `STORAGE_KEYS` in `@b3os/core`: `decisionPanel`, `tomorrowCard`, `notes`, `sundayReset`.
- **Time/hydration:** `useNow()` returns `null` until mounted — always guard for `null` before rendering time-derived UI to avoid hydration mismatches (see `Header.tsx`). All time logic uses **Asia/Kolkata** via `Intl` (never hardcode a `+5:30` offset); the time engine lives in `@b3os/core/time.ts`.
- **Mobile-first:** desktop gets a left sidebar; mobile gets a bottom nav. `PageShell` already provides padding + bottom-nav clearance + max width — wrap page bodies in it. Never introduce horizontal scroll.

## Design guardrails (from scope.md)

- Palette: sky blue, green, orange, yellow, pink, purple. Rounded cards (`rounded-2xl`/`rounded-3xl`), lots of whitespace, cute emojis, friendly fonts (Baloo 2 headings, Nunito body).
- **Avoid:** black minimalism, monochrome, glassmorphism, neon, futuristic UI, corporate dashboards, fancy animations (simple transitions only).

## Before finishing a change

Run `pnpm typecheck` and `pnpm build` — both must pass clean. A green `next build` means every route rendered without runtime errors.
