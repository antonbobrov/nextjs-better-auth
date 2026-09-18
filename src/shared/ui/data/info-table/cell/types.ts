import type { TSvgIcon } from '@/types/Icon';

export type TInfoTableItem = {
  copyable?: boolean;
  icon: TSvgIcon;
  label: string;
  title?: string;
  value: string | null | undefined;
};

export interface IProps {
  clearBottomBorder?: boolean;
  item: TInfoTableItem;
  oddBorder?: boolean;
}
