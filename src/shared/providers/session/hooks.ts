import { useContext } from 'react';

import { SessionProviderContext } from './context';

export function useSession() {
  const value = useContext(SessionProviderContext);

  if (!value) {
    throw new Error('useSession must be used within SessionProvider');
  }

  return value;
}
