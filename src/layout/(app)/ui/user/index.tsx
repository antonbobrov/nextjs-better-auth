'use client';

import { memo, type FC } from 'react';

import { Avatar } from '@heroui/react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/utils';

import type { IProps } from './types';

const Component: FC<IProps> = ({ isIconOnly, user }) => {
  const t = useTranslations('layout.nav');

  return (
    <Link
      className="flex items-center gap-3 py-1"
      href={ROUTES.account.details}
      aria-label={t('accountDetails')}
      title={isIconOnly ? user.name : undefined}
    >
      <Avatar className="size-9 shrink-0" size="md">
        <Avatar.Image
          src={user.image ?? `/api/user/${user.id}/avatar`}
          alt={user.name}
        />
      </Avatar>

      <div
        className={cn(
          'flex min-w-0 flex-col transition-opacity duration-300',
          isIconOnly && 'pointer-events-none opacity-0',
        )}
        aria-hidden={isIconOnly}
      >
        <span className="text-foreground text-sm font-medium leading-tight truncate">
          {user.name}
        </span>

        <span className="text-muted text-xs font-medium leading-tight truncate">
          {user.email}
        </span>
      </div>
    </Link>
  );
};

Component.displayName = 'AppUser';

export const AppUser = memo(Component);
