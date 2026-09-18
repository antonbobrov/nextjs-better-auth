'use client';

import { cloneElement, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { Confirm, useConfirm } from '@/ui/overlays/confirm';

import { useSignOut } from './hooks';

import type { IProps } from './types';

export const SignOut: FC<IProps> = ({ children, onSuccess }) => {
  const t = useTranslations('account.signOut');
  const tMenu = useTranslations('layout.menu');

  const { isPending, signOut } = useSignOut(onSuccess);
  const { confirm, isOpen, open, onToggle } = useConfirm(signOut);

  return (
    <>
      {cloneElement(children, { onClick: open })}

      <Confirm
        body={t('body')}
        confirmLabel={tMenu('signOut')}
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
