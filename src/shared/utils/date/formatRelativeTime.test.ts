import { expect, test, vi } from 'vitest';

import { formatRelativeTime } from './formatRelativeTime';

test('formatRelativeTime', () => {
  vi.useFakeTimers();
  const now = new Date('2024-06-15T12:00:00.000Z');
  vi.setSystemTime(now);

  const sec = 1000;
  const min = 60 * sec;
  const hour = 60 * min;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  expect(formatRelativeTime(now)).toBe('now');
  expect(formatRelativeTime(now.toISOString())).toBe('now');

  expect(formatRelativeTime(new Date(now.getTime() - 30 * sec))).toBe(
    '30 seconds ago',
  );
  expect(formatRelativeTime(new Date(now.getTime() - min))).toBe(
    '1 minute ago',
  );
  expect(formatRelativeTime(new Date(now.getTime() - 2 * hour))).toBe(
    '2 hours ago',
  );
  expect(formatRelativeTime(new Date(now.getTime() - day))).toBe('yesterday');
  expect(formatRelativeTime(new Date(now.getTime() - 2 * day))).toBe(
    '2 days ago',
  );
  expect(formatRelativeTime(new Date(now.getTime() - week))).toBe('last week');
  expect(formatRelativeTime(new Date(now.getTime() - month))).toBe(
    'last month',
  );
  expect(formatRelativeTime(new Date(now.getTime() - year))).toBe('last year');

  expect(formatRelativeTime(new Date(now.getTime() + day))).toBe('tomorrow');
  expect(formatRelativeTime(new Date(now.getTime() + 2 * hour))).toBe(
    'in 2 hours',
  );

  vi.useRealTimers();
});
