'use client';

import type { FC } from 'react';

import { ScrollShadow } from '@heroui/react';

import { cn } from '@/utils';

import { MenuItem } from './menu-item';

import type { IProps } from './types';

const Root: FC<IProps> = ({ className, style, children }) => (
  <aside
    className={cn('flex shrink-0 flex-col overflow-hidden', className)}
    style={style}
  >
    {children}
  </aside>
);

const Header: FC<IProps> = ({ className, style, children }) => (
  <div className={cn('px-4 py-3', className)} style={style}>
    {children}
  </div>
);

const Content: FC<IProps> = ({ className, style, children }) => (
  <ScrollShadow
    className={cn('min-h-0 flex-1 px-4', className)}
    size={20}
    style={style}
    hideScrollBar
    orientation="vertical"
  >
    <div className="flex flex-col">{children}</div>
  </ScrollShadow>
);

const Footer: FC<IProps> = ({ className, style, children }) => (
  <div className={cn('px-4 pb-3', className)} style={style}>
    {children}
  </div>
);

const Menu: FC<IProps & { label: string }> = ({
  className,
  style,
  children,
  label,
}) => (
  <nav
    className={cn('flex flex-col gap-1', className)}
    style={style}
    aria-label={label}
  >
    {children}
  </nav>
);

export const Sidebar = Object.assign(Root, {
  Content,
  Footer,
  Header,
  Menu,
  MenuItem,
});
