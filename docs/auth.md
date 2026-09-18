# Auth

Email/password authentication via [Better Auth](https://www.better-auth.com/), with optional email verification, TOTP 2FA, and self-suspend. Handler: `POST/GET /api/auth/[...all]` (`src/app/api/auth/[...all]/route.ts`).

Server config: `src/shared/lib/auth/server.ts`  
Client: `src/shared/lib/auth/client.ts`  
Tunables: `src/shared/config/auth.ts`

Locale prefix `[locale]` is omitted below (default: `en`).

## General

- Plugins: `admin()`, `twoFactor()`, `i18n()` (en/ru messages for Better Auth errors)
- Extra user field: `selfSuspended` — blocks new sessions
- Emails go through `queueEmail` → `/api/email` (QStash if configured, else sync)
- Protection: `src/proxy.ts` requires a session for `/app/*`; auth layout redirects signed-in users away from `/auth/*`

## Config

From `src/shared/config/auth.ts` (current defaults):

| Constant | Values | Meaning |
| --- | --- | --- |
| `SESSION` | `expiresIn` 7d, `updateAge` 15m | Session TTL and sliding refresh |
| `RATE_LIMIT` | `max` 100 / `window` 10s | Better Auth DB rate limit |
| `SIGN_UP` | enabled, autoSignIn, requireVerification, resendVerification — all `true` | Signup gate and verify behavior |
| `EMAIL_VERIFICATION` | `autoSignIn` false, `expiresIn` 1h | Post-verify login; token TTL |
| `RESET_PASSWORD` | `expiresIn` 1h | Reset token TTL |
| `TWO_FACTOR` | `digits` 6, `enabled` true | TOTP length; feature flag |
| `SELF_SUSPEND` | prefixes + `expiresIn` 1h | Unsuspend token store keys / TTL |

Related: `PASSWORD_MIN_LENGTH = 7` in `src/shared/config/user.ts`. Routes: `ROUTES.auth.*` in `src/shared/config/routes.ts`.

Server also enables `user.deleteUser`, session `freshAge: 0`, and sign-in / password-changed email hooks.

## Pages

| Path | Purpose |
| --- | --- |
| `/auth` | Redirect → sign-in |
| `/auth/sign-in` | Email/password; `?email=`, `?error=` |
| `/auth/sign-up` | Create account (`404` if signup disabled) |
| `/auth/send-verify-email` | Resend verification |
| `/auth/verify-email` | Confirm `?token=` |
| `/auth/forgot-password` | Request reset |
| `/auth/reset-password` | Set new password (`?token=`) |
| `/auth/two-factor` | TOTP / backup code after password |
| `/auth/self-unsuspend` | Request (`?email=`) or confirm (`?token=`) |

Authenticated 2FA setup: `/app/account/two-factor` (`404` if `!TWO_FACTOR.enabled`).

Forms live in `src/features/(auth)/`, page shells in `src/views/(auth)/`.

## Flows

### Sign-up

1. `/auth/sign-up` → `authClient.signUp.email`
2. If `requireVerification` → confirmation email → success “check email”
3. Else if `autoSignIn` → `/app`; else → sign-in
4. Signup with existing unverified email + `resendVerification` → server resends verification

### Sign-in

1. `/auth/sign-in` → `authClient.signIn.email`
2. `SELF_SUSPENDED_USER` → CTA to `/auth/self-unsuspend`
3. `EMAIL_NOT_VERIFIED` → `/auth/send-verify-email`
4. `twoFactorRedirect` → `/auth/two-factor`
5. Else → `/app` (+ sign-in notification email, unless impersonating)

### Email verification

1. Link: `/auth/verify-email?token=…` or resend from `/auth/send-verify-email`
2. `verifyEmail` / `sendVerificationEmail`
3. Success UI, or `/app` if `EMAIL_VERIFICATION.autoSignIn`

### Forgot / reset password

1. `/auth/forgot-password` → `requestPasswordReset` (`redirectTo` = reset page)
2. Email with token URL
3. `/auth/reset-password?token=…` → `resetPassword` → password-changed email

### 2FA

**Setup** (`/app/account/two-factor`):

1. `twoFactor.enable` (password) → QR / secret + backup codes
2. `twoFactor.verifyTotp` to finish enable
3. Disable / regen: `twoFactor.disable`, `generateBackupCodes`

**Sign-in:**

1. Password OK + 2FA on → `/auth/two-factor`
2. TOTP or backup (+ optional trust device) → `/app`

### Self-suspend / unsuspend

**Suspend** (from `/app/account/danger`):

1. Password → `POST /api/account/self-suspend`
2. Sets `selfSuspended`, revokes sessions
3. Later sign-in blocked in session `create.before`

**Unsuspend:**

1. `POST /api/account/self-unsuspend` with email (always success-shaped if not suspended — no leak)
2. Token stored; email link `/auth/self-unsuspend?token=…`
3. Confirm → `POST /api/account/self-unsuspend/confirm` → clear flag → sign in

## Emails

| Email | Trigger |
| --- | --- |
| Confirm / verify | Signup & resend verification |
| Reset password | Forgot-password request |
| Sign-in notification | Session created (not impersonation) |
| Password changed | Reset complete or `/change-password` (not when impersonating) |
| Self-unsuspend | Unsuspend request API |
