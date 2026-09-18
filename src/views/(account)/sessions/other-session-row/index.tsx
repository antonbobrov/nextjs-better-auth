'use client';

import { memo, type FC } from 'react';

import { Xmark } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { RevokeSession } from '@/features/(account)/revoke-session';
import { Session } from '@/ui/data/session';
import { ActionButton } from '@/ui/primitives/action-button';

import type { IProps } from './types';

const Component: FC<IProps> = ({ session }) => {
  const t = useTranslations('account.sessions');

  return (
    <Session session={session}>
      <RevokeSession token={session.token}>
        <ActionButton label={t('revokeSession')} variant="danger-soft">
          <Xmark className="size-4" />
        </ActionButton>
      </RevokeSession>
    </Session>
  );
};

Component.displayName = 'OtherSessionRow';

export const OtherSessionRow = memo(Component);
