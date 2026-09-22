import { expect, test } from 'vitest';

import { toSelectValue } from './toSelectValue';

test('toSelectValue', () => {
  expect(toSelectValue('1')).toBe('1');
  expect(toSelectValue(0)).toBe('0');

  expect(toSelectValue(null)).toBeNull();
  expect(toSelectValue(['1', '2'])).toBeNull();
});
