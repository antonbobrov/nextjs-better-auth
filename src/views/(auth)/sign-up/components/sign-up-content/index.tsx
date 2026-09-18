'use client';

import { useState, type FC } from 'react';

import { PersonPlus } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { SignUpForm } from '@/features/(auth)/sign-up-form';
import { useEvent } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { Card } from '@/ui/layout/card';

import type { IProps } from './types';

export const SignUpContent: FC<IProps> = ({ email = '', onSuccess }) => {
  const t = useTranslations('auth.signUp');
  const tCommon = useTranslations('auth.common');

  const [liveEmail, setLiveEmail] = useState(email);

  const handleEmailChange = useEvent((next: string) => {
    setLiveEmail(next);
  });

  const signInHref = ROUTES.auth.signIn(liveEmail);

  return (
    <Card
      description={
        <>
          <span>{t('hasAccount')}&nbsp;</span>

          <Link
            className="text-nowrap underline underline-offset-4"
            href={signInHref}
          >
            {tCommon('signIn')}
          </Link>
        </>
      }
      icon={PersonPlus}
      title={t('title')}
    >
      <SignUpForm
        email={email}
        onEmailChange={handleEmailChange}
        onSuccess={onSuccess}
      />
    </Card>
  );
};
