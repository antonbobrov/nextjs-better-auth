import type account from './messages/en/account.json';
import type admin from './messages/en/admin.json';
import type auth from './messages/en/auth.json';
import type common from './messages/en/common.json';
import type errors from './messages/en/errors.json';
import type layout from './messages/en/layout.json';
import type notFound from './messages/en/notFound.json';
import type { TLocale } from './routing';

type Messages = {
  account: typeof account;
  admin: typeof admin;
  auth: typeof auth;
  common: typeof common;
  errors: typeof errors;
  layout: typeof layout;
  notFound: typeof notFound;
};

declare module 'next-intl' {
  interface AppConfig {
    Locale: TLocale;
    Messages: Messages;
  }
}
