'use client';

import { cloneElement, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { Confirm, useConfirm } from '@/ui/overlays/confirm';

import { useRevokeUserSessions } from './hooks';

import type { IProps } from './types';

export const RevokeUserSessions: FC<IProps> = ({ children, userId }) => {
  const t = useTranslations('admin.sessions');
  const tActions = useTranslations('common.actions');

  const { isPending, revoke } = useRevokeUserSessions(userId);
  const { confirm, isOpen, open, onToggle } = useConfirm(revoke);

  return (
    <>
      {cloneElement(children, { isPending, onPress: open })}

      <Confirm
        body={t('revokeAllBody')}
        confirmLabel={tActions('revoke')}
        header={t('revokeAllHeader')}
        isOpen={isOpen}
        isPending={isPending}
        status="danger"
        onConfirm={confirm}
        onToggle={onToggle}
      />
    </>
  );
};
