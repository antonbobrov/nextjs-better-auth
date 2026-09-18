import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { showApiErrorToast } from '@/ui/feedback/toast';

export function useStopImpersonating() {
  const { isPending, run: stop } = usePendingAction(
    async () => {
      const { error } = await authClient.admin.stopImpersonating();

      if (error) {
        throw new Error(error.message);
      }

      window.location.reload();

      return true;
    },
    { onError: showApiErrorToast },
  );

  return { isPending, stop };
}
