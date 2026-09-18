import type { ReactNode } from 'react';

export interface IProps {
  children: ReactNode;
  description?: ReactNode;
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
}
