import { memo, type FC } from 'react';

import { SITE_NAME } from '@/shared/config/general';
import type { IComponent } from '@/types/Component';
import { cn } from '@/utils';

const Mark: FC = () => (
  <svg className="size-5" aria-hidden fill="currentColor" viewBox="0 0 16 16">
    <circle cx="4.5" cy="4.5" r="2.8" />

    <circle cx="11.5" cy="4.5" r="2.8" />

    <circle cx="4.5" cy="11.5" r="2.8" />

    <circle cx="11.5" cy="11.5" r="2.8" />
  </svg>
);

const Component: FC<IComponent> = ({ className, style }) => (
  <span
    className={cn('flex min-w-0 items-center gap-2.5', className)}
    style={style}
  >
    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-[inset_0_1px_0_0_rgb(255_255_255/0.28)]">
      <Mark />
    </span>

    <span className="truncate text-sm font-semibold tracking-tight">
      {SITE_NAME}
    </span>
  </span>
);

Component.displayName = 'Logo';

export const Logo = memo(Component);
