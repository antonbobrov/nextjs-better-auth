import { useMemo } from 'react';

import {
  Ban,
  BanDashed,
  Calendar,
  Clock,
  ClockArrowRotateLeft,
  Comment,
  Envelope,
  Person,
  Shield,
  ShieldCheck,
  Smartphone,
} from '@gravity-ui/icons';
import { useLocale, useTranslations } from 'next-intl';

import type { TUser } from '@/lib/auth/types';
import { SIGN_UP, TWO_FACTOR } from '@/shared/config/auth';
import { formatDateTime, toUserRole } from '@/utils';

export function useUserDetailsItems(user: TUser | null, isAdmin?: boolean) {
  const locale = useLocale();

  const tAccount = useTranslations('account');
  const tCommon = useTranslations('common');
  const tFields = useTranslations('common.fields');
  const tMenu = useTranslations('layout.menu');

  return useMemo(() => {
    if (!user) {
      return [];
    }

    const adminFields = [];

    if (user.banned) {
      adminFields.push({
        icon: Ban,
        label: tAccount('banned'),
        value: user.banned ? tCommon('yes') : tCommon('no'),
      });

      adminFields.push({
        icon: Comment,
        label: tAccount('banReason'),
        value: user.banReason,
      });

      adminFields.push({
        icon: Clock,
        label: tAccount('banExpires'),
        value: user.banExpires
          ? formatDateTime(user.banExpires, locale)
          : tCommon('never'),
      });
    }

    return [
      {
        icon: Person,
        label: tFields('name.label'),
        value: user.name,
      },
      {
        icon: Envelope,
        label: tFields('email.label'),
        value: user.email,
      },
      ...(SIGN_UP.requireVerification
        ? [
            {
              icon: ShieldCheck,
              label: tAccount('status'),
              value: user.emailVerified
                ? tAccount('verified')
                : tAccount('unverified'),
            },
          ]
        : []),
      {
        icon: Shield,
        label: tFields('role.label'),
        value: toUserRole(user.role),
      },
      {
        icon: BanDashed,
        label: tAccount('selfSuspended'),
        value: user.selfSuspended ? tCommon('yes') : tCommon('no'),
      },
      ...(TWO_FACTOR.enabled
        ? [
            {
              icon: Smartphone,
              label: tMenu('twoFactor'),
              value: user.twoFactorEnabled
                ? tAccount('enabled')
                : tAccount('disabled'),
            },
          ]
        : []),
      {
        icon: Calendar,
        label: tAccount('registered'),
        value: formatDateTime(user.createdAt, locale),
      },
      {
        icon: ClockArrowRotateLeft,
        label: tAccount('profileUpdated'),
        value: formatDateTime(user.updatedAt, locale),
      },
      ...(isAdmin ? adminFields : []),
    ];
  }, [isAdmin, locale, tAccount, tCommon, tFields, tMenu, user]);
}
