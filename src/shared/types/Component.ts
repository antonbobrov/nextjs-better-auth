import type { CSSProperties, ReactElement } from 'react';

export interface IComponent {
  className?: string;
  style?: CSSProperties;
}

type TActionChildrenProps = {
  isPending?: boolean;
  onPress: () => void;
};

export type TActionChildren = ReactElement<TActionChildrenProps>;

type TClickChildrenProps = {
  onClick: () => void;
};

export type TClickChildren = ReactElement<TClickChildrenProps>;
