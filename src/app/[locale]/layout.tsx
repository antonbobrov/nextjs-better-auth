import '@/styles/index.css';

import type { FC, PropsWithChildren } from 'react';

import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';

import type { Metadata, Viewport } from 'next';

import { hasLocale, NextIntlClientProvider } from 'next-intl';

import { routing } from '@/i18n/routing';
import { SITE_ORIGIN } from '@/shared/config/env';
import { SITE_NAME } from '@/shared/config/general';

import { SetupClient } from '../SetupClient';

interface IProps extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

const inter = Inter({
  display: 'swap',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-iner',
});

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    formatDetection: {
      address: false,
      date: false,
      email: false,
      telephone: false,
      url: false,
    },
    icons: {
      apple: '/192x192.png',
      icon: [
        { type: 'image/svg+xml', url: '/favicon.svg' },
        { type: 'image/x-icon', url: '/favicon.ico' },
      ],
    },
    metadataBase: new URL(SITE_ORIGIN),
    title: SITE_NAME,
  };
}

const LocaleLayout: FC<IProps> = async ({ children, params }) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html className={inter.variable} lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <SetupClient>{children}</SetupClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
