'use client';

import { cloneElement, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { Confirm, useConfirm } from '@/ui/overlays/confirm';

import { useRevokeOtherSessions } from './hooks';

import type { IProps } from './types';

export const RevokeOtherSessions: FC<IProps> = ({ children }) => {
  const tActions = useTranslations('common.actions');
  const t = useTranslations('account.sessions');

  const { isPending, revoke } = useRevokeOtherSessions();
  const { confirm, isOpen, open, onToggle } = useConfirm(revoke);

  return (
    <>
      {cloneElement(children, { isPending, onPress: open })}

      <Confirm
        body={t('revokeOtherBody')}
        confirmLabel={tActions('revoke')}
        header={t('revokeOtherHeader')}
        isOpen={isOpen}
        isPending={isPending}
        status="danger"
        onConfirm={confirm}
        onToggle={onToggle}
      />
    </>
  );
};
