import { SELF_SUSPEND } from '@/shared/config/auth';

export function selfUnsuspendIdentifier(token: string) {
  return `${SELF_SUSPEND.identifierPrefix}${token}`;
}
