'use client';

import { memo, type FC } from 'react';

import { Button as HeroUiButton, Spinner } from '@heroui/react';

import type { IProps } from './types';

const Component: FC<IProps> = ({
  children,
  icon: Icon,
  isDisabled,
  isPending,
  ...props
}) => (
  <HeroUiButton
    {...props}
    isDisabled={isDisabled || isPending}
    isPending={isPending}
  >
    {({ isPending }) => (
      <>
        {isPending ? (
          <Spinner size="sm" data-testid="spinner" color="current" />
        ) : (
          Icon && <Icon />
        )}

        {children}
      </>
    )}
  </HeroUiButton>
);

Component.displayName = 'Button';

export const Button = memo(Component);
