# Admin

User management under `/app/admin/*`. Mutations go through Better Auth’s `admin()` plugin (`authClient.admin.*`). Paginated list and stats use custom Drizzle APIs under `/api/admin/*`.

Server: `admin()` in `src/shared/lib/auth/server.ts` (default options)  
Client: `adminClient()` in `src/shared/lib/auth/client.ts`  
Roles: `USER_ROLES` in `src/shared/config/user.ts` (`admin` | `user`)

Locale prefix `[locale]` is omitted below.

## General

- Simple role string — no custom Better Auth AC / permissions matrix
- Admin UI: stats, user list, create user, user detail (role, password, ban, impersonate, delete, sessions)
- Self-protection in UI: cannot change own role, ban/delete/impersonate self, or manage own sessions from admin detail
- Impersonation: stop control in account menu when `session.impersonatedBy` is set

## Config

| Piece | Location | Notes |
| --- | --- | --- |
| Plugin | `admin()` | Defaults only |
| Roles | `USER_ROLES` | `admin`, `user` |
| Gate helper | `isAdminRole` | `role === 'admin'` |
| Schema | `src/db/schema.ts` | `role`, `banned`, `banReason`, `banExpires`; `session.impersonatedBy` |
| Routes | `ROUTES.admin.*` | `src/shared/config/routes.ts` |

Access layers:

1. `src/proxy.ts` — any session for `/app/*`
2. `admin/layout.tsx` — `isAdminRole` or redirect to `/app`
3. `withAdmin` on custom APIs — 401 / 403
4. Sidebar Admin link only if admin

## Pages

| Path | Purpose |
| --- | --- |
| `/app/admin` | Redirect → stats |
| `/app/admin/users` | Redirect → stats |
| `/app/admin/users/stats` | Aggregates (users, verified, banned, 2FA, sessions, …) |
| `/app/admin/users/list` | Filterable / paginated table |
| `/app/admin/users/list/[id]` | User detail + actions |
| `/app/admin/users/new` | Create user |

Nav: Stats, Users list, Add user — `src/layout/(app)/admin/nav/`.  
Features: `src/features/(admin)/users/`. Views: `src/views/(admin)/users/`.

## APIs

### Custom (Drizzle)

| Path | Guard | Purpose |
| --- | --- | --- |
| `GET /api/admin/users` | `withAdmin` | Search, filters, sort, pagination |
| `GET /api/admin/users/stats` | `withAdmin` | Dashboard counts |

List filters include role, verified, banned, selfSuspended, twoFactor, createdWithin, etc.

### Better Auth plugin

Create, ban/unban, set role/password, impersonate, remove user, list/revoke sessions — via `/api/auth/[...all]` and `authClient.admin.*` (not under `/api/admin/**`).

## Flows

### List users

1. `/app/admin/users/list` (layout gate)
2. URL search params → `GET /api/admin/users`
3. Table + row actions (skip self for destructive / impersonate)

### View user

1. `/app/admin/users/list/[id]`
2. `authClient.admin.listUsers` (id filter)
3. Details; if not self: role, ban/impersonate/delete, sessions; always: set password

### Create user

1. `/app/admin/users/new` — name, email, password, role
2. `authClient.admin.createUser` (`emailVerified` follows `SIGN_UP.requireVerification`)
3. Redirect to user detail (or list)

### Ban / unban

1. Confirm: reason + optional expiry → `banExpiresIn` seconds
2. `banUser` / `unbanUser` → invalidate list query

### Impersonate

1. Confirm → `impersonateUser` → full reload
2. App shows Stop Impersonating when `impersonatedBy` set
3. `stopImpersonating` → reload

### Set role / password / delete / sessions

- Role → `setRole` (hidden for self)
- Password → `setUserPassword` (allowed for self)
- Delete → `removeUser` → list
- Sessions → `listUserSessions`; revoke one / all via `revokeUserSession` / `revokeUserSessions` (hidden for self)

### Stats

1. `/app/admin/users/stats` → `GET /api/admin/users/stats`
2. Cards deep-link to list with query filters (e.g. `?banned=true`)
