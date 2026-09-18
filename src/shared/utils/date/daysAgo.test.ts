import { expect, test, vi } from 'vitest';

import { daysAgo } from './daysAgo';

test('daysAgo', () => {
  vi.useFakeTimers();
  const now = new Date('2024-06-15T12:00:00.000Z');
  vi.setSystemTime(now);

  const day = 24 * 3600 * 1000;

  expect(daysAgo(0).getTime()).toBe(now.getTime());
  expect(daysAgo(0.1).getTime()).toBe(now.getTime());
  expect(daysAgo(0.5).getTime()).toBe(now.getTime());
  expect(daysAgo(0.9).getTime()).toBe(now.getTime());
  expect(daysAgo(1).getTime()).toBe(now.getTime() - day);
  expect(daysAgo(5).getTime()).toBe(now.getTime() - 5 * day);
  expect(daysAgo(5.1).getTime()).toBe(now.getTime() - 5 * day);
  expect(daysAgo(5.5).getTime()).toBe(now.getTime() - 5 * day);
  expect(daysAgo(5.9).getTime()).toBe(now.getTime() - 5 * day);

  expect(daysAgo(-0.1).getTime()).toBe(now.getTime());
  expect(daysAgo(-0.5).getTime()).toBe(now.getTime());
  expect(daysAgo(-0.9).getTime()).toBe(now.getTime());
  expect(daysAgo(-1).getTime()).toBe(now.getTime() + day);
  expect(daysAgo(-5).getTime()).toBe(now.getTime() + 5 * day);
  expect(daysAgo(-5.1).getTime()).toBe(now.getTime() + 5 * day);
  expect(daysAgo(-5.5).getTime()).toBe(now.getTime() + 5 * day);
  expect(daysAgo(-5.9).getTime()).toBe(now.getTime() + 5 * day);

  vi.useRealTimers();
});
