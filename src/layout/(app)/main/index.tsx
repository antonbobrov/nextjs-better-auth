'use client';

import { type FC } from 'react';

import { cn } from '@/utils';

import { useLayoutContext } from '../provider/hooks';

import type { IProps } from './types';

export const AppMain: FC<IProps> = ({ children, variant = 'default' }) => {
  const { isMenuOpened } = useLayoutContext();
  const isFlush = variant === 'flush';

  return (
    <main
      className={cn(
        'min-w-0 flex-1',
        isFlush
          ? 'flex flex-col p-0 max-md:h-auto max-md:overflow-visible max-md:pt-18 md:min-h-0 md:overflow-hidden'
          : 'overflow-auto p-6 max-md:px-4 max-md:pt-24',
      )}
      inert={isMenuOpened}
    >
      {children}
    </main>
  );
};
