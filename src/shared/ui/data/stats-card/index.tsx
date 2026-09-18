'use client';

import { memo, type FC } from 'react';

import { ChevronRight } from '@gravity-ui/icons';

import { Card } from '@/ui/layout/card';

import type { IProps } from './types';

const clickAction = <ChevronRight className="size-4 text-muted" aria-hidden />;

const Component: FC<IProps> = ({ href, icon, title, value, onPress }) => (
  <Card
    href={href}
    actions={href ? clickAction : undefined}
    icon={icon}
    title={title}
    onClick={onPress}
  >
    <p className="text-3xl font-semibold tabular-nums text-foreground">
      {value}
    </p>
  </Card>
);

Component.displayName = 'StatsCard';

export const StatsCard = memo(Component);
