import { expect, test, vi } from 'vitest';

import { toDateTimeLocal } from './toDateTimeLocal';

test('toDateTimeLocal', () => {
  const date = new Date('2024-06-15T12:30:45.123Z');

  vi.spyOn(date, 'getTimezoneOffset').mockReturnValue(0);
  expect(toDateTimeLocal(date)).toBe('2024-06-15T12:30');

  vi.spyOn(date, 'getTimezoneOffset').mockReturnValue(-180);
  expect(toDateTimeLocal(date)).toBe('2024-06-15T15:30');

  vi.spyOn(date, 'getTimezoneOffset').mockReturnValue(300);
  expect(toDateTimeLocal(date)).toBe('2024-06-15T07:30');
});
