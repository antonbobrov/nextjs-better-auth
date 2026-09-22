import { expect, test } from 'vitest';

import { USER_ROLES } from '@/shared/config/user';

import { isAdminRole } from './isAdminRole';

test('isAdminRole', () => {
  expect(isAdminRole(null)).toBe(false);
  expect(isAdminRole(undefined)).toBe(false);
  expect(isAdminRole('')).toBe(false);
  expect(isAdminRole('admin')).toBe(true);
  expect(isAdminRole('user')).toBe(false);
  expect(isAdminRole('unknown')).toBe(false);

  Object.values(USER_ROLES).forEach((value) => {
    expect(isAdminRole(value)).toBe(value === USER_ROLES.admin);
  });
});
