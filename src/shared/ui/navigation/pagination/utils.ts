import { ELLIPSIS_END, ELLIPSIS_START, SIBLING_COUNT } from './constants';

import type { TPageItem } from './types';

function getVisiblePages(page: number, totalPages: number): number[] {
  const from = Math.max(1, page - SIBLING_COUNT);
  const to = Math.min(totalPages, page + SIBLING_COUNT);
  const pages: number[] = [1];

  for (let value = from; value <= to; value += 1) {
    if (value !== 1 && value !== totalPages) {
      pages.push(value);
    }
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

function insertEllipsis(pages: number[]): TPageItem[] {
  const items: TPageItem[] = [];
  let previousPage: number | undefined;

  for (const currentPage of pages) {
    if (previousPage !== undefined) {
      const gap = currentPage - previousPage;

      if (gap === 2) {
        items.push(previousPage + 1);
      } else if (gap > 2) {
        items.push(previousPage === 1 ? ELLIPSIS_START : ELLIPSIS_END);
      }
    }

    items.push(currentPage);
    previousPage = currentPage;
  }

  return items;
}

export function getPageItems(page: number, totalPages: number): TPageItem[] {
  if (totalPages <= 0) {
    return [];
  }

  return insertEllipsis(getVisiblePages(page, totalPages));
}
