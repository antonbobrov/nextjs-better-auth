import { useQuery } from '@tanstack/react-query';

import { useEvent } from '@/hooks';
import { runApi } from '@/lib/api/runApi';
import type { TUser } from '@/lib/auth/types';

import { adminUsersQueryKey } from './constants';

import type { IParams, TApiAdminUsersList } from './types';

const EMPTY_USERS: TUser[] = [];

const adminUsersListQueryKey = (params: IParams) =>
  [...adminUsersQueryKey, 'list', params] as const;

function toSearchParams(params: IParams) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === '') {
      continue;
    }

    searchParams.set(key, String(value));
  }

  return searchParams.toString();
}

export function useAdminUsers(params: IParams) {
  const { data, isError, isFetching, isLoading, refetch } =
    useQuery<TApiAdminUsersList>({
      placeholderData: (previousData) => previousData,
      queryFn: async ({ signal }) => {
        const query = toSearchParams(params);
        const result = await runApi<TApiAdminUsersList>({
          method: 'GET',
          signal,
          url: query ? `/api/admin/users?${query}` : '/api/admin/users',
        });

        if (!result.ok || !result.data) {
          throw result;
        }

        return result.data;
      },
      queryKey: adminUsersListQueryKey(params),
      refetchOnWindowFocus: false,
    });

  const refresh = useEvent(() => refetch());

  return {
    isError,
    isFetching,
    isLoading,
    refresh,
    total: data?.total ?? 0,
    users: data?.users ?? EMPTY_USERS,
  };
}
