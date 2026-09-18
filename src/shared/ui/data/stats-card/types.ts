import type { ReactNode, SVGProps } from 'react';
import type React from 'react';

export interface IProps {
  href?: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  onPress?: () => void;
  title: string;
  value: ReactNode;
}
