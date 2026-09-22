import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { useEventListener } from './useEventListener';

test('useEventListener', () => {
  const listener = vi.fn();

  const element = document.createElement('button');

  const { unmount } = renderHook(() =>
    useEventListener(element, 'click', listener),
  );

  element.dispatchEvent(new Event('click'));
  expect(listener).toHaveBeenCalledTimes(1);

  element.dispatchEvent(new Event('click'));
  expect(listener).toHaveBeenCalledTimes(2);

  unmount();

  element.dispatchEvent(new Event('click'));
  expect(listener).toHaveBeenCalledTimes(2);
});

test('useEventListener ref', () => {
  const listener = vi.fn();

  const element = document.createElement('button');

  renderHook(() => useEventListener({ current: element }, 'click', listener));

  element.dispatchEvent(new Event('click'));
  expect(listener).toHaveBeenCalledTimes(1);
});

test('useEventListener disabled', () => {
  const listener = vi.fn();

  const element = document.createElement('button');

  const { rerender } = renderHook(
    ({ isDisabled }) =>
      useEventListener(element, 'click', listener, undefined, { isDisabled }),
    { initialProps: { isDisabled: true } },
  );

  element.dispatchEvent(new Event('click'));
  expect(listener).not.toHaveBeenCalled();

  rerender({ isDisabled: false });

  element.dispatchEvent(new Event('click'));
  expect(listener).toHaveBeenCalledTimes(1);
});

test('useEventListener getIsDisabled', () => {
  const listener = vi.fn();

  const element = document.createElement('button');

  const { rerender } = renderHook(
    ({ isDisabled }) =>
      useEventListener(element, 'click', listener, undefined, {
        getIsDisabled: () => isDisabled,
      }),
    { initialProps: { isDisabled: true } },
  );

  element.dispatchEvent(new Event('click'));
  expect(listener).not.toHaveBeenCalled();

  rerender({ isDisabled: false });

  element.dispatchEvent(new Event('click'));
  expect(listener).toHaveBeenCalledTimes(1);
});
