import { useContext } from 'react';

import { LayoutContext } from './context';

export function useLayoutContext() {
  return useContext(LayoutContext);
}
