import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { showApiErrorToast, toast } from '@/ui/feedback/toast';

import { adminUserSessionsQueryKey } from '../user-sessions/hooks';

export function useSetUserPassword(userId: string) {
  const client = useQueryClient();

  const t = useTranslations('account.success');

  const { isPending, run: setPassword } = usePendingAction(
    async (newPassword: string) => {
      const { error } = await authClient.admin.setUserPassword({
        newPassword,
        userId,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success(t('passwordUpdated'));
      client.invalidateQueries({ queryKey: adminUserSessionsQueryKey(userId) });

      return true;
    },
    { onError: showApiErrorToast },
  );

  return { isPending, setPassword };
}
