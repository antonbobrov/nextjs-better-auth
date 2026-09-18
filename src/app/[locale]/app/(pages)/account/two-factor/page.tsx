import { notFound } from 'next/navigation';

import { getLocale } from 'next-intl/server';

import { TWO_FACTOR } from '@/shared/config/auth';
import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { AccountTwoFactor } from '@/views/(account)/two-factor';

export async function generateMetadata() {
  const locale = await getLocale();

  return {
    alternates: getAlternates(locale, ROUTES.account.twoFactor),
  };
}

const Page = () => {
  if (!TWO_FACTOR.enabled) {
    return notFound();
  }

  return <AccountTwoFactor />;
};

export default Page;
