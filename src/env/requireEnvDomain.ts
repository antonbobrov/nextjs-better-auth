import { requireEnv } from './requireEnv';

export function requireEnvDomain() {
  return requireEnv('NEXT_PUBLIC_DOMAIN', process.env.NEXT_PUBLIC_DOMAIN || '');
}
