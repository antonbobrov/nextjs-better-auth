'use client';

import { isBrowser } from '@/utils';

if (isBrowser) {
  window.history.scrollRestoration = 'manual';
}
