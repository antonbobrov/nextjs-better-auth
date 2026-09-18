'use client';

import { type FC } from 'react';

import { ShieldCheck } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { useEvent } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { ROUTES } from '@/shared/config/routes';
import { ErrorMessage } from '@/ui/feedback/error-message';
import { FormField } from '@/ui/form/field';
import { FormOtp } from '@/ui/form/otp';
import { Button } from '@/ui/primitives/button';
import { Switch } from '@/ui/primitives/switch';

import { schema } from './schema';

import type { IProps } from './types';
import type z from 'zod';

export const TwoFactorForm: FC<IProps> = ({ onSuccess }) => {
  const t = useTranslations('auth.twoFactor');
  const tActions = useTranslations('common.actions');
  const tFields = useTranslations('common.fields');

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      code: '',
      trustDevice: false,
      useBackupCode: false,
    },
    resolver: zodResolver(schema),
  });

  const useBackupCode = useWatch({
    control: form.control,
    name: 'useBackupCode',
  });
  const trustDevice = useWatch({
    control: form.control,
    name: 'trustDevice',
  });

  const onUseBackupCodeChange = useEvent((isSelected: boolean) => {
    form.setValue('useBackupCode', isSelected, { shouldDirty: true });
    form.setValue('code', '');
    form.clearErrors('code');
  });

  const onTrustDeviceChange = useEvent((isSelected: boolean) => {
    form.setValue('trustDevice', isSelected, { shouldDirty: true });
  });

  const {
    errorMessage,
    isPending,
    run: onSubmit,
  } = usePendingAction(
    async (data: z.infer<typeof schema>) => {
      const { error } = data.useBackupCode
        ? await authClient.twoFactor.verifyBackupCode({
            code: data.code,
            trustDevice: data.trustDevice,
          })
        : await authClient.twoFactor.verifyTotp({
            code: data.code,
            trustDevice: data.trustDevice,
          });

      if (error) {
        throw error;
      }

      onSuccess();
    },
    { resetOnSuccess: false },
  );

  const onOtpComplete = useEvent(() => {
    if (isPending) {
      return;
    }

    form.handleSubmit(onSubmit)();
  });

  return (
    <FormProvider {...form}>
      <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        {useBackupCode ? (
          <FormField
            type="text"
            autoFocus
            label={tFields('backupCode.label')}
            name="code"
            placeholder={tFields('backupCode.placeholder')}
          />
        ) : (
          <FormOtp
            autoFocus
            fullWidth
            label={tFields('authenticatorCode.label')}
            name="code"
            onComplete={onOtpComplete}
          />
        )}

        <Switch isSelected={useBackupCode} onChange={onUseBackupCodeChange}>
          {t('useBackupCode')}
        </Switch>

        <Switch
          description={t('trustDeviceHint')}
          isSelected={trustDevice}
          onChange={onTrustDeviceChange}
        >
          {t('trustDevice')}
        </Switch>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button
          className="mt-2 w-full"
          type="submit"
          icon={ShieldCheck}
          isPending={isPending}
        >
          {tActions('continue')}
        </Button>

        <p className="text-muted text-center text-sm">
          <Link
            className="underline underline-offset-4"
            href={ROUTES.auth.signIn()}
          >
            {t('backToSignIn')}
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};
