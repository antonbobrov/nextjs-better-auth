'use client';

import { type FC } from 'react';

import { FloppyDisk } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import z from 'zod';

import { useEvent } from '@/hooks';
import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import {
  zConfirmPassword,
  zCurrentPassword,
  zPassword,
} from '@/lib/schema/auth';
import { stringifyZodError } from '@/lib/schema/utils';
import { ErrorMessage } from '@/ui/feedback/error-message';
import { toast } from '@/ui/feedback/toast';
import { FormField } from '@/ui/form/field';
import { Button } from '@/ui/primitives/button';
import { Switch } from '@/ui/primitives/switch';

const schema = z
  .object({
    confirmPassword: zConfirmPassword,
    currentPassword: zCurrentPassword,
    password: zPassword,
    revokeOtherSessions: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: stringifyZodError('confirmPassword.mismatch'),
    path: ['confirmPassword'],
  });

export const UpdateAccountPassword: FC = () => {
  const tAccount = useTranslations('account');
  const tActions = useTranslations('common.actions');
  const tFields = useTranslations('common.fields');
  const tSessions = useTranslations('account.sessions');

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      confirmPassword: '',
      currentPassword: '',
      password: '',
      revokeOtherSessions: false,
    },
    resolver: zodResolver(schema),
  });

  const onRevokeOtherSessionsChange = useEvent((isSelected: boolean) => {
    form.setValue('revokeOtherSessions', isSelected, { shouldDirty: true });
  });

  const revokeOtherSessions = useWatch({
    control: form.control,
    name: 'revokeOtherSessions',
  });

  const {
    errorMessage,
    isPending,
    run: onSubmit,
  } = usePendingAction(async (data: z.infer<typeof schema>) => {
    const { error } = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.password,
      revokeOtherSessions: data.revokeOtherSessions,
    });

    if (error) {
      throw new Error(error.message);
    }

    form.reset();
    toast.success(tAccount('success.passwordUpdated'));
  });

  return (
    <FormProvider {...form}>
      <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          type="password"
          label={tFields('currentPassword.label')}
          name="currentPassword"
          placeholder={tFields('password.placeholder')}
        />

        <FormField
          type="password"
          label={tFields('newPassword.label')}
          name="password"
          placeholder={tFields('password.placeholder')}
        />

        <FormField
          type="password"
          label={tFields('confirmPassword.label')}
          name="confirmPassword"
          placeholder={tFields('password.placeholder')}
        />

        <Switch
          description={tAccount('updatePassword.revokeOtherHint')}
          isSelected={revokeOtherSessions}
          onChange={onRevokeOtherSessionsChange}
        >
          {tSessions('revokeOther')}
        </Switch>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button
          className="mt-2 w-full"
          type="submit"
          icon={FloppyDisk}
          isDisabled={!form.formState.isDirty}
          isPending={isPending}
        >
          {tActions('save')}
        </Button>
      </form>
    </FormProvider>
  );
};
