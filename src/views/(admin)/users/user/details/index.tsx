'use client';

import type { FC } from 'react';

import { Person } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { useUserDetailsItems } from '@/features/(account)/hooks';
import { InfoTable } from '@/ui/data/info-table';
import { DataState } from '@/ui/feedback/data-state';
import { Card } from '@/ui/layout/card';

import type { IProps } from './types';

export const AdminUserDetails: FC<IProps> = ({ isError, isLoading, user }) => {
  const t = useTranslations('admin.details');

  const items = useUserDetailsItems(user, true);

  return (
    <Card description={t('description')} icon={Person} title={t('title')}>
      <DataState error={isError} isLoading={isLoading}>
        <InfoTable items={items} />
      </DataState>
    </Card>
  );
};
