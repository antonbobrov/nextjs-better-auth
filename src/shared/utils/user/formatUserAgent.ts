import { parseUserAgent } from './parseUserAgent';

export function formatUserAgentDevice(
  userAgent: string | null | undefined,
  fallback = 'unknown',
) {
  const { browser, os } = parseUserAgent(userAgent);
  const parts = [browser, os].filter(Boolean);

  if (parts.length === 0) {
    return fallback;
  }

  return parts.join(' on ');
}
