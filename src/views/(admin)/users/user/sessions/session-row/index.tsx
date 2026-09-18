'use client';

import { memo, type FC } from 'react';

import { Xmark } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { RevokeUserSession } from '@/features/(admin)/users/revoke-user-session';
import { Session } from '@/ui/data/session';
import { ActionButton } from '@/ui/primitives/action-button';

import type { IProps } from './types';

const Component: FC<IProps> = ({ session, userId }) => {
  const t = useTranslations('account.sessions');

  return (
    <Session session={session}>
      <RevokeUserSession token={session.token} userId={userId}>
        <ActionButton label={t('revokeSession')} variant="danger-soft">
          <Xmark className="size-4" />
        </ActionButton>
      </RevokeUserSession>
    </Session>
  );
};

Component.displayName = 'AdminUserSessionRow';

export const AdminUserSessionRow = memo(Component);
