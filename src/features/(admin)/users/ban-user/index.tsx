'use client';

import { cloneElement, useState, type FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { zBanReason } from '@/lib/schema/auth';
import { zFromNow } from '@/lib/schema/common';
import { FormField } from '@/ui/form/field';
import { Confirm, useConfirmForm } from '@/ui/overlays/confirm';
import { toDateTimeLocal } from '@/utils';

import { useBanUser } from './hooks';
import { toExpiresIn } from './utils';

import type { IProps } from './types';

const schema = z.object({
  expiresAt: zFromNow,
  reason: zBanReason,
});

export const BanUser: FC<IProps> = ({ children, email, userId }) => {
  const t = useTranslations('admin.danger.ban');
  const tFields = useTranslations('common.fields');

  const { ban, isPending } = useBanUser(userId);

  const [minExpiresAt] = useState(() => toDateTimeLocal(new Date()));

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { expiresAt: '', reason: '' },
    resolver: zodResolver(schema),
  });

  const { confirm, isOpen, open, onToggle } = useConfirmForm({
    action: async (data) => ban(data.reason, toExpiresIn(data.expiresAt)),
    form,
  });

  const emailChunk = <b>{email}</b>;

  return (
    <FormProvider {...form}>
      {cloneElement(children, { isPending, onPress: open })}

      <Confirm
        body={t.rich('body', { email: () => emailChunk })}
        confirmLabel={t('submit')}
        form={
          <div className="grid gap-4">
            <FormField
              type="text"
              label={tFields('reason.label')}
              maxLength={255}
              name="reason"
              placeholder={tFields('reason.placeholder')}
            />

            <FormField
              type="datetime-local"
              label={tFields('expiration.label')}
              min={minExpiresAt}
              name="expiresAt"
              required={false}
            />
          </div>
        }
        header={t('header')}
        isOpen={isOpen}
        isPending={isPending}
        status="danger"
        onConfirm={confirm}
        onToggle={onToggle}
      />
    </FormProvider>
  );
};
