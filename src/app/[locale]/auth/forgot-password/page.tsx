import type { FC } from 'react';

import { getLocale, getTranslations } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { ForgotPassword } from '@/views/(auth)/forgot-password';

interface IProps {
  searchParams: Promise<{
    email?: string | string[];
  }>;
}

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('auth.forgot');

  return {
    alternates: getAlternates(locale, ROUTES.auth.forgot()),
    title: t('meta'),
  };
}

const Page: FC<IProps> = async ({ searchParams }) => {
  const { email } = await searchParams;
  const emailValue = Array.isArray(email) ? email[0] : email;

  return <ForgotPassword email={emailValue} />;
};

export default Page;
