import { renderHook, act } from '@testing-library/react';
import { expect, test } from 'vitest';

import { usePropState } from './usePropState';

test('usePropState', () => {
  const { rerender, result } = renderHook(({ prop }) => usePropState(prop), {
    initialProps: { prop: true },
  });

  expect(result.current[0]).toBe(true);
  act(() => result.current[1](false));
  expect(result.current[0]).toBe(false);
  act(() => result.current[1](true));
  expect(result.current[0]).toBe(true);

  rerender({ prop: false });
  expect(result.current[0]).toBe(false);
});
