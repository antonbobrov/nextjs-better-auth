import { expect, test } from 'vitest';

import { ROUTES } from '@/shared/config/routes';

import { isCurrentPage } from './isCurrentPage';

test('isCurrentPage', () => {
  expect(isCurrentPage(ROUTES.app, ROUTES.app)).toBe(true);
  expect(isCurrentPage(ROUTES.account.details, ROUTES.account.details)).toBe(
    true,
  );

  expect(isCurrentPage(ROUTES.app, ROUTES.account.root)).toBe(true);
  expect(isCurrentPage(ROUTES.account.root, ROUTES.account.details)).toBe(true);
  expect(isCurrentPage(ROUTES.admin.users.list, ROUTES.admin.user('1'))).toBe(
    true,
  );

  expect(isCurrentPage(ROUTES.account.details, ROUTES.account.edit)).toBe(
    false,
  );
  expect(isCurrentPage(ROUTES.account.details, ROUTES.account.root)).toBe(
    false,
  );
  expect(isCurrentPage(ROUTES.admin.users.list, ROUTES.admin.users.new)).toBe(
    false,
  );
  expect(isCurrentPage(ROUTES.admin.users.list, ROUTES.admin.users.stats)).toBe(
    false,
  );

  expect(isCurrentPage('app', 'app')).toBe(true);
  expect(isCurrentPage('/app/test-page', '/app/test-page')).toBe(true);
  expect(isCurrentPage('/app', '/app/current-page')).toBe(true);
});
