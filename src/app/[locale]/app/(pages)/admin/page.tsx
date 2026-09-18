import { getLocale } from 'next-intl/server';

import { redirect } from '@/i18n/redirect';
import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';

export async function generateMetadata() {
  const locale = await getLocale();

  return {
    alternates: getAlternates(locale, ROUTES.admin.users.stats),
  };
}

const Page = async () => {
  await redirect(ROUTES.admin.users.stats);
};

export default Page;
