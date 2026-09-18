'use client';

import { memo, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { usePathname } from '@/i18n/navigation';
import { Sidebar } from '@/ui/navigation/sidebar';
import { cn, isAdminRole, isCurrentPage } from '@/utils';

import { ADMIN_NAV_ITEM, NAV_ITEMS } from '../data';

import type { IProps } from './types';

const Component: FC<IProps> = ({ className, style, role, isIconOnly }) => {
  const pathname = usePathname();

  const tMenu = useTranslations('layout.menu');
  const tNav = useTranslations('layout.nav');

  return (
    <div className={cn('flex flex-col', className)} style={style}>
      <Sidebar.Menu label={tNav('navigation')}>
        {NAV_ITEMS.map((item) => (
          <Sidebar.MenuItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            isCurrent={isCurrentPage(item.href, pathname)}
            isIconOnly={isIconOnly}
            label={tMenu(item.name)}
          />
        ))}
      </Sidebar.Menu>

      {isAdminRole(role) && (
        <Sidebar.Menu
          className="mt-4 border-t border-separator pt-4"
          label={tMenu('admin')}
        >
          <Sidebar.MenuItem
            href={ADMIN_NAV_ITEM.href}
            icon={ADMIN_NAV_ITEM.icon}
            isCurrent={isCurrentPage(ADMIN_NAV_ITEM.href, pathname)}
            isIconOnly={isIconOnly}
            label={tMenu(ADMIN_NAV_ITEM.name)}
          />
        </Sidebar.Menu>
      )}
    </div>
  );
};

Component.displayName = 'NavLinks';

export const NavLinks = memo(Component);
