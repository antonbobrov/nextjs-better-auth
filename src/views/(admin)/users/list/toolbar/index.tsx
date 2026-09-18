'use client';

import { memo, type FC } from 'react';

import { ArrowRotateRight, FunnelXmark } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { ActionButton } from '@/ui/primitives/action-button';
import { cn } from '@/utils';

import type { IProps } from './types';

const resetIcon = <FunnelXmark className="size-4" />;
const refreshIcon = <ArrowRotateRight className="size-4" />;

const Component: FC<IProps> = ({
  className,
  style,
  isRefreshing,
  isResetDisabled,
  onRefresh,
  onReset,
}) => {
  const t = useTranslations('admin.list');
  const tActions = useTranslations('common.actions');

  return (
    <div
      className={cn('ml-auto flex items-end gap-1', className)}
      style={style}
    >
      <ActionButton
        isDisabled={isResetDisabled}
        label={t('resetFilters')}
        onPress={onReset}
      >
        {resetIcon}
      </ActionButton>

      <ActionButton
        isPending={isRefreshing}
        label={tActions('refresh')}
        onPress={onRefresh}
      >
        {refreshIcon}
      </ActionButton>
    </div>
  );
};

Component.displayName = 'AdminUsersActions';

export const AdminUsersActions = memo(Component);
