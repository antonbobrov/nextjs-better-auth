import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  defaultLocale: 'en',
  localeCookie: false,
  localeDetection: false,
  localePrefix: 'as-needed',
  locales: ['en'],
});

export type TLocale = (typeof routing.locales)[number];
