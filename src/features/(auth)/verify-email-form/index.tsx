'use client';

import { type FC } from 'react';

import { Envelope } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { ErrorMessage } from '@/ui/feedback/error-message';
import { Button } from '@/ui/primitives/button';

import type { IProps } from './types';

export const VerifyEmailForm: FC<IProps> = ({ token, onSuccess }) => {
  const t = useTranslations('auth.verify');

  const {
    errorMessage,
    isPending,
    run: onVerify,
  } = usePendingAction(
    async () => {
      const { error } = await authClient.verifyEmail({
        query: { token },
      });

      if (error) {
        throw new Error(error.message);
      }

      onSuccess();
    },
    { resetOnSuccess: false },
  );

  return (
    <div className="grid gap-3">
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Button
        className="w-full"
        type="button"
        icon={Envelope}
        isPending={isPending}
        onPress={onVerify}
      >
        {t('title')}
      </Button>
    </div>
  );
};
