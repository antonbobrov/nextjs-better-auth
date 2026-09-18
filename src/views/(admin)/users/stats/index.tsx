'use client';

import type { FC } from 'react';

import {
  Ban,
  BanDashed,
  Calendar,
  DisplayPulse,
  PersonPlus,
  Persons,
  SealCheck,
  ShieldCheck,
} from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { useAdminUsersStats } from '@/features/(admin)/users/stats/hooks';
import { ROUTES } from '@/shared/config/routes';
import { StatsCard } from '@/ui/data/stats-card';
import { DataState } from '@/ui/feedback/data-state';

export const AdminUsersStats: FC = () => {
  const t = useTranslations('admin.usersStats');
  const tMenu = useTranslations('layout.menu');

  const { isError, stats } = useAdminUsersStats();

  return (
    <DataState error={isError} isLoading={false}>
      <div className="grid w-full gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        <StatsCard
          href={ROUTES.admin.users.list}
          icon={Persons}
          title={t('users')}
          value={stats.users}
        />

        <StatsCard
          href={`${ROUTES.admin.users.list}?createdWithin=day`}
          icon={PersonPlus}
          title={t('newUsersDay')}
          value={stats.newUsersDay}
        />

        <StatsCard
          href={`${ROUTES.admin.users.list}?createdWithin=week`}
          icon={PersonPlus}
          title={t('newUsersWeek')}
          value={stats.newUsersWeek}
        />

        <StatsCard
          href={`${ROUTES.admin.users.list}?createdWithin=month`}
          icon={Calendar}
          title={t('newUsersMonth')}
          value={stats.newUsersMonth}
        />

        <StatsCard
          href={`${ROUTES.admin.users.list}?verified=true`}
          icon={SealCheck}
          title={t('verified')}
          value={stats.verifiedUsers}
        />

        <StatsCard
          href={`${ROUTES.admin.users.list}?banned=true`}
          icon={Ban}
          title={t('banned')}
          value={stats.bannedUsers}
        />

        <StatsCard
          href={`${ROUTES.admin.users.list}?selfSuspended=true`}
          icon={BanDashed}
          title={t('selfSuspended')}
          value={stats.selfSuspendedUsers}
        />

        <StatsCard
          icon={DisplayPulse}
          title={t('activeSessions')}
          value={stats.activeSessions}
        />

        <StatsCard
          href={`${ROUTES.admin.users.list}?twoFactor=true`}
          icon={ShieldCheck}
          title={t('twoFactor')}
          value={stats.twoFactorUsers}
        />

        <StatsCard
          href={ROUTES.admin.users.new}
          icon={PersonPlus}
          title={tMenu('addUser')}
          value="+"
        />
      </div>
    </DataState>
  );
};
