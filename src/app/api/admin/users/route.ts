import { NextResponse } from 'next/server';

import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  ilike,
  isNull,
  or,
  type SQL,
} from 'drizzle-orm';

import { withAdmin } from '@/app/api/_lib';
import { db } from '@/db';
import { user as userTable } from '@/db/schema';
import { listAdminUsersParamsSchema } from '@/features/(admin)/users/users/schema';
import type {
  TApiAdminUsersList,
  TCreatedWithin,
} from '@/features/(admin)/users/users/types';
import { USER_ROLES, type TUserRole } from '@/shared/config/user';
import { isAdminRole, type TBooleanFilter } from '@/utils';

type T = TApiAdminUsersList;

function booleanWhere(
  column:
    | typeof userTable.banned
    | typeof userTable.selfSuspended
    | typeof userTable.twoFactorEnabled,
  value: TBooleanFilter,
) {
  if (value === null) {
    return undefined;
  }

  if (value) {
    return eq(column, true);
  }

  return or(eq(column, false), isNull(column));
}

function roleWhere(role: TUserRole | null) {
  if (role === null) {
    return undefined;
  }

  if (isAdminRole(role)) {
    return eq(userTable.role, USER_ROLES.admin);
  }

  return or(eq(userTable.role, USER_ROLES.user), isNull(userTable.role));
}

function searchWhere(search: string) {
  const value = search.trim();

  if (!value) {
    return undefined;
  }

  const pattern = `%${value.replace(/[\\%_]/g, '\\$&')}%`;

  return or(
    ilike(userTable.id, pattern),
    ilike(userTable.email, pattern),
    ilike(userTable.name, pattern),
  );
}

function createdWithinWhere(createdWithin: TCreatedWithin) {
  if (createdWithin === null) {
    return undefined;
  }

  const daysByPeriod = {
    day: 1,
    month: 30,
    week: 7,
  } as const;

  const since = new Date();
  since.setDate(since.getDate() - daysByPeriod[createdWithin]);

  return gte(userTable.createdAt, since);
}

export const GET = withAdmin<T>(async (req) => {
  try {
    const parsed = listAdminUsersParamsSchema.safeParse(
      Object.fromEntries(req.nextUrl.searchParams.entries()),
    );

    if (!parsed.success) {
      return NextResponse.json({ code: 'invalidFormat' }, { status: 400 });
    }

    const {
      role,
      banned,
      createdWithin,
      page,
      pageSize,
      search,
      selfSuspended,
      sortDirection,
      twoFactor,
      verified,
    } = parsed.data;

    const whereParts = [
      searchWhere(search),
      roleWhere(role),
      verified === null ? undefined : eq(userTable.emailVerified, verified),
      booleanWhere(userTable.banned, banned),
      booleanWhere(userTable.selfSuspended, selfSuspended),
      twoFactor === null
        ? undefined
        : eq(userTable.twoFactorEnabled, twoFactor),
      createdWithinWhere(createdWithin),
    ].filter((part): part is SQL => part !== undefined);

    const where = whereParts.length ? and(...whereParts) : undefined;

    const [users, totals] = await Promise.all([
      db
        .select()
        .from(userTable)
        .where(where)
        .orderBy(
          sortDirection === 'asc'
            ? asc(userTable.createdAt)
            : desc(userTable.createdAt),
        )
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ total: count() }).from(userTable).where(where),
    ]);

    return NextResponse.json({
      data: {
        total: totals[0]?.total ?? 0,
        users,
      },
    });
  } catch {
    return NextResponse.json({ code: 'internal' }, { status: 500 });
  }
});
