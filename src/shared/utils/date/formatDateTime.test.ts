import { expect, test } from 'vitest';

import { formatDateTime } from './formatDateTime';

test('formatDateTime', () => {
  const value = new Date('2024-06-15T12:00:00.000Z');

  const fromDate = formatDateTime(value);
  const fromString = formatDateTime(value.toISOString());
  const fromRu = formatDateTime(value, 'ru');

  expect(fromDate).toEqual(expect.any(String));
  expect(fromDate.length).toBeGreaterThan(0);
  expect(fromString).toBe(fromDate);
  expect(fromRu).toEqual(expect.any(String));
  expect(fromRu.length).toBeGreaterThan(0);
  expect(fromRu).not.toBe(fromDate);
});
