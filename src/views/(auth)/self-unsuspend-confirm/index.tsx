'use client';

import { useState, type FC } from 'react';

import { BanDashed } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { SelfUnsuspendConfirmForm } from '@/features/(auth)/self-unsuspend-confirm-form';
import { useEvent } from '@/hooks';
import { Card } from '@/ui/layout/card';

import { SelfUnsuspendConfirmSuccess } from './success';

import type { IProps } from './types';

export const SelfUnsuspendConfirm: FC<IProps> = ({ token }) => {
  const t = useTranslations('auth.unsuspend');

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = useEvent(() => setIsSuccess(true));

  if (isSuccess) {
    return <SelfUnsuspendConfirmSuccess />;
  }

  return (
    <Card
      description={t('confirm.description')}
      icon={BanDashed}
      title={t('title')}
    >
      <SelfUnsuspendConfirmForm token={token} onSuccess={handleSuccess} />
    </Card>
  );
};
