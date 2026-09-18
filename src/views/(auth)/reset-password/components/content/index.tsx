'use client';

import { type FC } from 'react';

import { LockOpen } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { ResetPasswordForm } from '@/features/(auth)/reset-password-form';
import { Card } from '@/ui/layout/card';

import type { IProps } from './types';

export const ResetPasswordContent: FC<IProps> = ({ token, onSuccess }) => {
  const t = useTranslations('auth.reset');

  return (
    <Card description={t('description')} icon={LockOpen} title={t('title')}>
      <ResetPasswordForm token={token} onSuccess={onSuccess} />
    </Card>
  );
};
