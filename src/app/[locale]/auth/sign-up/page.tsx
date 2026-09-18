import type { FC } from 'react';

import { notFound } from 'next/navigation';

import { getLocale, getTranslations } from 'next-intl/server';

import { SIGN_UP } from '@/shared/config/auth';
import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { SignUp } from '@/views/(auth)/sign-up';

interface IProps {
  searchParams: Promise<{
    email?: string | string[];
  }>;
}

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('auth.signUp');

  return {
    alternates: getAlternates(locale, ROUTES.auth.signUp()),
    title: t('meta'),
  };
}

const Page: FC<IProps> = async ({ searchParams }) => {
  if (!SIGN_UP.enabled) {
    return notFound();
  }

  const { email } = await searchParams;
  const emailValue = Array.isArray(email) ? email[0] : email;

  return <SignUp email={emailValue} />;
};

export default Page;
