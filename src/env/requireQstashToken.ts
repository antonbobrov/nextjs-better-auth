import 'server-only';

import { requireEnv } from './requireEnv';

export function requireQstashToken() {
  return requireEnv('QSTASH_TOKEN', process.env.QSTASH_TOKEN || '', false);
}
