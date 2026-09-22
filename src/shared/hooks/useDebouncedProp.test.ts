import { renderHook, act } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { useDebouncedProp } from './useDebouncedProp';

test('useDebouncedProp', () => {
  vi.useFakeTimers();

  const { rerender, result } = renderHook(
    ({ prop }) => useDebouncedProp(prop, 10),
    {
      initialProps: { prop: true },
    },
  );

  rerender({ prop: false });
  rerender({ prop: true });

  expect(result.current).toBe(true);

  rerender({ prop: false });

  expect(result.current).toBe(true);

  act(() => {
    vi.advanceTimersByTime(10);
  });

  expect(result.current).toBe(false);

  vi.useRealTimers();
});
