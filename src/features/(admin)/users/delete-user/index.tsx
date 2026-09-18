'use client';

import { cloneElement, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { Confirm, useConfirm } from '@/ui/overlays/confirm';

import { useDeleteUser } from './hooks';

import type { IProps } from './types';

export const DeleteUser: FC<IProps> = ({
  children,
  email,
  userId,
  onSuccess,
}) => {
  const t = useTranslations('admin.danger.delete');
  const tActions = useTranslations('common.actions');

  const { isPending, remove } = useDeleteUser(userId, onSuccess);
  const { confirm, isOpen, open, onToggle } = useConfirm(remove);

  const emailChunk = <b>{email}</b>;

  return (
    <>
      {cloneElement(children, { isPending, onPress: open })}

      <Confirm
        body={t.rich('body', { email: () => emailChunk })}
        confirmLabel={tActions('delete')}
        header={t('header')}
        isOpen={isOpen}
        isPending={isPending}
        status="danger"
        onConfirm={confirm}
        onToggle={onToggle}
      />
    </>
  );
};
