'use client';

import { useState, type FC } from 'react';

import { Envelope } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { SendVerifyEmailForm } from '@/features/(auth)/send-verify-email-form';
import { useEvent } from '@/hooks';
import { Card } from '@/ui/layout/card';

import { SendVerifyEmailSuccess } from './success';

import type { IProps } from './types';

export const SendVerifyEmail: FC<IProps> = ({ email: initialEmail }) => {
  const t = useTranslations('auth.sendVerify');

  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSuccess = useEvent((inputEmail: string) => {
    setEmail(inputEmail);
    setIsSuccess(true);
  });

  if (isSuccess) {
    return <SendVerifyEmailSuccess email={email} />;
  }

  return (
    <Card description={t('description')} icon={Envelope} title={t('title')}>
      <SendVerifyEmailForm email={initialEmail} onSuccess={handleSuccess} />
    </Card>
  );
};
