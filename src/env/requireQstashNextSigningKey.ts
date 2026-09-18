import 'server-only';

import { requireEnv } from './requireEnv';

export function requireQstashNextSigningKey() {
  return requireEnv(
    'QSTASH_NEXT_SIGNING_KEY',
    process.env.QSTASH_NEXT_SIGNING_KEY || '',
    false,
  );
}
