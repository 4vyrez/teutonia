# Teutonia Monorepo (Two Vercel Apps)

This repository now contains two independent Next.js apps deployed from one codebase:

- `apps/marketing` -> `kbteutonia.de`
- `apps/app` -> `app.kbteutonia.de`
- `packages/shared` -> shared UI/util modules consumed by both apps

## Run locally

Install dependencies from the repo root:

```bash
npm install
```

Run each app independently:

```bash
npm run dev:marketing
npm run dev:app
```

Build each app independently:

```bash
npm run build:marketing
npm run build:app
```

## Structure and boundaries

- `apps/marketing`: public pages, public content, no auth/session APIs
- `apps/app`: login/dashboard/member APIs and authenticated flows
- `packages/shared`: reusable primitives and utilities

When adding code:

- Put domain-specific code in the matching app folder.
- Put truly reusable code in `packages/shared`.
- Avoid cross-importing app internals between `apps/marketing` and `apps/app`.

## Vercel setup

Create two Vercel projects pointed at this same Git repository:

1. Marketing project
   - Root Directory: `apps/marketing`
   - Domain: `kbteutonia.de`
   - Env: `NEXT_PUBLIC_SITE_URL=https://kbteutonia.de`
2. App project
   - Root Directory: `apps/app`
   - Domain: `app.kbteutonia.de`
   - Env: `NEXT_PUBLIC_APP_URL=https://app.kbteutonia.de` plus Supabase/DB secrets
