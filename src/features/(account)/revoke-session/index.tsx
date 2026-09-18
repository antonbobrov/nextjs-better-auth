'use client';

import { cloneElement, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { Confirm, useConfirm } from '@/ui/overlays/confirm';

import { useRevokeSession } from './hooks';

import type { IProps } from './types';

export const RevokeSession: FC<IProps> = ({ children, token }) => {
  const tActions = useTranslations('common.actions');
  const t = useTranslations('account.sessions');

  const { isPending, revoke } = useRevokeSession(token);
  const { confirm, isOpen, open, onToggle } = useConfirm(revoke);

  return (
    <>
      {cloneElement(children, { isPending, onPress: open })}

      <Confirm
        body={t('revokeSessionBody')}
        confirmLabel={tActions('revoke')}
        header={t('revokeSessionHeader')}
        isOpen={isOpen}
        isPending={isPending}
        status="danger"
        onConfirm={confirm}
        onToggle={onToggle}
      />
    </>
  );
};
