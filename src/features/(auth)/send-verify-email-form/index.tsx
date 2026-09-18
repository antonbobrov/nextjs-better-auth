'use client';

import { type FC } from 'react';

import { Envelope } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import z from 'zod';

import { Link } from '@/i18n/navigation';
import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { zEmail } from '@/lib/schema/auth';
import { ROUTES } from '@/shared/config/routes';
import { ErrorMessage } from '@/ui/feedback/error-message';
import { FormField } from '@/ui/form/field';
import { Button } from '@/ui/primitives/button';

import type { IProps } from './types';

const schema = z.object({ email: zEmail });

export const SendVerifyEmailForm: FC<IProps> = ({ email = '', onSuccess }) => {
  const t = useTranslations('auth.sendVerify');
  const tAuthCommon = useTranslations('auth.common');
  const tFields = useTranslations('common.fields');

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email,
    },
    resolver: zodResolver(schema),
  });

  const watchedEmail = useWatch({ control: form.control, name: 'email' });

  const signInHref = ROUTES.auth.signIn(watchedEmail);

  const {
    errorMessage,
    isPending,
    run: onSubmit,
  } = usePendingAction(
    async (data: z.infer<typeof schema>) => {
      const { error } = await authClient.sendVerificationEmail({
        email: data.email,
      });

      if (error) {
        throw error;
      }

      onSuccess(data.email);
    },
    { resetOnSuccess: false },
  );

  return (
    <FormProvider {...form}>
      <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          type="email"
          autoFocus={!email}
          label={tFields('email.label')}
          name="email"
          placeholder={tFields('email.placeholder')}
          right={<Link href={signInHref}>{tAuthCommon('signIn')}</Link>}
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button
          className="mt-2 w-full"
          type="submit"
          icon={Envelope}
          isPending={isPending}
        >
          {t('submit')}
        </Button>
      </form>
    </FormProvider>
  );
};
