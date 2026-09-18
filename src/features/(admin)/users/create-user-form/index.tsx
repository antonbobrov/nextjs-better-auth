'use client';

import { type FC } from 'react';

import { PersonPlus } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { useEvent } from '@/hooks';
import { USER_ROLE_OPTIONS, USER_ROLES } from '@/shared/config/user';
import { FormField } from '@/ui/form/field';
import { Button } from '@/ui/primitives/button';
import { Select } from '@/ui/primitives/select';
import { isUserRole } from '@/utils';

import { useCreateUser } from './hooks';
import { schema } from './schema';

import type { IProps } from './types';
import type z from 'zod';

export const CreateUserForm: FC<IProps> = ({ onSuccess }) => {
  const tAdmin = useTranslations('admin.create');
  const tFields = useTranslations('common.fields');

  const { createUser, isPending } = useCreateUser(onSuccess);

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      role: USER_ROLES.user,
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const handleRoleChange = useEvent((value: string) => {
    if (!isUserRole(value)) {
      return;
    }

    form.setValue('role', value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  });

  const role = useWatch({
    control: form.control,
    name: 'role',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await createUser(data);
  });

  return (
    <FormProvider {...form}>
      <form className="grid gap-3" onSubmit={onSubmit}>
        <FormField
          type="text"
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

        <Select
          className="w-full"
          label={tFields('role.label')}
          options={USER_ROLE_OPTIONS}
          value={role}
          onChange={handleRoleChange}
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

        <Button
          className="mt-2 w-full"
          type="submit"
          icon={PersonPlus}
          isPending={isPending}
        >
          {tAdmin('title')}
        </Button>
      </form>
    </FormProvider>
  );
};
