import type { FC, PropsWithChildren } from 'react';

import { cookies, headers } from 'next/headers';

import { redirect } from '@/i18n/redirect';
import { AppChrome } from '@/layout/(app)/chrome';
import { LayoutProvider } from '@/layout/(app)/provider';
import { authServer } from '@/lib/auth/server';
import { SessionProvider } from '@/providers';
import { SIDEBAR_EXPANDED_COOKIE } from '@/shared/config/layout';
import { ROUTES } from '@/shared/config/routes';

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const cookieStore = await cookies();

  const session = await authServer.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    await redirect(ROUTES.auth.signIn());

    return;
  }

  const isSidebarExpanded =
    (cookieStore.get(SIDEBAR_EXPANDED_COOKIE)?.value ?? '1') === '1';

  return (
    <SessionProvider session={session.session} user={session.user}>
      <LayoutProvider isSidebarExpanded={isSidebarExpanded}>
        <AppChrome>{children}</AppChrome>
      </LayoutProvider>
    </SessionProvider>
  );
};

export default Layout;
