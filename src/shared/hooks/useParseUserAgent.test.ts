import { renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';

import { useParseUserAgent } from './useParseUserAgent';

const CHROME_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36';

test('useParseUserAgent', () => {
  const { rerender, result } = renderHook(
    ({ userAgent }) => useParseUserAgent(userAgent),
    { initialProps: { userAgent: null as string | null | undefined } },
  );

  expect(result.current).toEqual({ browser: null, os: null });

  rerender({ userAgent: CHROME_UA });
  expect(result.current).toEqual({ browser: 'Chrome', os: 'Windows' });

  const parsed = result.current;
  rerender({ userAgent: CHROME_UA });
  expect(result.current).toBe(parsed);

  rerender({ userAgent: undefined });
  expect(result.current).toEqual({ browser: null, os: null });
});
