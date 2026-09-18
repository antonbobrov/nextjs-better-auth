export const USER_ROLES = {
  admin: 'admin',
  user: 'user',
} as const;

export type TUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const USER_ROLE_IDS = [USER_ROLES.admin, USER_ROLES.user] as [
  TUserRole,
  ...TUserRole[],
];

export const USER_ROLE_OPTIONS = USER_ROLE_IDS.map((id) => ({
  id,
  label: id,
}));

export const PASSWORD_MIN_LENGTH = 7;
