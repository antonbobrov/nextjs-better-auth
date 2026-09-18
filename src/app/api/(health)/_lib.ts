import { sql } from 'drizzle-orm';

import { db } from '@/db';
import { qstash, redis } from '@/lib/upstash/upstash';

type THealthCheckStatus = 'ok' | 'error' | 'skipped';

export type THealthCheck = {
  latencyMs?: number;
  status: THealthCheckStatus;
};

export async function checkDatabase(): Promise<THealthCheck> {
  const startedAt = Date.now();

  try {
    await db.execute(sql`select 1`);

    return {
      latencyMs: Date.now() - startedAt,
      status: 'ok',
    };
  } catch {
    return {
      latencyMs: Date.now() - startedAt,
      status: 'error',
    };
  }
}

export async function checkRedis(): Promise<THealthCheck> {
  if (!redis) {
    return { status: 'skipped' };
  }

  const startedAt = Date.now();

  try {
    const pong = await redis.ping();

    if (pong !== 'PONG') {
      return {
        latencyMs: Date.now() - startedAt,
        status: 'error',
      };
    }

    return {
      latencyMs: Date.now() - startedAt,
      status: 'ok',
    };
  } catch {
    return {
      latencyMs: Date.now() - startedAt,
      status: 'error',
    };
  }
}

export async function checkQstash(): Promise<THealthCheck> {
  if (!qstash) {
    return { status: 'skipped' };
  }

  const startedAt = Date.now();

  try {
    await qstash.schedules.list();

    return {
      latencyMs: Date.now() - startedAt,
      status: 'ok',
    };
  } catch {
    return {
      latencyMs: Date.now() - startedAt,
      status: 'error',
    };
  }
}
