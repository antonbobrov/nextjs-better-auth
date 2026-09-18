import { getLocale } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { AccountDetails } from '@/views/(account)/details';

export async function generateMetadata() {
  const locale = await getLocale();

  return {
    alternates: getAlternates(locale, ROUTES.account.details),
  };
}

const Page = () => <AccountDetails />;

export default Page;
