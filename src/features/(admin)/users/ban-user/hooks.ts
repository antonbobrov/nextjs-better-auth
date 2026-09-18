import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { showApiErrorToast, toast } from '@/ui/feedback/toast';

import { adminUsersQueryKey } from '../users/constants';

export function useBanUser(userId: string) {
  const client = useQueryClient();

  const t = useTranslations('admin.danger.ban');

  const { isPending, run: ban } = usePendingAction(
    async (banReason: string, banExpiresIn?: number) => {
      const { error } = await authClient.admin.banUser({
        banReason,
        userId,
        ...(banExpiresIn ? { banExpiresIn } : {}),
      });

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

  return { ban, isPending };
}
