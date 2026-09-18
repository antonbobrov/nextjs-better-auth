import { getLocale } from 'next-intl/server';

import { redirect } from '@/i18n/redirect';
import { ROUTES } from '@/shared/config/routes';
import { getAlternates } from '@/utils';

export async function generateMetadata() {
  const locale = await getLocale();

  return {
    alternates: getAlternates(locale, ROUTES.auth.index),
  };
}

const Page = async () => {
  await redirect(ROUTES.auth.signIn());
};

export default Page;
