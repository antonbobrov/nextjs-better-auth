import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { showApiErrorToast, toast } from '@/ui/feedback/toast';

import { adminUserSessionsQueryKey } from '../user-sessions/hooks';

export function useRevokeUserSession(userId: string, token: string) {
  const client = useQueryClient();

  const t = useTranslations('account.success');

  const { isPending, run: revoke } = usePendingAction(
    async () => {
      const { error } = await authClient.admin.revokeUserSession({
        sessionToken: token,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success(t('sessionRevoked'));
      client.invalidateQueries({ queryKey: adminUserSessionsQueryKey(userId) });

      return true;
    },
    {
      resetOnSuccess: false,
      onError: showApiErrorToast,
    },
  );

  return { isPending, revoke };
}
