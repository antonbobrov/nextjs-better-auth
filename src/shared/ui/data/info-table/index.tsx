'use client';

import { memo, type FC } from 'react';

import { cn } from '@/utils';

import { InfoTableCell } from './cell';

import type { IProps } from './types';

const Component: FC<IProps> = ({ columns = 1, items }) => {
  const isTwoColumns = columns === 2;

  return (
    <dl
      className={cn(
        'overflow-hidden rounded-2xl border border-separator bg-surface',
        isTwoColumns && 'sm:grid sm:grid-cols-2',
      )}
    >
      {items.map((item, index) => {
        const isSecondLast = index === items.length - 2;
        const clearBottomBorder =
          isTwoColumns && items.length % 2 === 0 && isSecondLast;

        return (
          <InfoTableCell
            key={item.label}
            clearBottomBorder={clearBottomBorder}
            item={item}
            oddBorder={isTwoColumns}
          />
        );
      })}
    </dl>
  );
};

Component.displayName = 'InfoTable';

export const InfoTable = memo(Component);
