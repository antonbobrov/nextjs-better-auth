'use client';

import { memo, type FC } from 'react';

import { Pagination as HeroUiPagination } from '@heroui/react';

import { useEvent } from '@/hooks';

import { Ellipsis } from './ellipsis';
import { PageLink } from './page-link';
import { getPageItems } from './utils';

import type { IProps } from './types';

const Component: FC<IProps> = ({ page, pageSize, total, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const pageItems = getPageItems(page, totalPages);

  const handlePrev = useEvent(() => onPageChange(Math.max(1, page - 1)));

  const handleNext = useEvent(() =>
    onPageChange(Math.min(totalPages, page + 1)),
  );

  return (
    <HeroUiPagination size="sm">
      <HeroUiPagination.Summary>
        {`${start} to ${end} of ${total} results`}
      </HeroUiPagination.Summary>

      <HeroUiPagination.Content>
        <HeroUiPagination.Item>
          <HeroUiPagination.Previous
            isDisabled={page === 1}
            onPress={handlePrev}
          >
            <HeroUiPagination.PreviousIcon />
            Prev
          </HeroUiPagination.Previous>
        </HeroUiPagination.Item>

        {pageItems.map((item) =>
          typeof item === 'string' ? (
            <Ellipsis key={item} />
          ) : (
            <PageLink
              key={item}
              isActive={item === page}
              page={item}
              onPageChange={onPageChange}
            />
          ),
        )}

        <HeroUiPagination.Item>
          <HeroUiPagination.Next
            isDisabled={page === totalPages}
            onPress={handleNext}
          >
            Next
            <HeroUiPagination.NextIcon />
          </HeroUiPagination.Next>
        </HeroUiPagination.Item>
      </HeroUiPagination.Content>
    </HeroUiPagination>
  );
};

Component.displayName = 'Pagination';

export const Pagination = memo(Component);
