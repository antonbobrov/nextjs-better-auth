'use client';

import { memo, useRef, type FC } from 'react';

import { useTranslations } from 'next-intl';

import { useEventListener } from '@/hooks';
import { cn, isBrowser, isLink } from '@/utils';

import { useLayoutContext } from '../../provider/hooks';
import { Nav } from '../nav';

import type { IProps } from './types';

const Component: FC<IProps> = ({ className, style, session, user }) => {
  const { isMenuOpened, menuId, setIsMenuOpened } = useLayoutContext();

  const t = useTranslations('layout.nav');

  const menuRef = useRef<HTMLDivElement>(null);

  useEventListener(isBrowser ? document : null, 'keydown', (event) => {
    if (!isMenuOpened || event.key !== 'Escape') {
      return;
    }

    setIsMenuOpened(false);
  });

  useEventListener(menuRef, 'click', (event) => {
    if (
      isMenuOpened &&
      (isLink(event.target) ||
        (event.target instanceof Element &&
          event.target.closest('button') &&
          !event.target.closest('[data-keep-menu]')))
    ) {
      setIsMenuOpened(false);
    }
  });

  return (
    <div
      ref={menuRef}
      className={cn(
        'fixed inset-0 z-8 flex flex-col overflow-hidden bg-surface pt-18 pb-3',
        'transition-transform duration-300 ease-in-out',
        !isMenuOpened && 'pointer-events-none translate-x-full',
        className,
      )}
      style={style}
      id={menuId}
      aria-hidden={!isMenuOpened}
      aria-label={t('menu')}
      aria-modal="true"
      role="dialog"
      inert={!isMenuOpened}
    >
      <Nav className="h-full min-h-0" session={session} user={user} />
    </div>
  );
};

Component.displayName = 'MobileMenu';

export const MobileMenu = memo(Component);
