'use client';

import { useEffect } from 'react';

import { createNavigation } from 'next-intl/navigation';
import { useTopLoader } from 'nextjs-toploader';

import { useEvent } from '@/hooks';

import { routing } from './routing';

const {
  Link,
  usePathname,
  useRouter: useIntlRouter,
} = createNavigation(routing);

export { Link, usePathname };

export function useRouter() {
  const router = useIntlRouter();
  const pathname = usePathname();
  const loader = useTopLoader();
  const done = useEvent(() => loader.done());
  const start = useEvent(() => loader.start());

  useEffect(() => {
    done();
  }, [done, pathname]);

  const push: typeof router.push = useEvent((href, options) => {
    if (href !== pathname || options?.locale) {
      start();
    }

    return router.push(href, options);
  });

  const replace: typeof router.replace = useEvent((href, options) => {
    if (href !== pathname || options?.locale) {
      start();
    }

    return router.replace(href, options);
  });

  return {
    ...router,
    push,
    replace,
  };
}
