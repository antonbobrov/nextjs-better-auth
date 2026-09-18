import { Gear, House, Shield } from '@gravity-ui/icons';

import { ROUTES } from '@/shared/config/routes';
import type { TNavLink } from '@/ui/navigation/section-nav/types';

import type { AppConfig } from 'next-intl';

type TName = keyof AppConfig['Messages']['layout']['menu'];

export const ADMIN_NAV_ITEM: TNavLink<TName> = {
  href: ROUTES.admin.users.root,
  icon: Shield,
  name: 'admin',
};

export const NAV_ITEMS: TNavLink<TName>[] = [
  {
    href: ROUTES.dashboard,
    icon: House,
    name: 'home',
  },
  {
    href: ROUTES.account.root,
    icon: Gear,
    name: 'account',
  },
];
