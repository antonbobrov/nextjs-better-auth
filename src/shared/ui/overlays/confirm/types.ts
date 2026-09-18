import type { ReactNode } from 'react';

import type { TSvgIcon } from '@/types/Icon';

export interface IProps {
  autoFocus?: false | 'cancel' | 'confirm';
  body?: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  form?: ReactNode;
  header: string;
  icon?: TSvgIcon;
  isOpen: boolean;
  isPending?: boolean;
  onConfirm: () => Promise<void>;
  onToggle: (isOpen: boolean) => void;
  status: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  width?: 'fit' | 'default';
}
