import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useEvent } from '@/hooks';
import { authClient } from '@/lib/auth/client';
import type { TSession } from '@/lib/auth/types';
import { useSession } from '@/shared/providers/session/hooks';
import { sortByDate } from '@/utils';

export const accountSessionsQueryKey = ['account', 'sessions'] as const;

const EMPTY_SESSIONS: TSession[] = [];

async function fetchAccountSessions() {
  const { data, error } = await authClient.listSessions();

  if (!Array.isArray(data)) {
    throw error ?? new Error();
  }

  return data as TSession[];
}

export function useAccountSessions() {
  const { session: current } = useSession();

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryFn: fetchAccountSessions,
    queryKey: accountSessionsQueryKey,
    refetchOnWindowFocus: false,
  });

  const other = useMemo(() => {
    if (!data) {
      return EMPTY_SESSIONS;
    }

    const others = data.filter((item) => item.token !== current?.token);

    return sortByDate(others, (item) => item.updatedAt);
  }, [current, data]);

  const refresh = useEvent(() => refetch());

  return {
    current,
    isError,
    isFetching,
    isLoading,
    other,
    refresh,
  };
}
