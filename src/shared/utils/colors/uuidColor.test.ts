import { expect, test } from 'vitest';

import { uuidColor } from './uuidColor';

test('uuidColor', () => {
  const colors = ['#E11D48', '#EA580C', '#16A34A', '#2563EB', '#7C3AED'];

  for (let i = 0; i < 100; i += 1) {
    const uuid = crypto.randomUUID();
    expect(uuidColor(uuid)).toBeOneOf(colors);
  }

  expect(uuidColor('invalid string')).toBeOneOf(colors);
});
