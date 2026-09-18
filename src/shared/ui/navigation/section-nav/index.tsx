'use client';

import { memo, type FC } from 'react';

import { useEvent } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { Sidebar } from '@/ui/navigation/sidebar';
import { Select } from '@/ui/primitives/select';
import { cn, isCurrentPage } from '@/utils';

import type { IProps } from './types';

const Component: FC<IProps> = ({
  className,
  style,
  items,
  label,
  pathname,
}) => {
  const router = useRouter();

  const current = items.find((item) => isCurrentPage(item.href, pathname));
  const value = current?.href ?? '';

  const options = items.map((item) => ({
    id: item.href,
    label: item.name,
  }));

  const onChange = useEvent((href: string) => {
    if (href === pathname) {
      return;
    }

    router.push(href);
  });

  return (
    <div className={cn('w-full xl:w-48 xl:shrink-0', className)} style={style}>
      <aside className="max-xl:hidden">
        <Sidebar.Menu label={label}>
          {items.map((item) => (
            <Sidebar.MenuItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              isCurrent={isCurrentPage(item.href, pathname)}
              label={item.name}
            />
          ))}
        </Sidebar.Menu>
      </aside>

      <Select
        className="w-full xl:hidden"
        aria-label={label}
        fullWidth
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Component.displayName = 'SectionNav';

export const SectionNav = memo(Component);
