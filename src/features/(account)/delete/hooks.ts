import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { showApiErrorToast } from '@/ui/feedback/toast';

export function useDeleteAccount(onSuccess?: () => void) {
  const { isPending, run: remove } = usePendingAction(
    async (password: string) => {
      const { error } = await authClient.deleteUser({ password });

      if (error) {
        throw new Error(error.message);
      }

      onSuccess?.();

      return true;
    },
    {
      resetOnSuccess: false,
      onError: showApiErrorToast,
    },
  );

  return { isPending, remove };
}
