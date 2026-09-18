'use client';

import { memo, type FC } from 'react';

import { Chip } from '@heroui/react';
import { useTranslations } from 'next-intl';

import type { IProps } from './types';

const Component: FC<IProps> = ({ color = 'success', value }) => {
  const t = useTranslations('common');

  return (
    <Chip size="sm" color={value ? color : 'default'} variant="soft">
      {value ? t('yes') : t('no')}
    </Chip>
  );
};

Component.displayName = 'BooleanChip';

export const BooleanChip = memo(Component);
