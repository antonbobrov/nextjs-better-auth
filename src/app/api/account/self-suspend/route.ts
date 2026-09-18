import { NextResponse } from 'next/server';

import { eq } from 'drizzle-orm';

import { enforceAppRateLimit, readJson, withAuth } from '@/app/api/_lib';
import { db } from '@/db';
import { user as userTable } from '@/db/schema';
import { authServer } from '@/lib/auth/server';
import { zCurrentPassword } from '@/lib/schema/auth';
import { mutationLimiter } from '@/lib/upstash/limiters';
import type { TApiSuccess } from '@/types/Api';

type TPost = TApiSuccess;

export const POST = withAuth<TPost>(async (req, { session }) => {
  const body = await readJson(req);

  if ('error' in body) {
    return NextResponse.json({ code: 'invalidFormat' }, { status: 400 });
  }

  const password = zCurrentPassword.safeParse(
    (body.data as { password?: unknown }).password,
  );

  if (!password.success) {
    return NextResponse.json({ code: 'password.incorrect' }, { status: 400 });
  }
  try {
    await authServer.api.verifyPassword({
      body: { password: password.data },
      headers: req.headers,
    });
  } catch {
    return NextResponse.json({ code: 'password.incorrect' }, { status: 400 });
  }

  const limited = await enforceAppRateLimit(session.user.id, mutationLimiter);

  if (limited) {
    return limited;
  }

  try {
    await db
      .update(userTable)
      .set({ selfSuspended: true, updatedAt: new Date() })
      .where(eq(userTable.id, session.user.id));

    await authServer.api.revokeSessions({
      headers: req.headers,
    });

    return NextResponse.json({ data: { success: true } });
  } catch {
    return NextResponse.json({ code: 'internal' }, { status: 500 });
  }
});
