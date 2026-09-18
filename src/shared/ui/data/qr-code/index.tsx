'use client';

import { memo, type FC } from 'react';

import QRCode from 'react-qr-code';

import { cn } from '@/utils';

import type { IProps } from './types';

const Component: FC<IProps> = ({
  className,
  size = 176,
  style,
  title,
  value,
}) => (
  <div
    className={cn('inline-flex rounded-lg bg-white p-2', className)}
    style={style}
  >
    <QRCode
      size={size}
      bgColor="#ffffff"
      fgColor="#000000"
      level="M"
      title={title}
      value={value}
    />
  </div>
);

Component.displayName = 'QrCode';

export const QrCode = memo(Component);
