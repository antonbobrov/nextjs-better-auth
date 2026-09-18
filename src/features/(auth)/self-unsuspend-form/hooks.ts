import { runApi } from '@/lib/api/runApi';
import { usePendingAction } from '@/lib/api/usePendingAction';

export function useRequestSelfUnsuspend(onSuccess: (email: string) => void) {
  const { errorMessage, isPending, run } = usePendingAction(
    async (email: string) => {
      const result = await runApi({
        body: { email },
        method: 'POST',
        url: '/api/account/self-unsuspend',
      });

      if (result.ok) {
        onSuccess(email);

        return true;
      }

      throw result;
    },
    { resetOnSuccess: false },
  );

  return { errorMessage, isPending, requestSelfUnsuspend: run };
}
