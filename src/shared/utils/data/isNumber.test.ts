import { expect, test } from 'vitest';

import { isNumber } from './isNumber';

test('isNumber', () => {
  expect(isNumber(0)).toBe(true);
  expect(isNumber(1)).toBe(true);
  expect(isNumber(-1.5)).toBe(true);
  expect(isNumber(Number.NaN)).toBe(true);
  expect(isNumber(Number.POSITIVE_INFINITY)).toBe(true);

  expect(isNumber('1')).toBe(false);
  expect(isNumber(true)).toBe(false);
  expect(isNumber(null)).toBe(false);
  expect(isNumber(undefined)).toBe(false);
  expect(isNumber({})).toBe(false);
  expect(isNumber([])).toBe(false);
});
