'use client';

import { type FC } from 'react';

import { ArrowRightFromSquare, Envelope } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { Card } from '@/ui/layout/card';
import { Button } from '@/ui/primitives/button';

import type { IProps } from './types';

export const SendVerifyEmailSuccess: FC<IProps> = ({ email }) => {
  const tCommon = useTranslations('auth.common');

  const router = useRouter();

  const goToSignIn = useEvent(() => {
    router.push(ROUTES.auth.signIn(email));
  });

  return (
    <Card
      description={
        <>
          <span>{tCommon('sentVerification')} </span>

          {email ? (
            <span className="font-medium text-foreground">{email}</span>
          ) : (
            <span>{tCommon('yourEmail')}</span>
          )}
        </>
      }
      icon={Envelope}
      title={tCommon('checkEmail')}
    >
      <Button
        className="w-full"
        icon={ArrowRightFromSquare}
        onPress={goToSignIn}
      >
        {tCommon('signIn')}
      </Button>
    </Card>
  );
};
