import type { FC } from 'react';

import { getLocale, getTranslations } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { SelfUnsuspend } from '@/views/(auth)/self-unsuspend';
import { SelfUnsuspendConfirm } from '@/views/(auth)/self-unsuspend-confirm';

interface IProps {
  searchParams: Promise<{
    email?: string | string[];
    token?: string | string[];
  }>;
}

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('auth.unsuspend');

  return {
    alternates: getAlternates(locale, ROUTES.auth.selfUnsuspend()),
    title: t('title'),
  };
}

const Page: FC<IProps> = async ({ searchParams }) => {
  const { email, token } = await searchParams;
  const tokenValue = Array.isArray(token) ? token[0] : token;

  if (tokenValue) {
    return <SelfUnsuspendConfirm token={tokenValue} />;
  }

  const emailValue = Array.isArray(email) ? email[0] : email;

  return <SelfUnsuspend email={emailValue} />;
};

export default Page;
