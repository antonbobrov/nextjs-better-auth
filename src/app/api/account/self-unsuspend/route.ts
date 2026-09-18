import { randomBytes } from 'node:crypto';

import { NextResponse, type NextRequest } from 'next/server';

import { sql } from 'drizzle-orm';

import { enforceAppRateLimit, getRequestMeta, readJson } from '@/app/api/_lib';
import { db } from '@/db';
import { user as userTable } from '@/db/schema';
import { authServer } from '@/lib/auth/server';
import { selfUnsuspendIdentifier } from '@/lib/auth/utils';
import { sendSelfUnsuspendEmail } from '@/lib/email/sendSelfUnsuspendEmail';
import { zEmail } from '@/lib/schema/auth';
import { sensitiveLimiter } from '@/lib/upstash/limiters';
import { SELF_SUSPEND } from '@/shared/config/auth';
import type { TApiRouteReturns, TApiSuccess } from '@/types/Api';

type TPost = TApiSuccess;

export async function POST(req: NextRequest): TApiRouteReturns<TPost> {
  const body = await readJson(req);

  if ('error' in body) {
    return NextResponse.json({ code: 'invalidFormat' }, { status: 400 });
  }

  const email = zEmail.safeParse((body.data as { email?: unknown }).email);

  if (!email.success) {
    return NextResponse.json({ code: 'email.invalid' }, { status: 400 });
  }

  const normalizedEmail = email.data.toLowerCase();

  const limited = await enforceAppRateLimit(
    `${SELF_SUSPEND.identifierPrefix}${normalizedEmail}`,
    sensitiveLimiter,
  );

  if (limited) {
    return limited;
  }

  try {
    const ctx = await authServer.$context;

    const [row] = await db
      .select({
        id: userTable.id,
        email: userTable.email,
        selfSuspended: userTable.selfSuspended,
      })
      .from(userTable)
      .where(sql`lower(${userTable.email}) = ${normalizedEmail}`)
      .limit(1);

    if (!row?.selfSuspended) {
      return NextResponse.json({ data: { success: true } });
    }

    const token = randomBytes(24).toString('base64url');

    await ctx.internalAdapter.createVerificationValue({
      expiresAt: new Date(Date.now() + SELF_SUSPEND.expiresIn * 1000),
      identifier: selfUnsuspendIdentifier(token),
      value: row.id,
    });

    const meta = getRequestMeta(req);

    await sendSelfUnsuspendEmail({
      email: row.email,
      ipAddress: meta.ipAddress,
      token,
      userAgent: meta.userAgent,
    });

    return NextResponse.json({ data: { success: true } });
  } catch {
    return NextResponse.json({ code: 'internal' }, { status: 500 });
  }
}
