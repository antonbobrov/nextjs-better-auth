import { USER_ROLES } from '@/shared/config/user';

export function isAdminRole(
  role: string | null | undefined,
): role is typeof USER_ROLES.admin {
  return role === USER_ROLES.admin;
}
