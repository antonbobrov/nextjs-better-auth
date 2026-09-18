'use client';

import { useEffect, type FC } from 'react';

import { ArrowRightFromSquare, BanDashed, Envelope } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import z from 'zod';

import { useEvent } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import {
  EMAIL_NOT_VERIFIED_CODE,
  SELF_SUSPEND_ERROR_CODE,
} from '@/lib/auth/messages';
import { zEmail, zPassword } from '@/lib/schema/auth';
import { ROUTES } from '@/shared/config/routes';
import { ErrorMessage } from '@/ui/feedback/error-message';
import { FormField } from '@/ui/form/field';
import { Button } from '@/ui/primitives/button';

import type { IProps } from './types';

const schema = z.object({
  email: zEmail,
  password: zPassword,
});

export const SignInForm: FC<IProps> = ({
  email = '',
  onEmailChange,
  onRequireTwoFactor,
  onSelfUnsuspend,
  onSuccess,
  onVerifyEmail,
}) => {
  const t = useTranslations('auth.signIn');
  const tCommon = useTranslations('auth.common');
  const tFields = useTranslations('common.fields');
  const tSendVerify = useTranslations('auth.sendVerify');
  const tUnsuspend = useTranslations('auth.unsuspend');

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email,
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const watchedEmail = useWatch({ control: form.control, name: 'email' }) ?? '';

  useEffect(() => {
    onEmailChange?.(watchedEmail);
  }, [onEmailChange, watchedEmail]);

  const forgotHref = ROUTES.auth.forgot(watchedEmail);

  const {
    errorCode,
    errorMessage,
    isPending,
    run: onSubmit,
  } = usePendingAction(
    async (values: z.infer<typeof schema>) => {
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      if (data && 'twoFactorRedirect' in data && data.twoFactorRedirect) {
        onRequireTwoFactor();

        return;
      }

      onSuccess();
    },
    { resetOnSuccess: false },
  );

  const isSelfSuspended = errorCode === SELF_SUSPEND_ERROR_CODE;

  const isNotVerified = errorCode === EMAIL_NOT_VERIFIED_CODE;

  const handleSelfUnsuspend = useEvent(() => onSelfUnsuspend(watchedEmail));

  const handleVerifyEmail = useEvent(() => onVerifyEmail());

  return (
    <FormProvider {...form}>
      <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          type="email"
          autoFocus={!email}
          label={tFields('email.label')}
          name="email"
          placeholder={tFields('email.placeholder')}
        />

        <FormField
          type="password"
          autoFocus={Boolean(email)}
          label={tFields('password.label')}
          name="password"
          placeholder={tFields('password.placeholder')}
          right={<Link href={forgotHref}>{t('forgotPassword')}</Link>}
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <div className="mt-2">
          {!isSelfSuspended && !isNotVerified && (
            <Button
              className="w-full"
              type="submit"
              icon={ArrowRightFromSquare}
              isPending={isPending}
            >
              {tCommon('signIn')}
            </Button>
          )}

          {isSelfSuspended && (
            <Button
              className="w-full"
              type="button"
              icon={BanDashed}
              variant="danger"
              onPress={handleSelfUnsuspend}
            >
              {tUnsuspend('title')}
            </Button>
          )}

          {isNotVerified && (
            <Button
              className="w-full"
              type="button"
              icon={Envelope}
              variant="tertiary"
              onPress={handleVerifyEmail}
            >
              {tSendVerify('submit')}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
