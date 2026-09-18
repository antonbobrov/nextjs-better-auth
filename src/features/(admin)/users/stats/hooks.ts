import { useQuery } from '@tanstack/react-query';

import { useEvent } from '@/hooks';
import { runApi } from '@/lib/api/runApi';

import { adminUsersStatsQueryKey } from './constants';

import type { IAdminUsersStats, TApiAdminUsersStats } from './types';

const EMPTY_STATS: IAdminUsersStats = {
  activeSessions: 0,
  bannedUsers: 0,
  newUsersDay: 0,
  newUsersMonth: 0,
  newUsersWeek: 0,
  selfSuspendedUsers: 0,
  twoFactorUsers: 0,
  users: 0,
  verifiedUsers: 0,
};

export function useAdminUsersStats() {
  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryFn: async ({ signal }) => {
      const result = await runApi<TApiAdminUsersStats>({
        method: 'GET',
        signal,
        url: '/api/admin/users/stats',
      });

      if (!result.ok || !result.data) {
        throw result;
      }

      return result.data.stats;
    },
    queryKey: adminUsersStatsQueryKey,
    refetchOnWindowFocus: false,
  });

  const refresh = useEvent(() => refetch());

  return {
    isError,
    isFetching,
    isLoading,
    refresh,
    stats: data ?? EMPTY_STATS,
  };
}
