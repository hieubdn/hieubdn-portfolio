# CLAUDE.md

Guidance document for AI assistants (Cursor, Claude Code, etc.) working inside this repository. The goal is to let an agent grasp the architecture, conventions, and important code areas without having to re-scan the entire codebase.

---

## 1. Project overview

- **Name**: `profile` (monorepo) — the product is the personal portfolio **hieubdn**.
- **Owner**: Bùi Đỗ Ngọc Hiếu — Full-stack Developer (Da Nang, Vietnam).
- **Production URL**: `https://hieubdn.vercel.app`.
- **Purpose**: a portfolio website that presents the owner's professional background, selected projects, a contact page and a form that emails the owner directly.
- **Design philosophy**: minimal UI, dark/light theming, internationalization (7 locales), installable PWA with offline support.

---

## 2. Tech stack

| Layer | Technology |
| --- | --- |
| Monorepo | **Turborepo** + **pnpm workspaces** (`pnpm@9`, Node `>=18`, CI uses Node 22) |
| Web app | **Next.js 16** (App Router, React 19, Webpack), SCSS Modules |
| API app | **NestJS 11** (default scaffold, not wired into production yet) |
| Email | **Resend** (via `apps/web/app/api/contact/route.ts`) |
| PWA | `@ducanh2912/next-pwa` + Workbox, manifest, service worker, offline fallback |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` |
| UI extras | `sonner` (toasts); page/blocks animations are plain CSS |
| Lint/Format | ESLint 9 (flat config) + Prettier 3, shared via `packages/eslint-config` |
| TypeScript | TS `5.9.2`, shared configs in `packages/typescript-config` |
| Testing | **Vitest** in `apps/web` (`lib/**/*.test.ts`), Jest scaffold in `apps/api` |
| i18n | JSON dictionaries in `database/locales` (auto-filled by `scripts/generate-locales.ts`); only `en` is bundled client-side, other locales are lazy-loaded |
| CI | GitHub Actions (`.github/workflows/ci.yml`): install → lint → typecheck → test → build, plus a non-blocking Lighthouse job |
| Deploy | Vercel (web app) |

---

## 3. Top-level directory layout

```
profile/
├── apps/
│   ├── web/                 # Next.js 16 app — the main portfolio site
│   └── api/                 # NestJS 11 app (scaffold, reserved for future use)
├── packages/
│   ├── ui/                  # Shared UI primitives (button, card, code)
│   ├── eslint-config/       # base / next / react-internal ESLint configs
│   └── typescript-config/   # base / nextjs / react-library TS configs
├── database/
│   └── locales/             # Translation JSON for 7 languages (en, vi, ja, zh-CN, zh-TW, ko, de)
├── scripts/
│   └── generate-locales.ts  # Auto-translate script against MyMemory API, seeded from en.json
├── .github/workflows/ci.yml # CI pipeline
├── turbo.json               # Turborepo task graph
├── pnpm-workspace.yaml      # Declares apps/* + packages/*
├── package.json             # Root scripts (dev, build, lint, format, check-types, test)
└── README.md
```

---

## 4. `apps/web` — main application

### 4.1 Routing (App Router)

```
apps/web/app/
├── layout.tsx               # Root layout: metadata, SEO, OG, SpeedInsights, Analytics, reads locale cookie
├── app-shell.tsx            # Shell: Header + MainContent + Footer
├── providers.tsx            # Wraps every context: Theme, Locale, Notification, Toast, PWA prompts
├── template.tsx             # Template wrapper applied to every page
├── page.tsx                 # Home page ("/")
├── loading.tsx              # Full-page loading skeleton
├── error.tsx                # Error boundary
├── globals.scss             # Reset + global CSS variables (single dark theme)
├── about/page.tsx           # "/about"
├── projects/page.tsx        # "/projects"
├── contact/page.tsx         # "/contact"
├── offline/                 # Offline fallback page (PWA): page.tsx + offline-page-client.tsx
└── api/contact/route.ts     # POST endpoint that sends the contact-form email via Resend
```

**Path alias**: `@/*` resolves to `apps/web/*` (see `tsconfig.json`).

**Static routes** are declared in `apps/web/config/path.ts` (`PATH_URL`, `SOCIAL_LINKS`).

### 4.2 Components

```
apps/web/components/
├── layout/
│   ├── header/              # Top header
│   ├── header-nav-drawer/   # Mobile drawer navigation
│   ├── footer/              # Footer
│   ├── main-content/        # Main content wrapper
│   ├── main-screen/         # Screen-state context
│   ├── global-actions/      # Floating/global actions menu
│   ├── notification/        # Notification context + drawer + panel
│   ├── toast/               # App toaster (sonner-based)
│   └── setting/
│       ├── theme/           # Dark/light toggle
│       └── translate/       # Language picker + LocaleProvider + locale-constants
├── pages/
│   ├── home/                # Composable blocks: profile, about, competencies, company,
│   │                        # principles (tech-news preview), selected-work, project,
│   │                        # stats, testimonials, call-to-action, quote, social, atlas, skill
│   ├── about/               # Blocks: image, summary, summary-kicker, section-heading,
│   │                        # education, contact, download-cv; work experience is
│   │                        # data-driven via company-experience/ (component + data config)
│   ├── projects/            # Data-driven: project-card + project-detail + title-block,
│   │                        # content in apps/web/config/projects-data.ts
│   ├── news/                # Tech-news page: news-card, news-section (data from lib/news)
│   └── contact/             # Contact page (form posting to /api/contact)
├── sections/                # Reusable sections: skill
├── pwa/                     # InstallPrompt, OfflineBanner, ServiceWorkerUpdateNotifier, StandaloneViewportLock
└── ui/                      # Shared Skeleton / page-skeleton primitives
```

### 4.3 Hooks & types

- `hooks/use-install-prompt.ts` — captures the `beforeinstallprompt` event for PWA installation.
- `hooks/use-online-status.ts` — tracks online/offline state.
- `types/pdf.d.ts` — typing for `.pdf` imports treated as assets.

### 4.4 Public assets

`apps/web/public/` contains `manifest.json`, `sw.js`, the Workbox service worker, `theme-init.js`, and the PWA icon set under `icons/`.

### 4.5 Next.js configuration (`next.config.js`)

- Enables PWA (`@ducanh2912/next-pwa`) only when `NODE_ENV === "production"`; document fallback is `/offline`.
- Sets a **strict Content-Security-Policy** plus other security headers (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, X-Frame-Options).
- Webpack rule for `.pdf` → `asset/resource` (used by the download-CV button).
- `poweredByHeader: false`, `reactStrictMode: true`, `compress: true`.

### 4.6 `/api/contact` endpoint

- Runtime: `nodejs`. Logic split into `apps/web/lib/contact/` (validation, rate-limit, admin-email template) — the route itself is thin orchestration.
- Validates `name`, `email`, `subject`, `message` with max-length and an email regex (`lib/contact/validation.ts`, unit-tested).
- **Rate limited**: 3 submissions / 10 minutes per IP (in-memory fixed window, per serverless instance). Returns 429 + `Retry-After`.
- **Honeypot**: hidden `company` field in the form; if filled, the server returns a fake `{ ok: true }` and drops the submission.
- Sends **one email to the admin only** (no confirmation email to the submitter — deliberate anti-abuse decision). HTML is escaped before rendering.
- Required env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`; optional: `CONTACT_FROM_EMAIL`, `NEXT_SITE_URL` (icon URLs in the email).

---

## 5. `apps/api` — NestJS app

- Default scaffold from `@nestjs/cli` (controller, service, module).
- Entry: `src/main.ts` — listens on `process.env.PORT ?? 3000`.
- **Not currently used** by the web app (the web app calls its own `/api/contact` Route Handler). Kept as a reserved extension point for future backend work.
- Has its own Jest tests (`test:*`), lint and format scripts.

---

## 6. Shared packages

- **`@repo/ui`** (`packages/ui/src`): exports `button.tsx`, `card.tsx`, `code.tsx`. Imported as `@repo/ui/...` from the apps.
- **`@repo/eslint-config`**: three presets (`base`, `next-js`, `react-internal`).
- **`@repo/typescript-config`**: `base.json`, `nextjs.json`, `react-library.json`.

When adding a new package: place it under `packages/<name>/`, set `"name": "@repo/<name>"` in its `package.json`, then consume it from an app with `"@repo/<name>": "workspace:*"`.

---

## 7. Internationalization (i18n)

- **Source**: `database/locales/en.json` is the canonical dictionary.
- **Supported locales**: `en`, `vi`, `ja`, `zh-CN`, `zh-TW`, `ko`, `de` (see `AppLocaleCode` in `apps/web/components/layout/setting/translate/locale-constants.ts`).
- **Loading strategy**: only `en` (the fallback) is statically bundled into the client. The root layout loads the active locale's dictionary server-side (`apps/web/lib/i18n/load-messages.ts`) and passes it to `LocaleProvider` as `initialMessages`; other locales are dynamically imported when the user switches language. `setLocale` is async — it resolves after the target dictionary is loaded.
- **Persistence**: a `profile-locale` cookie plus `localStorage` under the same key so that SSR and CSR agree on the active locale.
- **Filling missing translations**: `pnpm generate:locales` (the script calls `https://api.mymemory.translated.net/` with the email `hieubdn@gmail.com` for a higher quota, waits 1 s between keys, and only translates missing keys).
- **Provider**: `LocaleProvider` wraps the React tree inside `app/providers.tsx`.

To add a new string: add the key to `en.json` and run `pnpm generate:locales` to sync every other language.

---

## 8. Theming

- The site ships a single dark theme — there is no light/dark toggle. All theme colors are plain CSS custom properties in `app/globals.scss` (`:root`), no `data-theme` attribute or provider involved.

---

## 9. PWA

- Manifest at `/manifest.json`, icons in `public/icons/`.
- The service worker is emitted by `@ducanh2912/next-pwa` at production build time.
- Runtime PWA components live in `components/pwa/`:
  - `InstallPrompt` — shows an “Install” button when the browser fires `beforeinstallprompt`.
  - `OfflineBanner` — banner when the network is unavailable.
  - `ServiceWorkerUpdateNotifier` — notifies the user when a new SW is waiting.
  - `StandaloneViewportLock` — fixes viewport quirks when launched as a standalone PWA.

---

## 10. Core scripts

At the repo root (executed via Turbo):

| Command | What it does |
| --- | --- |
| `pnpm dev` | Runs every app in dev mode in parallel (web: `next dev --port 3000 --webpack`, api: `nest start --watch`). |
| `pnpm build` | Runs the full build pipeline (`turbo run build`). |
| `pnpm lint` | ESLint across all packages with `--max-warnings 0`. |
| `pnpm check-types` | `next typegen && tsc --noEmit` for the web app plus typecheck elsewhere. |
| `pnpm test` | Runs tests: Vitest in `apps/web` (`lib/**/*.test.ts`) + Jest in `apps/api`. |
| `pnpm format` | Prettier write for `**/*.{ts,tsx,md}`. |
| `pnpm generate:locales` | Generates/fills locale files from `en.json`. |

Inside `apps/web` there is also `pnpm lighthouse` (requires `.lighthouserc.json`).

---

## 11. Environment variables

Declared in `turbo.json` (`globalEnv`) — Turbo forwards these to every task:

| Variable | Description |
| --- | --- |
| `NODE_ENV` | `development` / `production`; decides whether PWA is enabled. |
| `NEXT_SITE_URL` | Canonical URL used for OG/metadata; falls back to `VERCEL_URL` or `http://localhost:3000`. |
| `VERCEL_URL` | Supplied automatically by Vercel for preview/production deployments. |
| `RESEND_API_KEY` | Resend API key used by `/api/contact`. **Required** to send mail. |
| `CONTACT_TO_EMAIL` | Recipient mailbox. **Required**. |
| `CONTACT_FROM_EMAIL` | Sender mailbox (defaults to `onboarding@resend.dev`). |

`.env*` files are in `.gitignore`. For local dev, create `apps/web/.env.local` with the three Resend variables.

---

## 12. Coding conventions

- **Language**: strict TypeScript; React Server Components by default — mark components with `"use client"` only when they use state/context.
- **Styling**: SCSS Modules (`*.module.scss`) colocated with the component; avoid globals outside `globals.scss`.
- **Aliases**: `@/` for internal imports inside `apps/web`; `@repo/<pkg>` for internal packages.
- **Lint**: `--max-warnings 0` — no warnings may be committed.
- **Prettier**: default `prettier@3` config.
- **Commits**: no strict convention yet, but keep messages short and action-first (e.g. `feat: add contact form validation`).
- **Pull requests**: CI must be green (lint + typecheck + test + build) before merging.

---

## 13. Typical dev workflow

1. `pnpm install` (at the repo root).
2. Create `apps/web/.env.local` with the Resend variables.
3. `pnpm dev`, then open `http://localhost:3000`.
4. When editing i18n: update `database/locales/en.json` → `pnpm generate:locales`.
5. Before pushing: `pnpm lint && pnpm check-types && pnpm build` (or let CI handle it).

---

## 14. Notes for AI agents

- **Do not run** `pnpm install` unless the user asks — `node_modules` is already present.
- **Do not create** new files when editing an existing one is enough; prefer placing new components next to where they are used rather than inventing new top-level folders.
- When touching layout/locale: remember that `app/layout.tsx` is a Server Component and reads the `profile-locale` cookie, so avoid reintroducing FOUC. There is no dark/light toggle anymore — don't reintroduce a `data-theme` attribute or a theme provider.
- When changing `/api/contact`: preserve the `{ ok: boolean, error?: string }` response contract so the client form stays untouched.
- When adding a new env var: also add it to `turbo.json > globalEnv` so the build cache stays consistent across environments.
- When adding a new route: register it in `apps/web/config/path.ts` so the header/footer/nav can pick it up.
- When adding UI shared across apps: put it in `packages/ui/src/` and export it from that package's `package.json`.
- Never hard-code user-facing strings — add the key to `en.json` and consume it through `LocaleProvider`.
