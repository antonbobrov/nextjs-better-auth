import type { MouseEventHandler, ReactNode } from 'react';

import type { IProps as ICardProps } from '../types';

export interface IProps {
  actions?: ReactNode;
  description?: ReactNode;
  href?: string;
  icon?: ICardProps['icon'];
  onActionClick?: MouseEventHandler<HTMLDivElement>;
  title: string;
  truncateTitle?: boolean;
}
