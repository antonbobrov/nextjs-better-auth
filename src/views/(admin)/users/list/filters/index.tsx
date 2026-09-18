'use client';

import { memo, useMemo, type FC } from 'react';

import { useTranslations } from 'next-intl';

import {
  CREATED_WITHIN_OPTIONS,
  REGISTERED_SORT_OPTIONS,
} from '@/features/(admin)/users/users/schema';
import { useEvent } from '@/hooks';
import { SIGN_UP } from '@/shared/config/auth';
import { USER_ROLE_OPTIONS } from '@/shared/config/user';
import { SurfaceAccordion } from '@/ui/layout/surface-accordion';
import { Select } from '@/ui/primitives/select';
import {
  BOOLEAN_FILTER_OPTIONS,
  fromBooleanFilter,
  isUserRole,
  toBooleanFilter,
} from '@/utils';

import { AdminUsersPerPage } from '../per-page';

import type { IProps } from './types';

const FieldsComponent: FC<IProps & { compact?: boolean }> = ({
  role,
  banned,
  compact,
  createdWithin,
  pageSize,
  selfSuspended,
  sortDirection,
  twoFactor,
  verified,
  onBannedChange,
  onCreatedWithinChange,
  onPageSizeChange,
  onRoleChange,
  onSelfSuspendedChange,
  onSortDirectionChange,
  onTwoFactorChange,
  onVerifiedChange,
}) => {
  const t = useTranslations('admin.list');
  const tAccount = useTranslations('account');
  const tCommon = useTranslations('common');
  const tFields = useTranslations('common.fields');
  const tMenu = useTranslations('layout.menu');

  const registeredSortOptions = useMemo(
    () =>
      REGISTERED_SORT_OPTIONS.map((option) => ({
        id: option,
        label: option === 'desc' ? t('newest') : t('oldest'),
      })),
    [t],
  );

  const createdWithinOptions = useMemo(
    () =>
      CREATED_WITHIN_OPTIONS.map((option) => {
        if (option === 'all') {
          return { id: option, label: tCommon('all') };
        }

        const labelKey = {
          day: 'createdWithinDay',
          month: 'createdWithinMonth',
          week: 'createdWithinWeek',
        } as const;

        return { id: option, label: t(labelKey[option]) };
      }),
    [t, tCommon],
  );

  const roleFilterOptions = useMemo(
    () => [{ id: 'all', label: tCommon('all') }, ...USER_ROLE_OPTIONS],
    [tCommon],
  );

  const booleanFilterOptions = useMemo(
    () =>
      BOOLEAN_FILTER_OPTIONS.map((option) => {
        let label = tCommon('all');

        if (option.id === 'true') {
          label = tCommon('yes');
        } else if (option.id === 'false') {
          label = tCommon('no');
        }

        return {
          id: option.id,
          label,
        };
      }),
    [tCommon],
  );

  const handleRoleChange = useEvent((value: string) => {
    if (isUserRole(value)) {
      onRoleChange(value);

      return;
    }

    onRoleChange(null);
  });

  const handleVerifiedChange = useEvent((value: string) => {
    onVerifiedChange(toBooleanFilter(value));
  });

  const handleBannedChange = useEvent((value: string) => {
    onBannedChange(toBooleanFilter(value));
  });

  const handleSelfSuspendedChange = useEvent((value: string) => {
    onSelfSuspendedChange(toBooleanFilter(value));
  });

  const handleTwoFactorChange = useEvent((value: string) => {
    onTwoFactorChange(toBooleanFilter(value));
  });

  const handleCreatedWithinChange = useEvent((value: string) => {
    if (value === 'day' || value === 'week' || value === 'month') {
      onCreatedWithinChange(value);

      return;
    }

    onCreatedWithinChange(null);
  });

  const handleSortDirectionChange = useEvent((value: string) => {
    if (value !== 'asc' && value !== 'desc') {
      return;
    }

    onSortDirectionChange(value);
  });

  return (
    <div
      className={
        compact ? 'grid grid-cols-2 items-end gap-3' : 'flex items-end gap-3'
      }
    >
      <Select
        className={compact ? 'w-full' : 'min-w-0 flex-1'}
        label={tAccount('registered')}
        options={registeredSortOptions}
        value={sortDirection as any}
        onChange={handleSortDirectionChange}
      />

      <Select
        className={compact ? 'w-full' : 'min-w-0 flex-1'}
        label={t('createdWithin')}
        options={createdWithinOptions}
        value={createdWithin ?? 'all'}
        onChange={handleCreatedWithinChange}
      />

      <AdminUsersPerPage
        className={compact ? 'w-full gap-2' : 'min-w-0 flex-1 gap-2'}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />

      <Select
        className={compact ? 'w-full' : 'min-w-0 flex-1'}
        label={tFields('role.label')}
        options={roleFilterOptions}
        value={role ?? 'all'}
        onChange={handleRoleChange}
      />

      {SIGN_UP.requireVerification && (
        <Select
          className={compact ? 'w-full' : 'min-w-0 flex-1'}
          label={tAccount('verified')}
          options={booleanFilterOptions}
          value={fromBooleanFilter(verified)}
          onChange={handleVerifiedChange}
        />
      )}

      <Select
        className={compact ? 'w-full' : 'min-w-0 flex-1'}
        label={tAccount('banned')}
        options={booleanFilterOptions}
        value={fromBooleanFilter(banned)}
        onChange={handleBannedChange}
      />

      <Select
        className={compact ? 'w-full' : 'min-w-0 flex-1'}
        label={t('suspended')}
        options={booleanFilterOptions}
        value={fromBooleanFilter(selfSuspended)}
        onChange={handleSelfSuspendedChange}
      />

      <Select
        className={compact ? 'w-full' : 'min-w-0 flex-1'}
        label={tMenu('twoFactor')}
        options={booleanFilterOptions}
        value={fromBooleanFilter(twoFactor)}
        onChange={handleTwoFactorChange}
      />
    </div>
  );
};

FieldsComponent.displayName = 'AdminUsersFiltersFields';

const Fields = memo(FieldsComponent);

const Component: FC<IProps> = (props) => {
  const t = useTranslations('common');

  return (
    <>
      <div className="max-xl:hidden">
        <Fields {...props} />
      </div>

      <SurfaceAccordion className="xl:hidden" title={t('filters')}>
        <Fields compact {...props} />
      </SurfaceAccordion>
    </>
  );
};

Component.displayName = 'AdminUsersFilters';

export const AdminUsersFilters = memo(Component);
