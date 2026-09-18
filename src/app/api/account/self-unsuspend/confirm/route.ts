import { NextResponse, type NextRequest } from 'next/server';

import { eq } from 'drizzle-orm';
import z from 'zod';

import { enforceAppRateLimit, readJson } from '@/app/api/_lib';
import { db } from '@/db';
import { user as userTable } from '@/db/schema';
import { authServer } from '@/lib/auth/server';
import { selfUnsuspendIdentifier } from '@/lib/auth/utils';
import { sensitiveLimiter } from '@/lib/upstash/limiters';
import { SELF_SUSPEND } from '@/shared/config/auth';
import type { TApiRouteReturns, TApiSuccess } from '@/types/Api';

type TPost = TApiSuccess;

export async function POST(req: NextRequest): TApiRouteReturns<TPost> {
  const body = await readJson(req);

  if ('error' in body) {
    return NextResponse.json({ code: 'invalidFormat' }, { status: 400 });
  }

  const token = z
    .string()
    .min(1)
    .safeParse((body.data as { token?: unknown }).token);

  if (!token.success) {
    return NextResponse.json(
      { code: 'unsuspend.invalidToken' },
      { status: 400 },
    );
  }

  const limited = await enforceAppRateLimit(
    `${SELF_SUSPEND.confirmIdentifierPrefix}${token.data}`,
    sensitiveLimiter,
  );

  if (limited) {
    return limited;
  }

  try {
    const ctx = await authServer.$context;
    const verification = await ctx.internalAdapter.consumeVerificationValue(
      selfUnsuspendIdentifier(token.data),
    );

    if (!verification) {
      return NextResponse.json(
        { code: 'unsuspend.invalidToken' },
        { status: 400 },
      );
    }

    await db
      .update(userTable)
      .set({ selfSuspended: false, updatedAt: new Date() })
      .where(eq(userTable.id, verification.value));

    return NextResponse.json({ data: { success: true } });
  } catch {
    return NextResponse.json(
      { code: 'unsuspend.invalidToken' },
      { status: 400 },
    );
  }
}
