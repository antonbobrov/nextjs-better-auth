import { expect, test } from 'vitest';

import { isUndefined } from './isUndefined';

test('isUndefined', () => {
  expect(isUndefined(undefined)).toBe(true);
  expect(isUndefined(void 0)).toBe(true);

  expect(isUndefined(null)).toBe(false);
  expect(isUndefined(0)).toBe(false);
  expect(isUndefined('')).toBe(false);
  expect(isUndefined(false)).toBe(false);
  expect(isUndefined({})).toBe(false);
});
