import { notFound } from 'next/navigation';
import * as rootParams from 'next/root-params';

import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import './global';
import { MESSAGE_NAMESPACES } from './messages/namespaces';
import { routing } from './routing';

async function loadMessages(locale: string) {
  const entries = await Promise.all(
    MESSAGE_NAMESPACES.map(async (namespace) => {
      const messages = (await import(`./messages/${locale}/${namespace}.json`))
        .default;

      return [namespace, messages] as const;
    }),
  );

  return Object.fromEntries(entries);
}

export default getRequestConfig(async ({ locale: localeOverride }) => {
  const requested = localeOverride ?? (await rootParams.locale());

  if (!hasLocale(routing.locales, requested)) {
    notFound();
  }

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
});
