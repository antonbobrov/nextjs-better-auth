import { routing } from '../routing';

import type { TLocale } from '../routing';

interface IParams {
  href: string;
  locale: TLocale;
}

export function getPathname({ href, locale }: IParams) {
  if (locale === routing.defaultLocale) {
    return href;
  }

  if (href === '/') {
    return `/${locale}`;
  }

  return `/${locale}${href}`;
}
