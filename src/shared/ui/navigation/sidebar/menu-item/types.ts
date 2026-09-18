import type { ElementType } from 'react';

import type { IComponent } from '@/types/Component';

export interface IProps extends IComponent {
  href?: string;
  icon?: ElementType;
  isCurrent?: boolean;
  isIconOnly?: boolean;
  label: string;
  onClick?: () => void;
}
