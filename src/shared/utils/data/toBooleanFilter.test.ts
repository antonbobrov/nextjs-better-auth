import { expect, test } from 'vitest';

import { toBooleanFilter } from './toBooleanFilter';

test('toBooleanFilter', () => {
  expect(toBooleanFilter('true')).toBe(true);
  expect(toBooleanFilter('false')).toBe(false);
  expect(toBooleanFilter('all')).toBe(null);
  expect(toBooleanFilter('unknown')).toBe(null);
});
