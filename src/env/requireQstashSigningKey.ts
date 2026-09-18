import 'server-only';

import { requireEnv } from './requireEnv';

export function requireQstashSigningKey() {
  return requireEnv(
    'QSTASH_CURRENT_SIGNING_KEY',
    process.env.QSTASH_CURRENT_SIGNING_KEY || '',
    false,
  );
}
