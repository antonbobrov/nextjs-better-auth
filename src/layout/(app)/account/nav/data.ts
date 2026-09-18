import {
  Lock,
  Person,
  PersonGear,
  Shield,
  Smartphone,
  TriangleExclamation,
} from '@gravity-ui/icons';

import { TWO_FACTOR } from '@/shared/config/auth';
import { ROUTES } from '@/shared/config/routes';
import type { TNavLink } from '@/ui/navigation/section-nav/types';

import type { AppConfig } from 'next-intl';

type TName = keyof AppConfig['Messages']['layout']['menu'];

export const ACCOUNT_NAV_ITEMS: TNavLink<TName>[] = [
  {
    href: ROUTES.account.details,
    icon: PersonGear,
    name: 'details',
  },
  {
    href: ROUTES.account.edit,
    icon: Person,
    name: 'edit',
  },
  {
    href: ROUTES.account.password,
    icon: Lock,
    name: 'password',
  },
  ...(TWO_FACTOR.enabled
    ? [
        {
          href: ROUTES.account.twoFactor,
          icon: Smartphone,
          name: 'twoFactor' as const,
        },
      ]
    : []),
  {
    href: ROUTES.account.sessions,
    icon: Shield,
    name: 'sessions',
  },
  {
    href: ROUTES.account.danger,
    icon: TriangleExclamation,
    name: 'danger',
  },
];
