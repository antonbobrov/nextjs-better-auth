import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { showApiErrorToast } from '@/ui/feedback/toast';

export function useSignOut(onSuccess?: () => void) {
  const { isPending, run: signOut } = usePendingAction(
    async () => {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message);
      }

      onSuccess?.();

      return true;
    },
    { onError: showApiErrorToast },
  );

  return { isPending, signOut };
}
