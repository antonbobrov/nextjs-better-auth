'use client';

import { type FC } from 'react';

import { Lock } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { ForgotPasswordForm } from '@/features/(auth)/forgot-password-form';
import { Card } from '@/ui/layout/card';

import type { IProps } from './types';

export const ForgotPasswordContent: FC<IProps> = ({ email, onSuccess }) => {
  const t = useTranslations('auth.forgot');

  return (
    <Card description={t('description')} icon={Lock} title={t('title')}>
      <ForgotPasswordForm email={email} onSuccess={onSuccess} />
    </Card>
  );
};
