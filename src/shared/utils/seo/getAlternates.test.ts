import { expect, test } from 'vitest';

import { routing } from '@/i18n/routing';
import { ROUTES } from '@/shared/config/routes';

import { getAlternates } from './getAlternates';

test('getAlternates', () => {
  expect(getAlternates(routing.defaultLocale, ROUTES.home)).toEqual({
    canonical: ROUTES.home,
    languages: {
      en: ROUTES.home,
      ru: '/ru',
      'x-default': ROUTES.home,
    },
  });

  expect(getAlternates('en', ROUTES.auth.signIn())).toEqual({
    canonical: ROUTES.auth.signIn(),
    languages: {
      en: ROUTES.auth.signIn(),
      ru: `/ru${ROUTES.auth.signIn()}`,
      'x-default': ROUTES.auth.signIn(),
    },
  });

  expect(getAlternates(routing.defaultLocale)).toEqual({
    canonical: '/',
    languages: {
      en: '/',
      ru: '/ru',
      'x-default': '/',
    },
  });
});
