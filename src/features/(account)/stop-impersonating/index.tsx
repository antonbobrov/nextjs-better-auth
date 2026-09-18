'use client';

import { cloneElement, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { Confirm, useConfirm } from '@/ui/overlays/confirm';

import { useStopImpersonating } from './hooks';

import type { IProps } from './types';

export const StopImpersonating: FC<IProps> = ({ children }) => {
  const t = useTranslations('account.stopImpersonating');

  const { isPending, stop } = useStopImpersonating();
  const { confirm, isOpen, open, onToggle } = useConfirm(stop);

  return (
    <>
      {cloneElement(children, { onClick: open })}

      <Confirm
        body={t('body')}
        confirmLabel={t('confirm')}
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
