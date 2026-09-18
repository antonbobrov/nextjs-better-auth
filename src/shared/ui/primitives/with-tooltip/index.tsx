'use client';

import { type FC } from 'react';

import { Tooltip } from '@heroui/react';

import type { IProps } from './types';

export const WithTooltip: FC<IProps> = ({ children, label }) => {
  if (!label) {
    return children;
  }

  return (
    <Tooltip delay={0}>
      {children}

      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  );
};
