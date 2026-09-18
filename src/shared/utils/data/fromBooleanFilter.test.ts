import { expect, test } from 'vitest';

import { fromBooleanFilter } from './fromBooleanFilter';

test('fromBooleanFilter', () => {
  expect(fromBooleanFilter(null)).toBe('all');
  expect(fromBooleanFilter(true)).toBe('true');
  expect(fromBooleanFilter(false)).toBe('false');
});
