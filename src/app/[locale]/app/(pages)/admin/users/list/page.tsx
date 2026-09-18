import { Suspense } from 'react';

import { getLocale } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { AdminUsersList } from '@/views/(admin)/users/list';

export async function generateMetadata() {
  const locale = await getLocale();

  return {
    alternates: getAlternates(locale, ROUTES.admin.users.list),
  };
}

const Page = () => (
  <Suspense>
    <AdminUsersList />
  </Suspense>
);

export default Page;
