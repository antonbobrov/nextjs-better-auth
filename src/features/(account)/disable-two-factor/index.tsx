'use client';

import { cloneElement, type FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { zCurrentPassword } from '@/lib/schema/auth';
import { showApiErrorToast, toast } from '@/ui/feedback/toast';
import { FormField } from '@/ui/form/field';
import { Confirm, useConfirmForm } from '@/ui/overlays/confirm';

import type { IProps } from './types';

const schema = z.object({
  password: zCurrentPassword,
});

export const DisableTwoFactor: FC<IProps> = ({ children }) => {
  const tFields = useTranslations('common.fields');
  const tTwoFactor = useTranslations('account.twoFactor');

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { password: '' },
    resolver: zodResolver(schema),
  });

  const { isPending, run: disable } = usePendingAction(
    async (password: string) => {
      const { error } = await authClient.twoFactor.disable({ password });

      if (error) {
        throw new Error(error.message);
      }

      toast.success(tTwoFactor('disabled'));
      void authClient.getSession();

      return true;
    },
    { onError: showApiErrorToast },
  );

  const { confirm, isOpen, open, onToggle } = useConfirmForm({
    action: (data) => disable(data.password),
    form,
  });

  return (
    <FormProvider {...form}>
      {cloneElement(children, { isPending, onPress: open })}

      <Confirm
        body={tTwoFactor('disableBody')}
        confirmLabel={tTwoFactor('disable')}
        form={
          <FormField
            type="password"
            label={tFields('password.label')}
            name="password"
            placeholder={tFields('password.placeholder')}
          />
        }
        header={tTwoFactor('disableHeader')}
        isOpen={isOpen}
        isPending={isPending}
        status="danger"
        onConfirm={confirm}
        onToggle={onToggle}
      />
    </FormProvider>
  );
};
