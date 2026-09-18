import { NextResponse } from 'next/server';

import { count, eq, gt, gte } from 'drizzle-orm';

import { withAdmin } from '@/app/api/_lib';
import { db } from '@/db';
import { session as sessionTable, user as userTable } from '@/db/schema';
import { totalOf } from '@/db/utils';
import type { TApiAdminUsersStats } from '@/features/(admin)/users/stats/types';
import { daysAgo } from '@/utils';

type T = TApiAdminUsersStats;

export const GET = withAdmin<T>(async () => {
  try {
    const now = new Date();
    const dayAgo = daysAgo(1);
    const weekAgo = daysAgo(7);
    const monthAgo = daysAgo(30);

    const [
      users,
      verifiedUsers,
      bannedUsers,
      selfSuspendedUsers,
      twoFactorUsers,
      activeSessions,
      newUsersDay,
      newUsersWeek,
      newUsersMonth,
    ] = await Promise.all([
      db.select({ total: count() }).from(userTable),
      db
        .select({ total: count() })
        .from(userTable)
        .where(eq(userTable.emailVerified, true)),
      db
        .select({ total: count() })
        .from(userTable)
        .where(eq(userTable.banned, true)),
      db
        .select({ total: count() })
        .from(userTable)
        .where(eq(userTable.selfSuspended, true)),
      db
        .select({ total: count() })
        .from(userTable)
        .where(eq(userTable.twoFactorEnabled, true)),
      db
        .select({ total: count() })
        .from(sessionTable)
        .where(gt(sessionTable.expiresAt, now)),
      db
        .select({ total: count() })
        .from(userTable)
        .where(gte(userTable.createdAt, dayAgo)),
      db
        .select({ total: count() })
        .from(userTable)
        .where(gte(userTable.createdAt, weekAgo)),
      db
        .select({ total: count() })
        .from(userTable)
        .where(gte(userTable.createdAt, monthAgo)),
    ]);

    return NextResponse.json({
      data: {
        stats: {
          activeSessions: totalOf(activeSessions),
          bannedUsers: totalOf(bannedUsers),
          newUsersDay: totalOf(newUsersDay),
          newUsersMonth: totalOf(newUsersMonth),
          newUsersWeek: totalOf(newUsersWeek),
          selfSuspendedUsers: totalOf(selfSuspendedUsers),
          twoFactorUsers: totalOf(twoFactorUsers),
          users: totalOf(users),
          verifiedUsers: totalOf(verifiedUsers),
        },
      },
    });
  } catch {
    return NextResponse.json({ code: 'internal' }, { status: 500 });
  }
});
