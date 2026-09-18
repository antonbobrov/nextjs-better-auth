import type { FC } from 'react';

import type { IProps } from './types';

export const TagName: FC<IProps> = ({ tagName: Tag, ...props }) => (
  <Tag {...(props as any)} />
);
