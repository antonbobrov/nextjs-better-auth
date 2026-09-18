'use client';

import { memo, useEffect, type FC } from 'react';

import { FloppyDisk } from '@gravity-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';
import z from 'zod';

import { useEvent } from '@/hooks';
import { zRole } from '@/lib/schema/auth';
import { USER_ROLE_OPTIONS } from '@/shared/config/user';
import { Button } from '@/ui/primitives/button';
import { Select } from '@/ui/primitives/select';
import { isUserRole, toUserRole } from '@/utils';

import { useSetUserRole } from './hooks';

import type { IProps } from './types';

const schema = z.object({
  role: zRole,
});

const Component: FC<IProps> = ({ user }) => {
  const t = useTranslations('admin.role');
  const tFields = useTranslations('common.fields');

  const { isPending, setRole } = useSetUserRole(user.id);

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      role: toUserRole(user.role),
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    form.reset({ role: toUserRole(user.role) });
  }, [form, user.role]);

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
    if (await setRole(data.role)) {
      form.reset({ role: data.role });
    }
  });

  return (
    <form className="grid gap-3" onSubmit={onSubmit}>
      <Select
        className="w-full"
        label={tFields('role.label')}
        options={USER_ROLE_OPTIONS}
        value={role}
        onChange={handleRoleChange}
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
  );
};

Component.displayName = 'SetUserRole';

export const SetUserRole = memo(Component);
