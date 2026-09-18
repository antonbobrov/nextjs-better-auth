import { i18nClient } from '@better-auth/i18n/client';
import {
  adminClient,
  inferAdditionalFields,
  twoFactorClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { isUndefined } from '@/utils';

import type { authServer } from './server';

export const authClient = createAuthClient({
  fetchOptions: {
    onRequest: (ctx) => {
      if (isUndefined(document)) {
        return;
      }

      const locale = document.documentElement.lang;

      if (!locale) {
        return;
      }

      const headers = new Headers(ctx.headers);
      headers.set('Accept-Language', locale);
      ctx.headers = headers;
    },
  },
  plugins: [
    adminClient(),
    inferAdditionalFields<typeof authServer>(),
    i18nClient(),
    twoFactorClient(),
  ],
});
