import { runApi } from '@/lib/api/runApi';
import { usePendingAction } from '@/lib/api/usePendingAction';

export function useConfirmSelfUnsuspend(token: string, onSuccess: () => void) {
  const { errorMessage, isPending, run } = usePendingAction(
    async () => {
      const result = await runApi({
        body: { token },
        method: 'POST',
        url: '/api/account/self-unsuspend/confirm',
      });

      if (result.ok) {
        onSuccess();

        return true;
      }

      throw result;
    },
    { resetOnSuccess: false },
  );

  return { confirmSelfUnsuspend: run, errorMessage, isPending };
}
