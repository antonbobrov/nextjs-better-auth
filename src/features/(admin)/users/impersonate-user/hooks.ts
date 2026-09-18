import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { showApiErrorToast } from '@/ui/feedback/toast';

export function useImpersonateUser(userId: string) {
  const { isPending, run: impersonate } = usePendingAction(
    async () => {
      const { error } = await authClient.admin.impersonateUser({ userId });

      if (error) {
        throw new Error(error.message);
      }

      window.location.reload();

      return true;
    },
    {
      resetOnSuccess: false,
      onError: showApiErrorToast,
    },
  );

  return { impersonate, isPending };
}
