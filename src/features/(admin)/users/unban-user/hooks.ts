import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { showApiErrorToast, toast } from '@/ui/feedback/toast';

import { adminUsersQueryKey } from '../users/constants';

export function useUnbanUser(userId: string) {
  const client = useQueryClient();

  const t = useTranslations('admin.danger.unban');

  const { isPending, run: unban } = usePendingAction(
    async () => {
      const { error } = await authClient.admin.unbanUser({ userId });

      if (error) {
        throw new Error(error.message);
      }

      toast.success(t('success'));
      client.invalidateQueries({ queryKey: adminUsersQueryKey });

      return true;
    },
    {
      resetOnSuccess: false,
      onError: showApiErrorToast,
    },
  );

  return { isPending, unban };
}
