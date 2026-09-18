'use client';

import { type FC } from 'react';

import { ArrowRight } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { zCurrentPassword } from '@/lib/schema/auth';
import { ErrorMessage } from '@/ui/feedback/error-message';
import { FormField } from '@/ui/form/field';
import { Button } from '@/ui/primitives/button';

import type { IProps } from './types';

const schema = z.object({
  password: zCurrentPassword,
});

export const EnableTwoFactor: FC<IProps> = ({ onEnabled }) => {
  const tActions = useTranslations('common.actions');
  const tFields = useTranslations('common.fields');
  const tTwoFactor = useTranslations('account.twoFactor');

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
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
      const { data: setup, error } = await authClient.twoFactor.enable({
        method: 'totp',
        password: data.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!setup || setup.method !== 'totp') {
        throw new Error(tTwoFactor('unableToStart'));
      }

      onEnabled({
        backupCodes: setup.backupCodes,
        totpURI: setup.totpURI,
      });
    },
    { resetOnSuccess: false },
  );

  return (
    <FormProvider {...form}>
      <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          type="password"
          label={tFields('password.label')}
          name="password"
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
