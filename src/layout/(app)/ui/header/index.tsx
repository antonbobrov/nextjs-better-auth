'use client';

import { memo, type FC } from 'react';

import { Bars, Xmark } from '@gravity-ui/icons';
import { useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { ActionButton } from '@/ui/primitives/action-button';
import { cn } from '@/utils';

import { useLayoutContext } from '../../provider/hooks';
import { Logo } from '../logo';

import type { IProps } from './types';

const XmarkMemo = memo(Xmark);
const BarsMemo = memo(Bars);

const Component: FC<IProps> = ({ className, style, user }) => {
  const { isMenuOpened, menuId, setIsMenuOpened } = useLayoutContext();

  const t = useTranslations('layout.nav');

  const handleLogoClick = useEvent(() => setIsMenuOpened(false));

  const toggle = useEvent(() => setIsMenuOpened(!isMenuOpened));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40',
        'flex items-center justify-between gap-3',
        'border-b border-separator shadow-xs bg-surface text-surface-foreground',
        'h-18 px-6 max-md:px-4',
        className,
      )}
      style={style}
    >
      <Link
        className="flex min-w-0 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-focus"
        href={ROUTES.app}
        onClick={handleLogoClick}
      >
        <Logo />
      </Link>

      {user && (
        <ActionButton
          aria-controls={menuId}
          aria-expanded={isMenuOpened}
          aria-haspopup="dialog"
          aria-label={isMenuOpened ? t('closeMenu') : t('openMenu')}
          variant="tertiary"
          onPress={toggle}
        >
          {isMenuOpened ? (
            <XmarkMemo className="size-4" aria-hidden />
          ) : (
            <BarsMemo className="size-4" aria-hidden />
          )}
        </ActionButton>
      )}
    </header>
  );
};

Component.displayName = 'Header';

export const Header = memo(Component);
