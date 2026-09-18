'use client';

import { useState, type FC } from 'react';

import { Envelope } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { VerifyEmailForm } from '@/features/(auth)/verify-email-form';
import { useEvent } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { EMAIL_VERIFICATION } from '@/shared/config/auth';
import { ROUTES } from '@/shared/config/routes';
import { Card } from '@/ui/layout/card';

import { VerifyEmailSuccess } from './success';

import type { IProps } from './types';

export const VerifyEmail: FC<IProps> = ({ token }) => {
  const t = useTranslations('auth.verify');

  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const handleSuccess = useEvent(() => {
    if (EMAIL_VERIFICATION.autoSignIn) {
      router.push(ROUTES.app);
      router.refresh();
    } else {
      setIsSuccess(true);
    }
  });

  if (isSuccess) {
    return <VerifyEmailSuccess />;
  }

  return (
    <Card description={t('description')} icon={Envelope} title={t('title')}>
      <VerifyEmailForm token={token} onSuccess={handleSuccess} />
    </Card>
  );
};
