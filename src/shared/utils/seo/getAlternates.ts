import type { Metadata } from 'next';

import { getPathname } from '@/i18n/pathname';
import type { TLocale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

type THref = Parameters<typeof getPathname>[0]['href'];

export function getAlternates(
  locale: TLocale,
  href: THref = '/',
): NonNullable<Metadata['alternates']> {
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, getPathname({ href, locale: item })]),
  );

  return {
    canonical: getPathname({ href, locale }),
    languages: {
      ...languages,
      'x-default': getPathname({
        href,
        locale: routing.defaultLocale,
      }),
    },
  };
}
