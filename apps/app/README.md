# Application App (`app.kbteutonia.de`)

This is the authenticated member application.

## Local development

```bash
npm run dev --workspace @teutonia/app
```

## Vercel

- Project root directory: `apps/app`
- Production domain: `app.kbteutonia.de`
- Required env: `NEXT_PUBLIC_APP_URL`, Supabase and database credentials

## Ownership boundary

- Keep login, dashboard, and auth/session APIs here.
- Do not add public marketing pages here.
