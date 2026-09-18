'use client';

import { type FC } from 'react';

import { ArrowRightFromSquare, CircleCheck } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { Card } from '@/ui/layout/card';
import { Button } from '@/ui/primitives/button';

export const VerifyEmailSuccess: FC = () => {
  const t = useTranslations('auth.verify');
  const tCommon = useTranslations('auth.common');

  const router = useRouter();

  const goToSignIn = useEvent(() => router.push(ROUTES.auth.signIn()));

  return (
    <Card
      description={t('success.description')}
      icon={CircleCheck}
      title={t('success.title')}
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
