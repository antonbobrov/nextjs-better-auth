import type { FC } from 'react';

import { getLocale, getTranslations } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { TwoFactor } from '@/views/(auth)/two-factor';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('auth.twoFactor');

  return {
    alternates: getAlternates(locale, ROUTES.auth.twoFactor),
    title: t('title'),
  };
}

const Page: FC = () => <TwoFactor />;

export default Page;
