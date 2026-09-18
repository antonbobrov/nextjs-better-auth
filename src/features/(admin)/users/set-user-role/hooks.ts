import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import type { TUserRole } from '@/shared/config/user';
import { showApiErrorToast, toast } from '@/ui/feedback/toast';

import { adminUsersQueryKey } from '../users/constants';

export function useSetUserRole(userId: string) {
  const client = useQueryClient();

  const t = useTranslations('admin.role');

  const { isPending, run: setRole } = usePendingAction(
    async (role: TUserRole) => {
      const { error } = await authClient.admin.setRole({
        role,
        userId,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success(t('success'));
      client.invalidateQueries({ queryKey: adminUsersQueryKey });

      return true;
    },
    { onError: showApiErrorToast },
  );

  return { isPending, setRole };
}
