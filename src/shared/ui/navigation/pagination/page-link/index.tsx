'use client';

import { memo, type FC } from 'react';

import { Pagination as HeroUiPagination } from '@heroui/react';

import { useEvent } from '@/hooks';

import type { IProps } from './types';

const Component: FC<IProps> = ({ isActive, page, onPageChange }) => {
  const handlePress = useEvent(() => onPageChange(page));

  return (
    <HeroUiPagination.Item>
      <HeroUiPagination.Link isActive={isActive} onPress={handlePress}>
        {page}
      </HeroUiPagination.Link>
    </HeroUiPagination.Item>
  );
};

Component.displayName = 'PageLink';

export const PageLink = memo(Component);
