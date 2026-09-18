import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { showApiErrorToast, toast } from '@/ui/feedback/toast';

import { adminUserSessionsQueryKey } from '../user-sessions/hooks';

export function useRevokeUserSessions(userId: string) {
  const client = useQueryClient();

  const t = useTranslations('admin.sessions');

  const { isPending, run: revoke } = usePendingAction(
    async () => {
      const { error } = await authClient.admin.revokeUserSessions({ userId });

      if (error) {
        throw new Error(error.message);
      }

      toast.success(t('success.allRevoked'));
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
