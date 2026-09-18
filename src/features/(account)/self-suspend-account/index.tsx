'use client';

import { cloneElement, type FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { zCurrentPassword } from '@/lib/schema/auth';
import { FormField } from '@/ui/form/field';
import { Confirm, useConfirmForm } from '@/ui/overlays/confirm';

import { useSelfSuspendAccount } from './hooks';

import type { IProps } from './types';

const schema = z.object({
  password: zCurrentPassword,
});

export const SelfSuspendAccount: FC<IProps> = ({ children, onSuccess }) => {
  const tFields = useTranslations('common.fields');
  const tSuspend = useTranslations('account.suspend');

  const { isPending, suspend } = useSelfSuspendAccount(onSuccess);

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { password: '' },
    resolver: zodResolver(schema),
  });

  const { confirm, isOpen, open, onToggle } = useConfirmForm({
    action: (data) => suspend(data.password),
    form,
  });

  return (
    <FormProvider {...form}>
      {cloneElement(children, { isPending, onPress: open })}

      <Confirm
        autoFocus={false}
        body={tSuspend('body')}
        confirmLabel={tSuspend('title')}
        form={
          <FormField
            type="password"
            autoFocus
            label={tFields('password.label')}
            name="password"
            placeholder={tFields('password.placeholder')}
          />
        }
        header={tSuspend('header')}
        isOpen={isOpen}
        isPending={isPending}
        status="danger"
        onConfirm={confirm}
        onToggle={onToggle}
      />
    </FormProvider>
  );
};
