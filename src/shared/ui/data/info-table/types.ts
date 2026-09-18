import type { TInfoTableItem } from './cell/types';

export interface IProps {
  columns?: 1 | 2;
  items: TInfoTableItem[];
}
