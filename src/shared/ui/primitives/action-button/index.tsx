'use client';

import { memo, type FC } from 'react';

import { buttonVariants } from '@heroui/react';

import { Link } from '@/i18n/navigation';
import { Button } from '@/ui/primitives/button';
import { cn } from '@/utils';

import { WithTooltip } from '../with-tooltip';

import type { IProps } from './types';

const Component: FC<IProps> = ({
  className,
  style,
  href,
  children,
  isDisabled,
  isPending,
  label,
  variant = 'tertiary',
  onPress,
  ...props
}) => (
  <WithTooltip label={label}>
    {href ? (
      <Link
        {...props}
        className={cn(
          buttonVariants({
            size: 'sm',
            isIconOnly: true,
            variant,
          }),
          'outline-none focus-visible:ring-2 focus-visible:ring-focus',
          className,
        )}
        style={style as any}
        href={href}
        aria-label={label}
      >
        {children}
      </Link>
    ) : (
      <Button
        {...props}
        className={className}
        size="sm"
        style={style as any}
        type="button"
        aria-label={label}
        isDisabled={isDisabled}
        isIconOnly
        isPending={isPending}
        variant={variant}
        onPress={onPress}
      >
        {isPending ? null : children}
      </Button>
    )}
  </WithTooltip>
);

Component.displayName = 'ActionButton';

export const ActionButton = memo(Component);
