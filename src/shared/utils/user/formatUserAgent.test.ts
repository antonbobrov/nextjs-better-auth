import { expect, test } from 'vitest';

import { formatUserAgentDevice } from './formatUserAgent';

test('formatUserAgentDevice', () => {
  expect(formatUserAgentDevice(null)).toBe('unknown');
  expect(formatUserAgentDevice(undefined)).toBe('unknown');
  expect(formatUserAgentDevice('invalid_string')).toBe('unknown');
  expect(formatUserAgentDevice('invalid_string', 'custom agent')).toBe(
    'custom agent',
  );

  expect(
    formatUserAgentDevice(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',
    ),
  ).toBe('Chrome on Windows');

  expect(
    formatUserAgentDevice(
      'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Edg/153.0.0.0 Mobile Safari/537.36',
    ),
  ).toBe('Edge on Android');

  expect(
    formatUserAgentDevice(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:155.0) Gecko/20100101 Firefox/155.0',
    ),
  ).toBe('Firefox on Windows');

  expect(formatUserAgentDevice('Chrome/120.0.0.0')).toBe('Chrome');

  expect(formatUserAgentDevice('(Windows NT 10.0; Win64; x64)')).toBe(
    'Windows',
  );
});
