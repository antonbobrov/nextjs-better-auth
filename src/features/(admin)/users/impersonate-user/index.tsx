'use client';

import { cloneElement, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { Confirm, useConfirm } from '@/ui/overlays/confirm';

import { useImpersonateUser } from './hooks';

import type { IProps } from './types';

export const ImpersonateUser: FC<IProps> = ({ children, email, userId }) => {
  const t = useTranslations('admin.impersonate');

  const { impersonate, isPending } = useImpersonateUser(userId);
  const { confirm, isOpen, open, onToggle } = useConfirm(impersonate);

  const emailChunk = <b>{email}</b>;

  return (
    <>
      {cloneElement(children, { isPending, onPress: open })}

      <Confirm
        body={t.rich('body', { email: () => emailChunk })}
        confirmLabel={t('title')}
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
