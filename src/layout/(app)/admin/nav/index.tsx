'use client';

import { memo, useMemo, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { usePathname } from '@/i18n/navigation';
import { SectionNav } from '@/ui/navigation/section-nav';

import { ADMIN_NAV_ITEMS } from './data';

const Component: FC = () => {
  const pathname = usePathname();

  const t = useTranslations('layout.menu');

  const items = useMemo(
    () =>
      ADMIN_NAV_ITEMS.map((item) => ({
        ...item,
        name: t(item.name),
      })),
    [t],
  );

  return <SectionNav items={items} label={t('admin')} pathname={pathname} />;
};

Component.displayName = 'AdminNav';

export const AdminNav = memo(Component);
