'use client';

import { memo, type FC } from 'react';

import { Copy } from '@gravity-ui/icons';
import copyToClipboard from 'clipboard-copy';
import { useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';
import { toast } from '@/ui/feedback/toast';
import { ActionButton } from '@/ui/primitives/action-button';

import type { IProps } from './types';

const copyIcon = <Copy className="text-muted size-4" />;

const Component: FC<IProps> = ({
  className,
  style,
  children,
  label,
  value,
  variant = 'ghost',
}) => {
  const t = useTranslations('common.copy');

  const actionLabel = t('action', { label });

  const onCopy = useEvent(async () => {
    try {
      await copyToClipboard(value);
      toast.success(t('success', { label }));
    } catch {
      toast.danger(t('failed', { label }));
    }
  });

  if (children === undefined) {
    return (
      <ActionButton
        className={className}
        style={style}
        label={actionLabel}
        variant={variant}
        onPress={onCopy}
      >
        {copyIcon}
      </ActionButton>
    );
  }

  return (
    <button
      className={className}
      style={style}
      type="button"
      aria-label={actionLabel}
      onClick={onCopy}
    >
      {children}
    </button>
  );
};

Component.displayName = 'CopyButton';

export const CopyButton = memo(Component);
