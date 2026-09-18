import 'server-only';

import { requireEnv } from './requireEnv';

export function requireUpstashRedisUrl() {
  return requireEnv(
    'UPSTASH_REDIS_REST_URL',
    process.env.UPSTASH_REDIS_REST_URL || '',
    false,
  );
}
