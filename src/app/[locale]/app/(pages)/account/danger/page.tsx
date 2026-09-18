import { getLocale } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { AccountDanger } from '@/views/(account)/danger';

export async function generateMetadata() {
  const locale = await getLocale();

  return {
    alternates: getAlternates(locale, ROUTES.account.danger),
  };
}

const Page = () => <AccountDanger />;

export default Page;
