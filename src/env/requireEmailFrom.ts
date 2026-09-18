import 'server-only';

import { requireEnv } from './requireEnv';

export function requireEmailFrom() {
  return requireEnv('EMAIL_FROM', process.env.EMAIL_FROM || '');
}
