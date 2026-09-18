import type { AriaAttributes, ReactNode } from 'react';

import type { IProps as IButtonProps } from '@/ui/primitives/button/types';

type TPickedProps = Pick<
  IButtonProps,
  'isDisabled' | 'isPending' | 'onPress' | 'variant' | 'className' | 'style'
>;

export interface IProps extends TPickedProps, AriaAttributes {
  children: ReactNode;
  href?: string;
  label?: string;
}
