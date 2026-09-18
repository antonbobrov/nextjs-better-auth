import type { FC } from 'react';

import { notFound } from 'next/navigation';

import { getLocale, getTranslations } from 'next-intl/server';

import { SIGN_UP } from '@/shared/config/auth';
import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { VerifyEmail } from '@/views/(auth)/verify-email';
import { BaseError } from '@/views/(errors)/base';

interface IProps {
  searchParams: Promise<{
    token?: string | string[];
  }>;
}

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('auth.verify');

  return {
    alternates: getAlternates(locale, ROUTES.auth.verifyEmail),
    title: t('title'),
  };
}

const Page: FC<IProps> = async ({ searchParams }) => {
  const { token } = await searchParams;

  const tCommon = await getTranslations('auth.common');
  const tVerify = await getTranslations('auth.verify');

  const tokenValue = Array.isArray(token) ? token[0] : token;

  if (!SIGN_UP.requireVerification) {
    return notFound();
  }

  if (!tokenValue) {
    return (
      <BaseError
        nextHref={ROUTES.auth.signIn()}
        nextText={tCommon('signIn')}
        title={tVerify('missingToken')}
      />
    );
  }

  return <VerifyEmail token={tokenValue} />;
};

export default Page;
