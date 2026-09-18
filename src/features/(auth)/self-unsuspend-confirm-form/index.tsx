'use client';

import { type FC } from 'react';

import { BanDashed } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { ErrorMessage } from '@/ui/feedback/error-message';
import { Button } from '@/ui/primitives/button';

import { useConfirmSelfUnsuspend } from './hooks';

import type { IProps } from './types';

export const SelfUnsuspendConfirmForm: FC<IProps> = ({ token, onSuccess }) => {
  const t = useTranslations('auth.unsuspend');

  const { confirmSelfUnsuspend, errorMessage, isPending } =
    useConfirmSelfUnsuspend(token, onSuccess);

  return (
    <div className="grid gap-3">
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Button
        className="w-full"
        icon={BanDashed}
        isPending={isPending}
        variant="danger"
        onPress={confirmSelfUnsuspend}
      >
        {t('title')}
      </Button>
    </div>
  );
};
