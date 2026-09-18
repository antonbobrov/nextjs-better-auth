'use client';

import { type FC, type PropsWithChildren } from 'react';

import { useSession } from '@/shared/providers/session/hooks';

import { Header } from '../ui/header';
import { MobileMenu } from '../ui/mobile-menu';
import { AppSidebar } from '../ui/sidebar';

export const AppChrome: FC<PropsWithChildren> = ({ children }) => {
  const { session, user } = useSession();

  return (
    <div className="flex h-auto md:h-svh">
      <Header className="md:hidden" user={user} />

      {user && (
        <>
          <MobileMenu className="md:hidden" session={session} user={user} />

          <AppSidebar className="max-md:hidden" session={session} user={user} />
        </>
      )}

      {children}
    </div>
  );
};
