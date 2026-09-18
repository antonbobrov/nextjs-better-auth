import type { FC } from 'react';

import type { IProps } from './types';

export const Screen: FC<IProps> = ({ title }) => (
  <h1 className="text-xl font-semibold leading-tight">{title}</h1>
);
