'use client';

import { type FC } from 'react';

import { ArrowRight } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { zConfirmPassword, zPassword } from '@/lib/schema/auth';
import { stringifyZodError } from '@/lib/schema/utils';
import { ErrorMessage } from '@/ui/feedback/error-message';
import { FormField } from '@/ui/form/field';
import { Button } from '@/ui/primitives/button';

import type { IProps } from './types';

const schema = z
  .object({
    confirmPassword: zConfirmPassword,
    password: zPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: stringifyZodError('confirmPassword.mismatch'),
    path: ['confirmPassword'],
  });

export const ResetPasswordForm: FC<IProps> = ({ token, onSuccess }) => {
  const tActions = useTranslations('common.actions');
  const tFields = useTranslations('common.fields');

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const {
    errorMessage,
    isPending,
    run: onSubmit,
  } = usePendingAction(
    async (data: z.infer<typeof schema>) => {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token,
      });

      if (error) {
        throw new Error(error.message);
      }

      onSuccess();
    },
    { resetOnSuccess: false },
  );

  return (
    <FormProvider {...form}>
      <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          type="password"
          autoFocus
          label={tFields('password.label')}
          name="password"
          placeholder={tFields('password.placeholder')}
        />

        <FormField
          type="password"
          label={tFields('confirmPassword.label')}
          name="confirmPassword"
          placeholder={tFields('password.placeholder')}
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button
          className="mt-2 w-full"
          type="submit"
          icon={ArrowRight}
          isPending={isPending}
        >
          {tActions('continue')}
        </Button>
      </form>
    </FormProvider>
  );
};
