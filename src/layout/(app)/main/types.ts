import type { PropsWithChildren } from 'react';

type TAppMainVariant = 'default' | 'flush';

export interface IProps extends PropsWithChildren {
  variant?: TAppMainVariant;
}
