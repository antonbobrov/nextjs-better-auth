import { NextResponse } from 'next/server';

import type { TApiRouteReturns } from '@/types/Api';

type T = {
  status: 'ok';
};

export async function GET(): TApiRouteReturns<T> {
  return NextResponse.json({
    data: { status: 'ok' },
  });
}
