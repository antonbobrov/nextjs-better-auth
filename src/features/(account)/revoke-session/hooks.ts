import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { showApiErrorToast, toast } from '@/ui/feedback/toast';

import { accountSessionsQueryKey } from '../sessions/hooks';

export function useRevokeSession(token: string) {
  const t = useTranslations('account.success');

  const client = useQueryClient();

  const { isPending, run: revoke } = usePendingAction(
    async () => {
      const { error } = await authClient.revokeSession({ token });

      if (error) {
        throw new Error(error.message);
      }

      toast.success(t('sessionRevoked'));
      client.invalidateQueries({ queryKey: accountSessionsQueryKey });

      return true;
    },
    { onError: showApiErrorToast },
  );

  return { isPending, revoke };
}
