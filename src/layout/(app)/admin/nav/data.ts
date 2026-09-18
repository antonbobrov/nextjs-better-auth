import { ChartColumn, PersonPlus, Persons } from '@gravity-ui/icons';

import { ROUTES } from '@/shared/config/routes';
import type { TNavLink } from '@/ui/navigation/section-nav/types';

import type { AppConfig } from 'next-intl';

type TName = keyof AppConfig['Messages']['layout']['menu'];

export const ADMIN_NAV_ITEMS: TNavLink<TName>[] = [
  {
    href: ROUTES.admin.users.stats,
    icon: ChartColumn,
    name: 'usersStats',
  },
  {
    href: ROUTES.admin.users.list,
    icon: Persons,
    name: 'users',
  },
  {
    href: ROUTES.admin.users.new,
    icon: PersonPlus,
    name: 'addUser',
  },
];
