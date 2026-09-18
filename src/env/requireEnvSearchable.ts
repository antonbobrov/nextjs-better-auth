import { requireEnv } from './requireEnv';

export function requireEnvSearchable() {
  return requireEnv(
    'NEXT_PUBLIC_SEARCHABLE',
    process.env.NEXT_PUBLIC_SEARCHABLE || '',
  );
}
