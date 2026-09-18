import { useMemo } from 'react';

import { parseUserAgent } from '@/utils';

export function useParseUserAgent(userAgent: string | null | undefined) {
  return useMemo(() => parseUserAgent(userAgent), [userAgent]);
}
