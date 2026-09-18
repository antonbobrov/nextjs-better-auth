import type { IComponent } from '@/types/Component';

interface IAction {
  href: string;
  label: string;
}

export interface IEmailProps {
  actions?: IAction[];
  body: string | string[];
  companyName: string;
  footnote?: string;
  heading: string;
  preview: string;
}

export interface IMultilineTextProps extends IComponent {
  children: string;
}
