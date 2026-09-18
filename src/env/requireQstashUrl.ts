import 'server-only';

import { requireEnv } from './requireEnv';

export function requireQstashUrl() {
  return requireEnv('QSTASH_URL', process.env.QSTASH_URL || '', false);
}
