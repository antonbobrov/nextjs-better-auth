import { runApi } from '@/lib/api/runApi';
import { usePendingAction } from '@/lib/api/usePendingAction';
import { showApiErrorToast } from '@/ui/feedback/toast';

export function useSelfSuspendAccount(onSuccess?: () => void) {
  const { isPending, run: suspend } = usePendingAction(
    async (password: string) => {
      const result = await runApi({
        body: { password },
        method: 'POST',
        url: '/api/account/self-suspend',
      });

      if (result.ok) {
        onSuccess?.();

        return true;
      }

      throw result;
    },
    {
      resetOnSuccess: false,
      onError: showApiErrorToast,
    },
  );

  return { isPending, suspend };
}
