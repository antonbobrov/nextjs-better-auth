import type { ReactNode, SVGProps } from 'react';
import type React from 'react';

import type { Button } from '@heroui/react';

export interface IProps extends Omit<Button['Props'], 'children'> {
  children: ReactNode;
  icon?: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
}
