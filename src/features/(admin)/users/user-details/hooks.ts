import { useQuery } from '@tanstack/react-query';

import { authClient } from '@/lib/auth/client';
import type { TUser } from '@/lib/auth/types';

import { adminUsersQueryKey } from '../users/constants';

const adminUserQueryKey = (id: string) => [...adminUsersQueryKey, id] as const;

async function fetchAdminUser(id: string) {
  const { data, error } = await authClient.admin.listUsers({
    query: {
      filterField: 'id',
      filterOperator: 'eq',
      filterValue: id,
      limit: 1,
    },
  });

  const user = data?.users[0];

  if (!user) {
    throw error ?? new Error();
  }

  return user as TUser;
}

export function useAdminUser(id: string) {
  const { data, isError, isLoading } = useQuery({
    queryFn: () => fetchAdminUser(id),
    queryKey: adminUserQueryKey(id),
    refetchOnWindowFocus: false,
  });

  return {
    isError,
    isLoading,
    user: data ?? null,
  };
}
