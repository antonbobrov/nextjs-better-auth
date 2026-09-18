'use client';

import { cloneElement, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { Confirm, useConfirm } from '@/ui/overlays/confirm';

import { useRevokeUserSession } from './hooks';

import type { IProps } from './types';

export const RevokeUserSession: FC<IProps> = ({ children, token, userId }) => {
  const tActions = useTranslations('common.actions');
  const tSettings = useTranslations('account.sessions');

  const { isPending, revoke } = useRevokeUserSession(userId, token);
  const { confirm, isOpen, open, onToggle } = useConfirm(revoke);

  return (
    <>
      {cloneElement(children, { isPending, onPress: open })}

      <Confirm
        body={tSettings('revokeSessionBody')}
        confirmLabel={tActions('revoke')}
        header={tSettings('revokeSessionHeader')}
        isOpen={isOpen}
        isPending={isPending}
        status="danger"
        onConfirm={confirm}
        onToggle={onToggle}
      />
    </>
  );
};
