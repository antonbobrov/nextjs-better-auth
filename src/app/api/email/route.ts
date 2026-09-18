import { NextResponse, type NextRequest } from 'next/server';

import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';
import z from 'zod';

import { sendEmail } from '@/lib/email/utils/sendEmail';
import { zEmail } from '@/lib/schema/auth';
import type { TApiRouteReturns, TApiSuccess } from '@/types/Api';

type TPost = TApiSuccess;

const bodySchema = z.object({
  html: z.string().optional(),
  subject: z.string().min(1),
  to: zEmail,
  url: z.string().optional(),
});

async function handler(req: NextRequest): TApiRouteReturns<TPost> {
  let json: unknown;

  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ code: 'invalidFormat' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ code: 'invalidFormat' }, { status: 400 });
  }

  try {
    await sendEmail(parsed.data);

    return NextResponse.json({ data: { success: true } });
  } catch {
    return NextResponse.json({ code: 'internal' }, { status: 500 });
  }
}

export const POST = verifySignatureAppRouter(handler);
