import { NextResponse, type NextRequest } from 'next/server';

import { authServer } from '@/lib/auth/server';
import { appLimiter } from '@/lib/upstash/limiters';
import type { TApiResponse, TApiRouteReturns } from '@/types/Api';
import { isAdminRole } from '@/utils';

import type { Ratelimit } from '@upstash/ratelimit';

export { getRequestMeta } from '@/lib/request';

async function getSession(req: NextRequest) {
  return authServer.api.getSession({
    headers: req.headers,
  });
}

type TAuthSession = NonNullable<Awaited<ReturnType<typeof getSession>>>;

type TRouteParams = Record<string, string>;

type TAuthContext<P extends TRouteParams | undefined = undefined> = {
  session: TAuthSession;
} & (P extends TRouteParams ? { params: P } : object);

type TAuthHandler<TData, P extends TRouteParams | undefined> = (
  req: NextRequest,
  ctx: TAuthContext<P>,
) => TApiRouteReturns<TData>;

type TRouteContext<P extends TRouteParams> = {
  params: Promise<P>;
};

export function withAuth<TData, P extends TRouteParams | undefined = undefined>(
  handler: TAuthHandler<TData, P>,
) {
  return async (
    req: NextRequest,
    routeCtx: P extends TRouteParams
      ? TRouteContext<P>
      : { params: Promise<Record<string, never>> },
  ): TApiRouteReturns<TData> => {
    const session = await getSession(req);

    if (!session) {
      return NextResponse.json({ code: 'unauthorized' }, { status: 401 });
    }

    const params = await routeCtx.params;

    return handler(req, { params, session } as unknown as TAuthContext<P>);
  };
}

export function withAdmin<
  TData,
  P extends TRouteParams | undefined = undefined,
>(handler: TAuthHandler<TData, P>) {
  return withAuth<TData, P>(async (req, ctx) => {
    if (!isAdminRole(ctx.session.user.role)) {
      return NextResponse.json({ code: 'forbidden' }, { status: 403 });
    }

    return handler(req, ctx);
  });
}

export async function readJson(req: NextRequest) {
  try {
    return { data: await req.json() };
  } catch {
    return { error: 'invalid' as const };
  }
}

export async function enforceAppRateLimit(
  userId: string,
  limiter: Ratelimit | null = appLimiter,
): Promise<NextResponse<TApiResponse<never>> | null> {
  if (!limiter) {
    return null;
  }

  const limit = await limiter.limit(userId);

  if (!limit.success) {
    const retryIn = Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000));

    return NextResponse.json(
      { code: 'rateLimitedWithTime', params: { retryIn } },
      { status: 429 },
    );
  }

  return null;
}
