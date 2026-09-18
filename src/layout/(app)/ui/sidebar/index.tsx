'use client';

import { memo, type FC } from 'react';

import { useEvent } from '@/hooks';
import { cn } from '@/utils';

import { useLayoutContext } from '../../provider/hooks';
import { Nav } from '../nav';

import type { IProps } from './types';

const Component: FC<IProps> = ({ className, ...props }) => {
  const { isSidebarExpanded, setIsSidebarExpanded } = useLayoutContext();

  const toggle = useEvent(() => setIsSidebarExpanded(!isSidebarExpanded));

  return (
    <Nav
      {...props}
      className={cn(
        'h-svh',
        isSidebarExpanded ? 'w-64' : 'w-17',
        'border-e border-separator shadow-sm bg-surface text-surface-foreground',
        'transition-[width] duration-300 ease-in-out',
        className,
      )}
      isIconOnly={!isSidebarExpanded}
      onToggleCollapse={toggle}
    />
  );
};

Component.displayName = 'AppSidebar';

export const AppSidebar = memo(Component);
