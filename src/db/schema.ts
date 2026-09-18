import * as t from 'drizzle-orm/pg-core';

import { dateAt } from './mixins';

export const user = t.pgTable('user', {
  id: t.text('id').primaryKey(),
  role: t.text('role'),
  banExpires: dateAt('ban_expires'),
  banned: t.boolean('banned'),
  banReason: t.text('ban_reason'),
  createdAt: dateAt('created_at').notNull(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: t.boolean('email_verified').notNull().default(false),
  image: t.text('image'),
  name: t.varchar('name', { length: 255 }).notNull(),
  selfSuspended: t.boolean('self_suspended'),
  twoFactorEnabled: t.boolean('two_factor_enabled').notNull().default(false),
  updatedAt: dateAt('updated_at').notNull(),
});

export const session = t.pgTable('session', {
  id: t.text('id').primaryKey(),
  createdAt: dateAt('created_at').notNull(),
  expiresAt: dateAt('expires_at').notNull(),
  impersonatedBy: t.text('impersonated_by'),
  ipAddress: t.text('ip_address'),
  token: t.varchar('token', { length: 255 }).notNull().unique(),
  updatedAt: dateAt('updated_at').notNull(),
  userAgent: t.text('user_agent'),
  userId: t
    .text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = t.pgTable(
  'account',
  {
    id: t.text('id').primaryKey(),
    accessToken: t.text('access_token'),
    accessTokenExpiresAt: dateAt('access_token_expires_at'),
    accountId: t.text('account_id').notNull(),
    createdAt: dateAt('created_at').notNull(),
    idToken: t.text('id_token'),
    issuer: t.text('issuer').notNull(),
    password: t.text('password'),
    providerId: t.text('provider_id').notNull(),
    refreshToken: t.text('refresh_token'),
    refreshTokenExpiresAt: dateAt('refresh_token_expires_at'),
    scope: t.text('scope'),
    updatedAt: dateAt('updated_at').notNull(),
    userId: t
      .text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [t.index('account_userId_idx').on(table.userId)],
);

export const verification = t.pgTable('verification', {
  id: t.text('id').primaryKey(),
  createdAt: dateAt('created_at').notNull(),
  expiresAt: dateAt('expires_at').notNull(),
  identifier: t.text('identifier').notNull(),
  updatedAt: dateAt('updated_at').notNull(),
  value: t.text('value').notNull(),
});

export const rateLimit = t.pgTable('rate_limit', {
  key: t.varchar('key', { length: 255 }).notNull().unique(),
  id: t.text('id').primaryKey(),
  count: t.integer('count').notNull(),
  lastRequest: t.bigint('last_request', { mode: 'number' }).notNull(),
});

export const twoFactor = t.pgTable('two_factor', {
  id: t.text('id').primaryKey(),
  backupCodes: t.text('backup_codes').notNull(),
  failedVerificationCount: t.integer('failed_verification_count').notNull(),
  lockedUntil: dateAt('locked_until'),
  secret: t.text('secret').notNull(),
  userId: t
    .text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  verified: t.boolean('verified').notNull(),
});
