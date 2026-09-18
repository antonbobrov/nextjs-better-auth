import { redirect as nextRedirect } from 'next/navigation';

import { getLocale } from 'next-intl/server';

import { getPathname } from './pathname';

export async function redirect(href: string): Promise<never> {
  const locale = await getLocale();

  nextRedirect(getPathname({ href, locale }));
}
