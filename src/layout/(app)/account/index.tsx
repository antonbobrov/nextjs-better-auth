'use client';

import type { FC, PropsWithChildren } from 'react';

import { useTranslations } from 'next-intl';

import { Screen } from '@/ui/layout/screen';

import { AccountNav } from './nav';

export const AccountLayout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations('layout.menu');

  return (
    <div className="flex flex-col gap-6">
      <Screen title={t('account')} />

      <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
        <AccountNav />

        <div className="w-full xl:max-w-lg">{children}</div>
      </div>
    </div>
  );
};
