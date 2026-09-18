import { USER_ROLES, type TUserRole } from '@/shared/config/user';

export function isUserRole(value: string): value is TUserRole {
  return value in USER_ROLES;
}
