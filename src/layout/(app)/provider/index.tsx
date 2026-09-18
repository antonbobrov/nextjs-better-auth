'use client';

import type { FC, PropsWithChildren } from 'react';
import { useId, useMemo, useState } from 'react';

import Cookies from 'js-cookie';

import { useEvent } from '@/hooks';
import {
  SIDEBAR_EXPANDED_COOKIE,
  SIDEBAR_EXPANDED_COOKIE_EXPIRES_DAYS,
} from '@/shared/config/layout';

import { LayoutContext } from './context';

import type { TLayoutContext } from './context';

interface IProps extends PropsWithChildren {
  isSidebarExpanded: boolean;
}

export const LayoutProvider: FC<IProps> = ({
  children,
  isSidebarExpanded: initialIsSidebarExpanded,
}) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const [isSidebarExpanded, setIsSidebarExpandedState] = useState(
    initialIsSidebarExpanded,
  );

  const menuId = useId();

  const setIsSidebarExpanded = useEvent((isExpanded: boolean) => {
    setIsSidebarExpandedState(isExpanded);
    Cookies.set(SIDEBAR_EXPANDED_COOKIE, isExpanded ? '1' : '0', {
      expires: SIDEBAR_EXPANDED_COOKIE_EXPIRES_DAYS,
      path: '/',
      sameSite: 'lax',
      secure: true,
    });
  });

  const value = useMemo<TLayoutContext>(
    () => ({
      isMenuOpened,
      isSidebarExpanded,
      menuId,
      setIsMenuOpened,
      setIsSidebarExpanded,
    }),
    [isMenuOpened, isSidebarExpanded, menuId, setIsSidebarExpanded],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
