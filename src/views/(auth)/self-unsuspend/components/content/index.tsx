'use client';

import { type FC } from 'react';

import { BanDashed } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { SelfUnsuspendForm } from '@/features/(auth)/self-unsuspend-form';
import { Card } from '@/ui/layout/card';

import type { IProps } from './types';

export const SelfUnsuspendContent: FC<IProps> = ({ email, onSuccess }) => {
  const t = useTranslations('auth.unsuspend');

  return (
    <Card
      description={t('request.description')}
      icon={BanDashed}
      title={t('title')}
    >
      <SelfUnsuspendForm email={email} onSuccess={onSuccess} />
    </Card>
  );
};
