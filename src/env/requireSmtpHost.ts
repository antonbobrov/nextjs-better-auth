import 'server-only';

import { requireEnv } from './requireEnv';

export function requireSmtpHost() {
  return requireEnv('SMTP_HOST', process.env.SMTP_HOST || '');
}
