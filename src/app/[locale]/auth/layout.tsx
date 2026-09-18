import type { FC, PropsWithChildren } from 'react';

import { headers } from 'next/headers';

import { redirect } from '@/i18n/redirect';
import { AuthLayout } from '@/layout/(auth)';
import { authServer } from '@/lib/auth/server';
import { ROUTES } from '@/shared/config/routes';

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await authServer.api.getSession({
    headers: await headers(),
  });

  if (session) {
    await redirect(ROUTES.app);

    return;
  }

  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
