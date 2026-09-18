import { NextResponse } from 'next/server';

import type { TApiRouteReturns } from '@/types/Api';

import {
  checkDatabase,
  checkQstash,
  checkRedis,
  type THealthCheck,
} from '../_lib';

type T = {
  database: THealthCheck;
  qstash: THealthCheck;
  redis: THealthCheck;
  status: 'ok' | 'error';
};

export async function GET(): TApiRouteReturns<T> {
  const [database, redis, qstash] = await Promise.all([
    checkDatabase(),
    checkRedis(),
    checkQstash(),
  ]);

  const ready =
    database.status === 'ok' &&
    redis.status !== 'error' &&
    qstash.status !== 'error';

  return NextResponse.json(
    {
      data: {
        database,
        qstash,
        redis,
        status: ready ? 'ok' : 'error',
      },
    },
    { status: ready ? 200 : 503 },
  );
}
