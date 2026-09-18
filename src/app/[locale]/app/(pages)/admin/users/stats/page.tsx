import { getLocale } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { AdminUsersStats } from '@/views/(admin)/users/stats';

export async function generateMetadata() {
  const locale = await getLocale();

  return {
    alternates: getAlternates(locale, ROUTES.admin.users.stats),
  };
}

const Page = () => <AdminUsersStats />;

export default Page;
