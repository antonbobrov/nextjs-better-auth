import { getLocale } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { AccountSessions } from '@/views/(account)/sessions';

export async function generateMetadata() {
  const locale = await getLocale();

  return {
    alternates: getAlternates(locale, ROUTES.account.sessions),
  };
}

const Page = () => <AccountSessions />;

export default Page;
