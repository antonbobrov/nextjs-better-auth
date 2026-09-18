import type { ReactNode } from 'react';

import type { IComponent } from '@/types/Component';
import type { IProps as IButtonProps } from '@/ui/primitives/button/types';

export interface IProps extends IComponent {
  children?: ReactNode;
  label: string;
  value: string;
  variant?: IButtonProps['variant'];
}
