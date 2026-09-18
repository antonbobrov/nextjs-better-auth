import type { ReactNode } from 'react';

import type { IComponent } from '@/types/Component';

export interface IProps extends IComponent {
  children: ReactNode;
  error?: boolean;
  isEmpty?: boolean;
  isLoading: boolean;
}
