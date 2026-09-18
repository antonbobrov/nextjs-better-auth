'use client';

import { memo, useMemo, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { usePathname } from '@/i18n/navigation';
import { SectionNav } from '@/ui/navigation/section-nav';

import { ACCOUNT_NAV_ITEMS } from './data';

const Component: FC = () => {
  const pathname = usePathname();

  const t = useTranslations('layout.menu');

  const items = useMemo(
    () =>
      ACCOUNT_NAV_ITEMS.map((item) => ({
        ...item,
        name: t(item.name),
      })),
    [t],
  );

  return <SectionNav items={items} label={t('account')} pathname={pathname} />;
};

Component.displayName = 'AccountNav';

export const AccountNav = memo(Component);
