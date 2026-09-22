import { expect, test } from 'vitest';

import { cn as cnFn } from './cn';

test('cn', () => {
  expect(cnFn('px-2', 'py-1')).toBe('px-2 py-1');

  expect(cnFn('px-2', null, undefined, 'text-sm')).toBe('px-2 text-sm');

  expect(cnFn({ block: false, hidden: true })).toBe('hidden');

  expect(cnFn('px-2', 'px-4')).toBe('px-4');

  expect(cnFn('text-red-500', ['text-blue-500', 'font-bold'])).toBe(
    'text-blue-500 font-bold',
  );
});
