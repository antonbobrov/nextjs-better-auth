'use client';

import { type FC } from 'react';

import { FloppyDisk } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { usePendingAction } from '@/lib/api/usePendingAction';
import { authClient } from '@/lib/auth/client';
import { zName } from '@/lib/schema/auth';
import { useSession } from '@/shared/providers/session/hooks';
import { ErrorMessage } from '@/ui/feedback/error-message';
import { toast } from '@/ui/feedback/toast';
import { FormField } from '@/ui/form/field';
import { Button as SubmitButton } from '@/ui/primitives/button';

const schema = z.object({
  name: zName,
});

export const AccountEditForm: FC = () => {
  const tAccount = useTranslations('account');
  const tActions = useTranslations('common.actions');
  const tFields = useTranslations('common.fields');

  const { user } = useSession();

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { name: user?.name ?? '' },
    resolver: zodResolver(schema),
  });

  const { errorMessage, isPending, run } = usePendingAction(
    async (data: z.infer<typeof schema>) => {
      const { error } = await authClient.updateUser({
        name: data.name,
      });

      if (error) {
        throw new Error(error.message);
      }

      form.reset({ name: data.name });
      toast.success(tAccount('profileUpdated'));
    },
  );

  return (
    <FormProvider {...form}>
      <form className="grid gap-3" onSubmit={form.handleSubmit(run)}>
        <FormField
          type="text"
          label={tFields('name.label')}
          maxLength={255}
          name="name"
          placeholder={tFields('name.placeholder')}
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <SubmitButton
          className="mt-2 w-full"
          type="submit"
          icon={FloppyDisk}
          isDisabled={!form.formState.isDirty}
          isPending={isPending}
        >
          {tActions('save')}
        </SubmitButton>
      </form>
    </FormProvider>
  );
};
