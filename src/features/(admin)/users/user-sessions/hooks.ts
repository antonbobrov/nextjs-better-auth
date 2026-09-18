import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useEvent } from '@/hooks';
import { authClient } from '@/lib/auth/client';
import type { TSession } from '@/lib/auth/types';
import { sortByDate } from '@/utils';

export const adminUserSessionsQueryKey = (userId: string) =>
  ['admin', 'users', userId, 'sessions'] as const;

async function fetchAdminUserSessions(userId: string) {
  const { data, error } = await authClient.admin.listUserSessions({ userId });

  const sessions = Array.isArray(data) ? data : data?.sessions;

  if (!Array.isArray(sessions)) {
    throw error ?? new Error();
  }

  return sessions as TSession[];
}

export function useAdminUserSessions(userId: string) {
  const {
    data: rawData,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => fetchAdminUserSessions(userId),
    queryKey: adminUserSessionsQueryKey(userId),
    refetchOnWindowFocus: false,
  });

  const data = useMemo(
    () =>
      rawData ? sortByDate(rawData, (item) => item.updatedAt, 'desc') : null,
    [rawData],
  );

  const refresh = useEvent(() => refetch());

  return {
    data,
    isError,
    isFetching,
    isLoading,
    refresh,
  };
}
