'use client';

import { type FC } from 'react';

import { Smartphone } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { TwoFactorForm } from '@/features/(auth)/two-factor-form';
import { useEvent } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { Card } from '@/ui/layout/card';

export const TwoFactor: FC = () => {
  const t = useTranslations('auth.twoFactor');
  const router = useRouter();

  const handleSuccess = useEvent(() => {
    router.push(ROUTES.app);
    router.refresh();
  });

  return (
    <Card description={t('description')} icon={Smartphone} title={t('title')}>
      <TwoFactorForm onSuccess={handleSuccess} />
    </Card>
  );
};
