import { useContext } from 'react';

import { SessionProviderContext } from './context';

export function useSession() {
  const value = useContext(SessionProviderContext);

  return value;
}
