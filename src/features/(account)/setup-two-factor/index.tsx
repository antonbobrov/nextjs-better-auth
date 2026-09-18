'use client';

import { type FC } from 'react';

import { ShieldCheck, Xmark } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { useEvent } from '@/hooks';
import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { zTotpCode } from '@/lib/schema/auth';
import { ErrorMessage } from '@/ui/feedback/error-message';
import { toast } from '@/ui/feedback/toast';
import { FormOtp } from '@/ui/form/otp';
import { Button } from '@/ui/primitives/button';

import type { IProps } from './types';

const schema = z.object({
  code: zTotpCode,
});

export const SetupTwoFactor: FC<IProps> = ({ onCancel }) => {
  const tActions = useTranslations('common.actions');
  const tFields = useTranslations('common.fields');
  const tTwoFactor = useTranslations('account.twoFactor');

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(schema),
  });

  const {
    errorMessage,
    isPending,
    run: onSubmit,
  } = usePendingAction(
    async (data: z.infer<typeof schema>) => {
      const { error } = await authClient.twoFactor.verifyTotp({
        code: data.code,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success(tTwoFactor('enabled'));
      void authClient.getSession();
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
        <FormOtp
          fullWidth
          label={tFields('authenticatorCode.label')}
          name="code"
          onComplete={onOtpComplete}
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button
          className="w-full"
          type="submit"
          icon={ShieldCheck}
          isPending={isPending}
        >
          {tTwoFactor('enableSubmit')}
        </Button>

        <Button
          className="w-full"
          type="button"
          icon={Xmark}
          isDisabled={isPending}
          variant="tertiary"
          onPress={onCancel}
        >
          {tActions('cancel')}
        </Button>
      </form>
    </FormProvider>
  );
};
