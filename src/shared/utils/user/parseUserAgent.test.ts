import { UAParser } from 'ua-parser-js';
import { expect, test, vi } from 'vitest';

import { parseUserAgent } from './parseUserAgent';

vi.mock('ua-parser-js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('ua-parser-js')>();

  return {
    ...actual,
    UAParser: vi.fn(actual.UAParser),
  };
});

test('parseUserAgent', () => {
  expect(parseUserAgent(null)).toEqual({ browser: null, os: null });
  expect(parseUserAgent(undefined)).toEqual({ browser: null, os: null });
  expect(parseUserAgent('invalid_string')).toEqual({ browser: null, os: null });

  expect(
    parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',
    ),
  ).toEqual({ browser: 'Chrome', os: 'Windows' });

  expect(
    parseUserAgent(
      'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Edg/153.0.0.0 Mobile Safari/537.36',
    ),
  ).toEqual({ browser: 'Edge', os: 'Android' });

  expect(
    parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:155.0) Gecko/20100101 Firefox/155.0',
    ),
  ).toEqual({ browser: 'Firefox', os: 'Windows' });

  vi.mocked(UAParser).mockImplementationOnce(() => {
    throw new Error('parse failed');
  });

  expect(parseUserAgent('Mozilla/5.0')).toEqual({ browser: null, os: null });
});
