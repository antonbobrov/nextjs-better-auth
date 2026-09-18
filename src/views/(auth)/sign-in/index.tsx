'use client';

import { useState, type FC } from 'react';

import { Person } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { SignInForm } from '@/features/(auth)/sign-in-form';
import { useEvent } from '@/hooks';
import { Link, useRouter } from '@/i18n/navigation';
import { SIGN_UP } from '@/shared/config/auth';
import { ROUTES } from '@/shared/config/routes';
import { Card } from '@/ui/layout/card';

import type { IProps } from './types';

export const SignIn: FC<IProps> = ({ email = '' }) => {
  const t = useTranslations('auth.signIn');
  const tCommon = useTranslations('auth.common');
  const tSignUp = useTranslations('auth.signUp');
  const router = useRouter();

  const [liveEmail, setLiveEmail] = useState(email);

  const handleEmailChange = useEvent((next: string) => {
    setLiveEmail(next);
  });

  const handleRequireTwoFactor = useEvent(() => {
    router.push(ROUTES.auth.twoFactor);
  });

  const handleSuccess = useEvent(() => {
    router.push(ROUTES.app);
    router.refresh();
  });

  const handleSelfUnsuspend = useEvent((nextEmail: string) => {
    router.push(ROUTES.auth.selfUnsuspend(nextEmail));
  });

  const handleVerifyEmail = useEvent(() => {
    router.push(ROUTES.auth.sendVerifyEmail(liveEmail));
  });

  const signUpHref = ROUTES.auth.signUp(liveEmail);

  return (
    <Card
      description={
        SIGN_UP.enabled && (
          <>
            <span>{t('noAccount')}&nbsp;</span>

            <Link
              className="text-nowrap underline underline-offset-4"
              href={signUpHref}
            >
              {tSignUp('title')}
            </Link>
          </>
        )
      }
      icon={Person}
      title={tCommon('signIn')}
    >
      <SignInForm
        email={email}
        onEmailChange={handleEmailChange}
        onRequireTwoFactor={handleRequireTwoFactor}
        onSelfUnsuspend={handleSelfUnsuspend}
        onSuccess={handleSuccess}
        onVerifyEmail={handleVerifyEmail}
      />
    </Card>
  );
};
