import { UAParser } from 'ua-parser-js';

export type TParsedUserAgent = {
  browser: string | null;
  os: string | null;
};

const EMPTY: TParsedUserAgent = {
  browser: null,
  os: null,
};

export function parseUserAgent(
  userAgent: string | null | undefined,
): TParsedUserAgent {
  if (!userAgent) {
    return EMPTY;
  }

  try {
    const { browser, os } = UAParser(userAgent);
    const browserName = browser.name || null;
    const osName = os.name || null;

    if (!browserName && !osName) {
      return EMPTY;
    }

    return {
      browser: browserName,
      os: osName,
    };
  } catch {
    return EMPTY;
  }
}
