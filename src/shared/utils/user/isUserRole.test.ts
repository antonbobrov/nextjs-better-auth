import { expect, test } from 'vitest';

import { USER_ROLE_IDS } from '@/shared/config/user';

import { isUserRole } from './isUserRole';

test('isUserRole', () => {
  USER_ROLE_IDS.forEach((role) => {
    expect(isUserRole(role)).toBe(true);
  });

  expect(isUserRole('unknown')).toBe(false);
});
