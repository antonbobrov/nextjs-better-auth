import { createContext } from 'react';

import type { TSessionProviderContext } from './types';

export const SessionProviderContext = createContext<TSessionProviderContext>({
  session: null,
  user: null,
});
