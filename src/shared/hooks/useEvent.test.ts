import { renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';

import { useEvent } from './useEvent';

test('useEvent', () => {
  const { rerender, result } = renderHook(
    ({ value }) => useEvent(() => value),
    { initialProps: { value: 1 } },
  );
  const stable = result.current;

  expect(stable()).toBe(1);

  rerender({ value: 2 });

  expect(stable).toBe(result.current);
  expect(stable()).toBe(2);
});
