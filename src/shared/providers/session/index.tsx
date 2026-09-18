'use client';

import { useEffect, useMemo, type FC } from 'react';

import { useRouter } from '@/i18n/navigation';
import { authClient } from '@/lib/auth/client';

import { SessionProviderContext } from './context';

import type { IProps, TSessionProviderContext } from './types';

export const SessionProvider: FC<IProps> = ({ children, session, user }) => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  const value = useMemo<TSessionProviderContext>(
    () =>
      isPending
        ? { session, user }
        : { session: data?.session ?? null, user: data?.user ?? null },
    [data, isPending, session, user],
  );

  useEffect(() => {
    if (isPending || value.session) {
      return;
    }

    router.refresh();
  }, [isPending, router, value.session]);

  if (!isPending && !value.session) {
    return null;
  }

  return (
    <SessionProviderContext value={value}>{children}</SessionProviderContext>
  );
};
