import 'server-only';

import { requireEnv } from './requireEnv';

export function requireUpstashRedisToken() {
  return requireEnv(
    'UPSTASH_REDIS_REST_TOKEN',
    process.env.UPSTASH_REDIS_REST_TOKEN || '',
    false,
  );
}
