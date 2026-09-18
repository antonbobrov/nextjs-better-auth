import 'server-only';

import { requireEnv } from './requireEnv';

export function requireSmtpPort() {
  const value = requireEnv('SMTP_PORT', process.env.SMTP_PORT || '');
  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error('Invalid required environment variable: SMTP_PORT');
  }

  return port;
}
