import type { TUserRole } from '@/shared/config/user';
import { USER_ROLES } from '@/shared/config/user';

import { isUserRole } from './isUserRole';

export function toUserRole(role?: string | null): TUserRole {
  if (role && isUserRole(role)) {
    return role;
  }

  return USER_ROLES.user;
}
