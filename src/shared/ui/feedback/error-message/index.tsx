'use client';

import { memo, type FC } from 'react';

import { ErrorMessage as HeroUiErrorMessage } from '@heroui/react';

import type { IProps } from './types';

const Component: FC<IProps> = ({ className, style, children }) => (
  <HeroUiErrorMessage className={className} style={style}>
    {children}
  </HeroUiErrorMessage>
);

Component.displayName = 'ErrorMessage';

export const ErrorMessage = memo(Component);
