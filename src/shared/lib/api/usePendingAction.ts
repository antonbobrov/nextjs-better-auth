import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';
import type { TErrorParams } from '@/types/Error';
import type { IApiErrorToastPayload } from '@/ui/feedback/toast/show-api-error-toast';

import { parseErrorCode, parseErrorMessage, parseErrorParams } from './utils';

interface IOptions {
  onError?: (payload: IApiErrorToastPayload) => void;
  resetOnSuccess?: boolean;
}

export function usePendingAction<TArgs extends unknown[], TResult>(
  action: (...args: TArgs) => Promise<TResult>,
  { resetOnSuccess = true, onError }: IOptions = { resetOnSuccess: true },
) {
  const translations = useTranslations('errors');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [errorParams, setErrorParams] = useState<TErrorParams | null>(null);
  const [isPending, setIsPending] = useState(false);

  const run = useEvent(async (...args: TArgs): Promise<TResult | false> => {
    setErrorMessage(null);
    setErrorCode(null);
    setErrorParams(null);
    setIsPending(true);

    try {
      const result = await action(...args);

      if (resetOnSuccess) {
        setIsPending(false);
      }

      return result;
    } catch (error) {
      const code = parseErrorCode(error);
      const params = parseErrorParams(error);
      const message = parseErrorMessage({ code, error, params, translations });

      setErrorMessage(message);
      setErrorCode(code);
      setErrorParams(params);
      setIsPending(false);

      onError?.({ code, message, params });

      return false;
    }
  });

  return { errorCode, errorMessage, errorParams, isPending, run };
}
