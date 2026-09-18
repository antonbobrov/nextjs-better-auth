import { NextResponse, type NextRequest } from 'next/server';

import { Style, Avatar } from '@dicebear/core';
import definition from '@dicebear/styles/waves.json';

type TContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, ctx: TContext) {
  const params = await ctx.params;

  if (!params.id) {
    return new NextResponse(null, { status: 404 });
  }

  const style = new Style(definition);
  const avatar = new Avatar(style, { seed: params.id });

  return new NextResponse(avatar.toString(), {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': 'image/svg+xml; charset=utf-8',
    },
    status: 200,
  });
}
