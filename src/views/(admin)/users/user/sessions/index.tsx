'use client';

import type { FC } from 'react';

import { ArrowRotateRight, DisplayPulse, Xmark } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { RevokeUserSessions } from '@/features/(admin)/users/revoke-user-sessions';
import { useAdminUserSessions } from '@/features/(admin)/users/user-sessions/hooks';
import { DataState } from '@/ui/feedback/data-state';
import { Card } from '@/ui/layout/card';
import { ActionButton } from '@/ui/primitives/action-button';
import { Button } from '@/ui/primitives/button';

import { AdminUserSessionRow } from './session-row';

import type { IProps } from './types';

export const AdminUserSessions: FC<IProps> = ({ userId }) => {
  const t = useTranslations('admin.sessions');
  const tActions = useTranslations('common.actions');
  const tMenu = useTranslations('layout.menu');

  const sessions = useAdminUserSessions(userId);

  return (
    <Card
      description={
        <span className="flex justify-between items-center gap-3">
          <span>{t('description')}</span>

          <ActionButton
            className="shrink-0"
            isPending={sessions.isFetching}
            label={tActions('refresh')}
            onPress={sessions.refresh}
          >
            <ArrowRotateRight className="size-4" />
          </ActionButton>
        </span>
      }
      icon={DisplayPulse}
      title={tMenu('sessions')}
    >
      <DataState
        error={sessions.isError}
        isEmpty={!sessions.data || sessions.data.length === 0}
        isLoading={sessions.isLoading}
      >
        {sessions.data?.map((item) => (
          <AdminUserSessionRow key={item.id} session={item} userId={userId} />
        ))}

        {sessions.data && sessions.data.length > 0 && (
          <RevokeUserSessions userId={userId}>
            <Button className="w-full mt-3" icon={Xmark} variant="danger">
              {t('revokeAll')}
            </Button>
          </RevokeUserSessions>
        )}
      </DataState>
    </Card>
  );
};
