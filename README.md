# Better Auth

Next.js app for authentication, account settings, and admin user management. Auth is [Better Auth](https://www.better-auth.com/) with email and password, stored in PostgreSQL through Drizzle.

## Stack

| Layer                             | Choice                                           |
| --------------------------------- | ------------------------------------------------ |
| Framework                         | Next.js 16 (App Router)                          |
| UI                                | React 19, HeroUI, Tailwind CSS 4                 |
| Auth                              | Better Auth (email/password, 2FA, admin plugin)  |
| DB                                | PostgreSQL + Drizzle ORM                         |
| i18n                              | next-intl (default locale: `en`)                 |
| Forms / validation                | react-hook-form, Zod                             |
| Data fetching                     | TanStack Query                                   |
| Email                             | Nodemailer + React Email (optional QStash queue) |
| Rate limit                        | optional Upstash Redis                           |
| ESLint, Stylelint, Prettier, Knip |

## Requirements

- Node.js 24.13.0
- npm 11.6.2
- PostgreSQL

## Install

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` (see [Environment](#environment)), then apply migrations and start the app:

```bash
npm run drizzle:migrate
npm run dev
```

App: [http://localhost:3000](http://localhost:3000)

## Scripts

| Script                     | Description                               |
| -------------------------- | ----------------------------------------- |
| `npm run dev`              | Next.js dev server                        |
| `npm run build`            | Lint → Drizzle migrate → production build |
| `npm run start`            | Serve production build                    |
| `npm run lint`             | Messages + ESLint + Stylelint             |
| `npm run format`           | ESLint `--fix` + Prettier                 |
| `npm run check-types`      | TypeScript `tsc --noEmit`                 |
| `npm run drizzle:generate` | Generate migrations from schema           |
| `npm run drizzle:migrate`  | Apply migrations                          |
| `npm test`                 | Vitest                                    |
| `npm run test:coverage`    | Vitest with coverage                      |
| `npm run email:dev`        | React Email preview on port 3001          |
| `npm run knip`             | Unused exports / deps                     |

## Environment

Copy from `.env.example`. Required unless noted.

| Variable                                                  | Role                                                    |
| --------------------------------------------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_DOMAIN`                                      | Public site host (e.g. `mydomain.com`)                  |
| `NEXT_PUBLIC_PROTOCOL`                                    | `http` or `https`                                       |
| `NEXT_PUBLIC_SEARCHABLE`                                  | SEO indexing flag (`true` / `false`)                    |
| `BETTER_AUTH_URL`                                         | Auth base URL (e.g. `http://localhost:3000`)            |
| `BETTER_AUTH_SECRET`                                      | Session / token secret                                  |
| `DATABASE_URL`                                            | PostgreSQL connection string                            |
| `USE_SMTP`                                                | `true` to send via SMTP; `false` logs / skips real send |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` | SMTP credentials (when `USE_SMTP=true`)                 |
| `EMAIL_FROM`                                              | From address for outbound mail                          |
| `DEBUG`                                                   | debug namespaces (e.g. `send_email`, `env`)             |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`     | Optional — empty disables Upstash rate limiting         |
| `QSTASH_URL` / `QSTASH_TOKEN` / `QSTASH_*_SIGNING_KEY`    | Optional — empty sends email synchronously              |

## Structure

```
src/
  app/           # App Router: [locale] pages + API routes
  db/            # Drizzle schema & client
  env/           # Env getters / require* helpers
  features/      # Domain actions & forms (account, admin, auth)
  i18n/          # next-intl routing, messages
  layout/        # App / auth chrome, nav, providers
  shared/        # config, UI kit, auth/email/upstash libs
  views/         # Page-level compositions
drizzle/         # SQL migrations
```

Feature → view → route: UI lives in `views/`, behavior in `features/`, pages wire them under `app/[locale]/`.

## API overview

| Path                                       | Purpose                                                             |
| ------------------------------------------ | ------------------------------------------------------------------- |
| `GET/POST /api/auth/[...all]`              | Better Auth handler (sign-in, sign-up, session, 2FA, admin APIs, …) |
| `POST /api/account/self-suspend`           | Lock own account                                                    |
| `POST /api/account/self-unsuspend`         | Request unsuspend email                                             |
| `POST /api/account/self-unsuspend/confirm` | Confirm unsuspend token                                             |
| `GET /api/admin/users`                     | Admin user list                                                     |
| `GET /api/admin/users/stats`               | Admin user stats                                                    |
| `GET /api/user/[id]/avatar`                | User avatar                                                         |
| `POST /api/email`                          | Email send / QStash webhook                                         |
| `GET /api/health`                          | Liveness                                                            |
| `GET /api/ready`                           | Readiness (e.g. DB)                                                 |

Auth pages live under `/[locale]/auth/*` (sign-in, sign-up, verify, reset, 2FA, self-unsuspend). Signed-in app under `/[locale]/app/*` (account settings, admin users).

## Further docs

- [Auth](docs/auth.md) — config, pages, and flows
- [Admin](docs/admin.md) — config, pages, and flows
