'use client';

import { useEffect, type FC } from 'react';

import { PersonPlus } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import z from 'zod';

import { getPathname } from '@/i18n/pathname';
import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { zConfirmPassword, zEmail, zName, zPassword } from '@/lib/schema/auth';
import { stringifyZodError } from '@/lib/schema/utils';
import { ROUTES } from '@/shared/config/routes';
import { ErrorMessage } from '@/ui/feedback/error-message';
import { FormField } from '@/ui/form/field';
import { Button } from '@/ui/primitives/button';

import type { IProps } from './types';

const schema = z
  .object({
    confirmPassword: zConfirmPassword,
    email: zEmail,
    name: zName,
    password: zPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: stringifyZodError('confirmPassword.mismatch'),
    path: ['confirmPassword'],
  });

export const SignUpForm: FC<IProps> = ({
  email = '',
  onEmailChange,
  onSuccess,
}) => {
  const locale = useLocale();

  const t = useTranslations('auth.signUp');
  const tFields = useTranslations('common.fields');

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      confirmPassword: '',
      email,
      name: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const watchedEmail = useWatch({ control: form.control, name: 'email' }) ?? '';

  useEffect(() => {
    onEmailChange?.(watchedEmail);
  }, [onEmailChange, watchedEmail]);

  const {
    errorMessage,
    isPending,
    run: onSubmit,
  } = usePendingAction(
    async (data: z.infer<typeof schema>) => {
      const { error } = await authClient.signUp.email({
        callbackURL: getPathname({
          href: ROUTES.auth.signIn(data.email),
          locale,
        }),
        email: data.email,
        name: data.name,
        password: data.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      onSuccess(data.email);
    },
    { resetOnSuccess: false },
  );

  return (
    <FormProvider {...form}>
      <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          type="text"
          autoFocus
          label={tFields('name.label')}
          maxLength={255}
          name="name"
          placeholder={tFields('name.placeholder')}
        />

        <FormField
          type="email"
          label={tFields('email.label')}
          name="email"
          placeholder={tFields('email.placeholder')}
        />

        <FormField
          type="password"
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
          icon={PersonPlus}
          isPending={isPending}
        >
          {t('title')}
        </Button>
      </form>
    </FormProvider>
  );
};
