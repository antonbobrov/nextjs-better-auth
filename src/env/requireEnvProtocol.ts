import { requireEnv } from './requireEnv';

export function requireEnvProtocol() {
  return requireEnv(
    'NEXT_PUBLIC_PROTOCOL',
    process.env.NEXT_PUBLIC_PROTOCOL || '',
  );
}
