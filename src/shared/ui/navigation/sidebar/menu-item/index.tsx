'use client';

import { memo, type FC } from 'react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/utils';

import type { IProps } from './types';

const Component: FC<IProps> = ({
  className,
  style,
  href,
  icon: Icon,
  isCurrent,
  isIconOnly,
  label,
  onClick,
}) => {
  const classNames = cn(
    'flex min-h-9 w-full items-center gap-3 overflow-hidden rounded-field px-3 py-1.5 text-start text-base font-medium text-foreground no-underline outline-none cursor-pointer sm:text-sm',
    'transition-[background-color,width,padding] duration-300',
    'hover:bg-default focus-visible:bg-default',
    isCurrent && 'bg-default',
    isIconOnly && 'h-9 w-9 px-2.5 shrink-0',
    className,
  );

  const content = (
    <>
      {Icon && (
        <span
          className="flex size-4 shrink-0 items-center justify-center text-muted [&_svg]:size-4"
          aria-hidden
        >
          <Icon />
        </span>
      )}

      <span
        className={cn(
          'min-w-0 flex-1 truncate text-sm font-medium leading-tight',
          'transition-opacity duration-300',
          isIconOnly && 'opacity-0',
        )}
        aria-hidden
      >
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        className={classNames}
        style={style}
        href={href}
        aria-current={isCurrent ? 'page' : undefined}
        aria-label={label}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      style={style}
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

Component.displayName = 'SidebarMenuItem';

export const MenuItem = memo(Component);
