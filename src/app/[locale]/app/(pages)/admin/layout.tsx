import type { FC, PropsWithChildren } from 'react';

import { headers } from 'next/headers';

import { redirect } from '@/i18n/redirect';
import { AdminLayout } from '@/layout/(app)/admin';
import { authServer } from '@/lib/auth/server';
import { ROUTES } from '@/shared/config/routes';
import { isAdminRole } from '@/utils';

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await authServer.api.getSession({
    headers: await headers(),
  });

  if (!isAdminRole(session?.user.role)) {
    await redirect(ROUTES.app);
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default Layout;
