import type { ReactNode, SVGProps } from 'react';
import type React from 'react';

interface ICardProps {
  actions?: ReactNode;
  autoScroll?: boolean;
  children: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  highlighted?: boolean;
  icon?: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  title: string;
}

export interface IProps extends ICardProps {
  href?: string;
  onClick?: () => void;
  truncateTitle?: boolean;
}
