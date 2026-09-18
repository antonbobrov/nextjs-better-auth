import { expect, test } from 'vitest';

import { USER_ROLE_IDS, USER_ROLES } from '@/shared/config/user';

import { toUserRole } from './toUserRole';

test('toUserRole', () => {
  USER_ROLE_IDS.forEach((role) => {
    expect(toUserRole(role)).toBe(role);
  });

  expect(toUserRole('unknown')).toBe(USER_ROLES.user);
});
