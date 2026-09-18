import z from 'zod';

import { zRole } from '@/lib/schema/auth';

import {
  ADMIN_USERS_PAGE_SIZE,
  ADMIN_USERS_PAGE_SIZE_MAX,
  ADMIN_USERS_PAGE_SIZE_MIN,
  ADMIN_USERS_SEARCH_MAX_LENGTH,
} from './constants';

const createdWithinEnum = z.enum(['day', 'week', 'month']);
const sortDirectionEnum = z.enum(['asc', 'desc']);

const createdWithinSchema = createdWithinEnum.nullable().catch(null);
const sortDirectionSchema = sortDirectionEnum.nullable().catch(null);

const bool = z
  .union([
    z.boolean(),
    z.enum(['true', 'false']).transform((v) => v === 'true'),
    z.literal('').transform(() => null),
    z.null(),
  ])
  .default(null);

const pageSize = z.coerce
  .number()
  .int()
  .transform((value) =>
    Math.min(
      Math.max(value, ADMIN_USERS_PAGE_SIZE_MIN),
      ADMIN_USERS_PAGE_SIZE_MAX,
    ),
  )
  .default(ADMIN_USERS_PAGE_SIZE);

export const listAdminUsersParamsSchema = z.object({
  role: zRole.nullable().default(null),
  banned: bool,
  createdWithin: createdWithinSchema.default(null),
  page: z.coerce.number().int().min(1).default(1),
  pageSize,
  search: z.string().max(ADMIN_USERS_SEARCH_MAX_LENGTH).default(''),
  selfSuspended: bool,
  sortDirection: sortDirectionSchema.default('desc'),
  twoFactor: bool,
  verified: bool,
});

export const REGISTERED_SORT_OPTIONS = sortDirectionEnum.options;

export const CREATED_WITHIN_OPTIONS = [
  'all',
  ...createdWithinEnum.options,
] as const;
