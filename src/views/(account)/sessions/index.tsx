'use client';

import type { FC } from 'react';

import { ArrowRotateRight, Xmark } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { RevokeOtherSessions } from '@/features/(account)/revoke-other-sessions';
import { useAccountSessions } from '@/features/(account)/sessions/hooks';
import { Session } from '@/ui/data/session';
import { DataState } from '@/ui/feedback/data-state';
import { ActionButton } from '@/ui/primitives/action-button';
import { Button } from '@/ui/primitives/button';

import { OtherSessionRow } from './other-session-row';

export const AccountSessions: FC = () => {
  const tActions = useTranslations('common.actions');
  const t = useTranslations('account.sessions');

  const sessions = useAccountSessions();

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-foreground text-sm font-medium">{t('heading')}</p>

        <ActionButton
          className="shrink-0"
          isPending={sessions.isFetching}
          label={tActions('refresh')}
          onPress={sessions.refresh}
        >
          <ArrowRotateRight className="size-4" />
        </ActionButton>
      </div>

      {sessions.current && <Session isCurrent session={sessions.current} />}

      <DataState error={sessions.isError} isLoading={sessions.isLoading}>
        {sessions.other.map((item) => (
          <OtherSessionRow key={item.id} session={item} />
        ))}

        {sessions.other.length > 0 && (
          <RevokeOtherSessions>
            <Button className="w-full" icon={Xmark} variant="danger">
              {t('revokeOther')}
            </Button>
          </RevokeOtherSessions>
        )}
      </DataState>
    </div>
  );
};
