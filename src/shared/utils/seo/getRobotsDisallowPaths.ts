import { getPathname } from '@/i18n/pathname';
import { routing } from '@/i18n/routing';
import { ROUTES } from '@/shared/config/routes';

const ROBOTS_DISALLOW_ROUTES = [ROUTES.app, ROUTES.auth.index] as const;

export function getRobotsDisallowPaths() {
  return routing.locales.flatMap((locale) =>
    ROBOTS_DISALLOW_ROUTES.flatMap((href) => {
      const pathname = getPathname({ href, locale });

      return [pathname, `${pathname}/*`];
    }),
  );
}
