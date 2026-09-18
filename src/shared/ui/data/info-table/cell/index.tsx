'use client';

import { memo, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { CopyButton } from '@/ui/primitives/copy-button';
import { cn } from '@/utils';

import type { IProps } from './types';

const Component: FC<IProps> = ({ clearBottomBorder, item, oddBorder }) => {
  const { copyable, icon: Icon, label, title, value } = item;

  const t = useTranslations('common');
  const displayValue = value ?? t('unknown');

  const canCopy = Boolean(copyable && value);

  const className = cn(
    'flex w-full items-center gap-3 border-b border-separator px-3 py-3 last:border-b-0 text-start',
    oddBorder && 'sm:odd:border-r',
    clearBottomBorder && 'sm:border-b-0',
    canCopy && 'cursor-pointer',
  );

  const content = (
    <>
      <span className="bg-default text-muted flex size-9 shrink-0 items-center justify-center rounded-xl">
        <Icon className="size-4" />
      </span>

      <div className="min-w-0 flex-1">
        <dt className="text-muted text-xs leading-tight">{label}</dt>

        <dd
          className="text-foreground mt-0.5 truncate text-sm font-medium leading-snug"
          title={title ?? displayValue}
        >
          {displayValue}
        </dd>
      </div>
    </>
  );

  if (!canCopy || !value) {
    return <div className={className}>{content}</div>;
  }

  return (
    <CopyButton className={className} label={label} value={value}>
      {content}
    </CopyButton>
  );
};

Component.displayName = 'InfoTableCell';

export const InfoTableCell = memo(Component);
