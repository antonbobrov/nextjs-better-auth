import 'server-only';

import { requireEnv } from './requireEnv';

export function requireSmtpUser() {
  return requireEnv('SMTP_USER', process.env.SMTP_USER || '');
}
