'use client';

import type { FC, PropsWithChildren } from 'react';

import { useTranslations } from 'next-intl';

import { Screen } from '@/ui/layout/screen';

import { AdminNav } from './nav';

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations('layout.menu');

  return (
    <div className="flex flex-col gap-6">
      <Screen title={t('admin')} />

      <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
        <AdminNav />

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
};
