import { getLocale } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { AccountPassword } from '@/views/(account)/password';

export async function generateMetadata() {
  const locale = await getLocale();

  return {
    alternates: getAlternates(locale, ROUTES.account.password),
  };
}

const Page = () => <AccountPassword />;

export default Page;
