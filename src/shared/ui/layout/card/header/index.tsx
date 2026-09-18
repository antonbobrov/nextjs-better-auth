'use client';

import type { FC } from 'react';

import { Card as HeroUi } from '@heroui/react';

import { cn } from '@/utils';

import type { IProps } from './types';

export const CardHeader: FC<IProps> = ({
  href,
  actions,
  description,
  icon: Icon,
  title,
  truncateTitle,
  onActionClick,
}) => (
  <HeroUi.Header className="mt-1 gap-3">
    <div className="flex items-start justify-between gap-3">
      <div className="grid min-w-0 gap-1">
        <HeroUi.Title className="flex items-center gap-2 overflow-hidden">
          {Icon ? (
            <Icon className="size-6 shrink-0 text-primary" aria-hidden />
          ) : null}

          <span className={truncateTitle ? 'truncate' : ''}>{title}</span>
        </HeroUi.Title>

        {description ? (
          <HeroUi.Description>{description}</HeroUi.Description>
        ) : null}
      </div>

      {actions ? (
        <div
          className={cn('shrink-0', href && 'relative z-10')}
          onClick={onActionClick}
        >
          {actions}
        </div>
      ) : null}
    </div>
  </HeroUi.Header>
);
