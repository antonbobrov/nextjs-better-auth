import { useEffect, useRef, type RefObject } from 'react';

export function useAutoScroll<T extends HTMLElement>(
  autoScroll?: boolean,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!autoScroll) {
      return;
    }

    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [autoScroll]);

  return ref;
}
