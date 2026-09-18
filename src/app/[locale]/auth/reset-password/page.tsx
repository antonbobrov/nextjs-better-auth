import type { FC } from 'react';

import { getLocale, getTranslations } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { ResetPassword } from '@/views/(auth)/reset-password';
import { BaseError } from '@/views/(errors)/base';

interface IProps {
  searchParams: Promise<{
    error?: string | string[];
    token?: string | string[];
  }>;
}

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('auth.reset');

  return {
    alternates: getAlternates(locale, ROUTES.auth.reset),
    title: t('meta'),
  };
}

const Page: FC<IProps> = async ({ searchParams }) => {
  const { error, token } = await searchParams;

  const tForgot = await getTranslations('auth.forgot');
  const tReset = await getTranslations('auth.reset');
  const tResetErrors = await getTranslations('auth.reset.errors');
  const tErrors = await getTranslations('errors');

  if (error) {
    const code = Array.isArray(error) ? error[0] : error;
    const title =
      code === 'INVALID_TOKEN' || code === 'TOKEN_EXPIRED'
        ? tResetErrors(code)
        : tErrors('unexpected');

    return (
      <BaseError
        nextHref={ROUTES.auth.forgot()}
        nextText={tForgot('title')}
        title={title}
      />
    );
  }

  const tokenValue = Array.isArray(token) ? token[0] : token;

  if (!tokenValue) {
    return (
      <BaseError
        nextHref={ROUTES.auth.forgot()}
        nextText={tForgot('title')}
        title={tReset('missingToken')}
      />
    );
  }

  return <ResetPassword token={tokenValue} />;
};

export default Page;
