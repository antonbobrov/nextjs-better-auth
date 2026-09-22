import { expect, test } from 'vitest';

import { ROUTES } from '@/shared/config/routes';

import { getRobotsDisallowPaths } from './getRobotsDisallowPaths';

test('getRobotsDisallowPaths', () => {
  expect(getRobotsDisallowPaths()).toEqual([
    ROUTES.app,
    `${ROUTES.app}/*`,
    ROUTES.auth.index,
    `${ROUTES.auth.index}/*`,
  ]);
});
