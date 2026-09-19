import { useContext } from 'react';

import { LayoutContext } from './context';

export function useLayoutContext() {
  const value = useContext(LayoutContext);

  if (!value) {
    throw new Error('useLayoutContext must be used within LayoutProvider');
  }

  return value;
}
