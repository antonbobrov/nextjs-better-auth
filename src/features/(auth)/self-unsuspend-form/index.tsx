'use client';

import { type FC } from 'react';

import { ArrowRight } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { zEmail } from '@/lib/schema/auth';
import { ErrorMessage } from '@/ui/feedback/error-message';
import { FormField } from '@/ui/form/field';
import { Button } from '@/ui/primitives/button';

import { useRequestSelfUnsuspend } from './hooks';

import type { IProps } from './types';

const schema = z.object({ email: zEmail });

export const SelfUnsuspendForm: FC<IProps> = ({ email = '', onSuccess }) => {
  const tActions = useTranslations('common.actions');
  const tFields = useTranslations('common.fields');

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email,
    },
    resolver: zodResolver(schema),
  });

  const { errorMessage, isPending, requestSelfUnsuspend } =
    useRequestSelfUnsuspend(onSuccess);

  return (
    <FormProvider {...form}>
      <form
        className="grid gap-3"
        onSubmit={form.handleSubmit((data) => requestSelfUnsuspend(data.email))}
      >
        <FormField
          type="email"
          autoFocus={!email}
          label={tFields('email.label')}
          name="email"
          placeholder={tFields('email.placeholder')}
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
