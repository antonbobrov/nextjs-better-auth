import 'server-only';

import { requireEnv } from './requireEnv';

export function requireSmtpPassword() {
  return requireEnv('SMTP_PASSWORD', process.env.SMTP_PASSWORD || '');
}
