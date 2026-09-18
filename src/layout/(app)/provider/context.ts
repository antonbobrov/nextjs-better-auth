import { createContext } from 'react';

export type TLayoutContext = {
  isMenuOpened: boolean;
  isSidebarExpanded: boolean;
  menuId: string;
  setIsMenuOpened: (isOpened: boolean) => void;
  setIsSidebarExpanded: (isExpanded: boolean) => void;
};

export const LayoutContext = createContext({} as TLayoutContext);
