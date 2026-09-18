'use client';

import { cloneElement, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { Confirm, useConfirm } from '@/ui/overlays/confirm';

import { useUnbanUser } from './hooks';

import type { IProps } from './types';

export const UnbanUser: FC<IProps> = ({ children, email, userId }) => {
  const t = useTranslations('admin.danger.unban');

  const { isPending, unban } = useUnbanUser(userId);
  const { confirm, isOpen, open, onToggle } = useConfirm(unban);

  const emailChunk = <b>{email}</b>;

  return (
    <>
      {cloneElement(children, { isPending, onPress: open })}

      <Confirm
        body={t.rich('body', { email: () => emailChunk })}
        confirmLabel={t('submit')}
        header={t('header')}
        isOpen={isOpen}
        isPending={isPending}
        status="warning"
        onConfirm={confirm}
        onToggle={onToggle}
      />
    </>
  );
};
