'use client';

import { memo, type FC } from 'react';

import { FloppyDisk } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';

import { FormField } from '@/ui/form/field';
import { Button } from '@/ui/primitives/button';

import { useSetUserPassword } from './hooks';
import { schema } from './schema';

import type { IProps } from './types';
import type z from 'zod';

const Component: FC<IProps> = ({ userId }) => {
  const t = useTranslations('admin.password');
  const tFields = useTranslations('common.fields');

  const { isPending, setPassword } = useSetUserPassword(userId);

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (await setPassword(data.password)) {
      form.reset();
    }
  });

  return (
    <FormProvider {...form}>
      <form className="grid gap-3" onSubmit={onSubmit}>
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

        <Button
          className="w-full mt-2"
          type="submit"
          icon={FloppyDisk}
          isDisabled={!form.formState.isDirty}
          isPending={isPending}
        >
          {t('submit')}
        </Button>
      </form>
    </FormProvider>
  );
};

Component.displayName = 'SetUserPasswordForm';

export const SetUserPasswordForm = memo(Component);
