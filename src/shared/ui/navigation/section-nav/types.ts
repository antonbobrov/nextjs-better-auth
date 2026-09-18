import type { IComponent } from '@/types/Component';
import type { TSvgIcon } from '@/types/Icon';

export type TNavLink<T extends string = string> = {
  href: string;
  icon: TSvgIcon;
  name: T;
};

export interface IProps extends IComponent {
  items: TNavLink[];
  label: string;
  pathname: string;
}
