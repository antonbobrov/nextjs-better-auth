import { useQueryClient } from '@tanstack/react-query';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { SIGN_UP } from '@/shared/config/auth';
import { showApiErrorToast } from '@/ui/feedback/toast';

import { adminUsersQueryKey } from '../users/constants';

import type { schema } from './schema';
import type z from 'zod';

type TCreateUserData = z.infer<typeof schema>;

export function useCreateUser(onSuccess?: (userId?: string) => void) {
  const client = useQueryClient();

  const { isPending, run: createUser } = usePendingAction(
    async (data: TCreateUserData) => {
      const { data: result, error } = await authClient.admin.createUser({
        role: data.role,
        data: {
          emailVerified: SIGN_UP.requireVerification,
        },
        email: data.email,
        name: data.name,
        password: data.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      client.invalidateQueries({ queryKey: adminUsersQueryKey });

      onSuccess?.(result?.user.id);

      return true;
    },
    {
      resetOnSuccess: false,
      onError: showApiErrorToast,
    },
  );

  return { createUser, isPending };
}
