'use client';

import { memo, type FC } from 'react';

import { LayoutSideContent } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { LocaleSelect } from '@/ui/navigation/locale-select';
import { Sidebar } from '@/ui/navigation/sidebar';

import { AppUser } from '../user';

import { NavAccount } from './account';
import { NavLinks } from './links';

import type { IProps } from './types';

const Component: FC<IProps> = ({
  className,
  style,
  isIconOnly,
  session,
  user,
  onToggleCollapse,
}) => {
  const t = useTranslations('layout.nav');

  return (
    <Sidebar className={className} style={style}>
      <Sidebar.Header>
        <AppUser isIconOnly={isIconOnly} user={user} />
      </Sidebar.Header>

      <Sidebar.Content>
        <NavLinks role={user.role} isIconOnly={isIconOnly} />
      </Sidebar.Content>

      <Sidebar.Footer className="mt-6">
        <NavAccount isIconOnly={isIconOnly} session={session} />

        {onToggleCollapse && (
          <Sidebar.Menu className="mt-0.5" label={t('sidebar')}>
            <Sidebar.MenuItem
              aria-expanded={!isIconOnly}
              icon={LayoutSideContent}
              isIconOnly={isIconOnly}
              label={isIconOnly ? t('expandSidebar') : t('collapseSidebar')}
              onClick={onToggleCollapse}
            />
          </Sidebar.Menu>
        )}

        {!isIconOnly && <LocaleSelect className="mt-3 w-full" />}
      </Sidebar.Footer>
    </Sidebar>
  );
};

Component.displayName = 'Nav';

export const Nav = memo(Component);
