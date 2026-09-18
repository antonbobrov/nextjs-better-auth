import type { FC } from 'react';

import { getLocale, getTranslations } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { SignIn } from '@/views/(auth)/sign-in';
import { BaseError } from '@/views/(errors)/base';

interface IProps {
  searchParams: Promise<{
    email?: string | string[];
    error?: string | string[];
  }>;
}

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('auth.signIn');

  return {
    alternates: getAlternates(locale, ROUTES.auth.signIn()),
    title: t('meta'),
  };
}

const Page: FC<IProps> = async ({ searchParams }) => {
  const { email, error } = await searchParams;

  if (error) {
    const tCommon = await getTranslations('auth.common');
    const tErrors = await getTranslations('errors');
    const tVerifyErrors = await getTranslations('auth.verify.errors');

    const code = Array.isArray(error) ? error[0] : error;

    const title =
      code === 'INVALID_TOKEN' ||
      code === 'INVALID_USER' ||
      code === 'TOKEN_EXPIRED' ||
      code === 'USER_NOT_FOUND'
        ? tVerifyErrors(code)
        : tErrors('unexpected');

    return (
      <BaseError
        nextHref={ROUTES.auth.signIn()}
        nextText={tCommon('signIn')}
        title={title}
      />
    );
  }

  const emailValue = Array.isArray(email) ? email[0] : email;

  return <SignIn email={emailValue} />;
};

export default Page;
