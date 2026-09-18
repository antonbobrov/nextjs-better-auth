import type { ReactNode } from 'react';

export interface IProps {
  code?: string;
  description?: ReactNode;
  nextHref?: string;
  nextText?: string;
  onNextClick?: () => void;
  title?: string;
}
