'use client';

import { memo, type FC } from 'react';

import { useTranslations } from 'next-intl';

import {
  ADMIN_USERS_PAGE_SIZE_MAX,
  ADMIN_USERS_PAGE_SIZE_MIN,
} from '@/features/(admin)/users/users/constants';
import { useEvent, usePropState } from '@/hooks';
import { TextField } from '@/ui/primitives/text-field';

import type { IProps } from './types';

const Component: FC<IProps> = ({
  className,
  style,
  pageSize,
  onPageSizeChange,
}) => {
  const t = useTranslations('admin.list');

  const [value, setValue] = usePropState(String(pageSize));

  const commit = useEvent(() => {
    const parsed = Math.min(
      Math.max(Number(value), ADMIN_USERS_PAGE_SIZE_MIN),
      ADMIN_USERS_PAGE_SIZE_MAX,
    );

    if (parsed === pageSize) {
      return;
    }

    onPageSizeChange(parsed);
  });

  const handleChange = useEvent((next: string) => {
    setValue(next);
  });

  return (
    <TextField
      className={className}
      style={style}
      type="number"
      label={t('perPage')}
      max={ADMIN_USERS_PAGE_SIZE_MAX}
      min={ADMIN_USERS_PAGE_SIZE_MIN}
      name="perPage"
      value={value}
      onBlur={commit}
      onChange={handleChange}
      onEnter={commit}
    />
  );
};

Component.displayName = 'AdminUsersPerPage';

export const AdminUsersPerPage = memo(Component);
