import { getLocale } from 'next-intl/server';

import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';
import { AdminCreateUser } from '@/views/(admin)/users/create-user';

export async function generateMetadata() {
  const locale = await getLocale();

  return {
    alternates: getAlternates(locale, ROUTES.admin.users.new),
  };
}

const Page = () => <AdminCreateUser />;

export default Page;
