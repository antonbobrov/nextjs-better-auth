'use client';

import { memo, type FC } from 'react';

import { Pagination as HeroUiPagination } from '@heroui/react';

const Component: FC = () => (
  <HeroUiPagination.Item>
    <HeroUiPagination.Ellipsis />
  </HeroUiPagination.Item>
);

Component.displayName = 'Ellipsis';

export const Ellipsis = memo(Component);
