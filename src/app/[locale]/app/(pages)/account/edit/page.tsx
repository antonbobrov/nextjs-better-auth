import { getLocale } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { AccountEdit } from '@/views/(account)/edit';

export async function generateMetadata() {
  const locale = await getLocale();

  return {
    alternates: getAlternates(locale, ROUTES.account.edit),
  };
}

const Page = () => <AccountEdit />;

export default Page;
