import 'server-only';

import { requireEnv } from './requireEnv';

export function requireDatabaseURL() {
  return requireEnv('DATABASE_URL', process.env.DATABASE_URL || '');
}
