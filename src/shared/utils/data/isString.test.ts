import { expect, test } from 'vitest';

import { isString } from './isString';

test('isString', () => {
  expect(isString('')).toBe(true);
  expect(isString('hello')).toBe(true);

  expect(isString(1)).toBe(false);
  expect(isString(true)).toBe(false);
  expect(isString(null)).toBe(false);
  expect(isString(undefined)).toBe(false);
  expect(isString({})).toBe(false);
  expect(isString([])).toBe(false);
});
