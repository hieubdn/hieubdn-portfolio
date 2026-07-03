# web — hieubdn portfolio (Next.js 16)

The main portfolio site. Part of the `profile` Turborepo monorepo — see the root
[CLAUDE.md](../../CLAUDE.md) for full architecture docs.

## Getting Started

From the repo root:

```bash
pnpm install
pnpm dev        # runs every app; web serves http://localhost:3000
```

Or inside this directory: `pnpm dev`.

For the contact form to send email locally, create `apps/web/.env.local`:

```
NEXT_SITE_URL=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

## Notes

- Styling: SCSS Modules colocated with each component; system font stack (Verdana) — no web fonts are loaded.
- i18n: dictionaries live in `database/locales/`; only `en` ships in the client bundle, the active locale is inlined server-side and other locales load on demand.
- Tests: `pnpm test` (Vitest, `lib/**/*.test.ts`).
- Lighthouse: `pnpm lighthouse` (config in `.lighthouserc.json`; also runs as a non-blocking CI job).

## Deploy

Deployed on [Vercel](https://vercel.com); PWA (service worker + offline fallback) is enabled in production builds only.
