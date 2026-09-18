import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { hasLocale } from 'next-intl';
import createMiddleware from 'next-intl/middleware';

import { getPathname } from '@/i18n/pathname';
import { routing } from '@/i18n/routing';
import { authServer } from '@/lib/auth/server';
import { ROUTES } from '@/shared/config/routes';

const handleI18nRouting = createMiddleware(routing);

function splitLocale(pathname: string) {
  const [, maybeLocale, ...rest] = pathname.split('/');

  if (hasLocale(routing.locales, maybeLocale)) {
    return {
      locale: maybeLocale,
      pathname: rest.length ? `/${rest.join('/')}` : '/',
    };
  }

  return {
    locale: routing.defaultLocale,
    pathname,
  };
}

function isAppPath(pathname: string) {
  return pathname === ROUTES.app || pathname.startsWith(`${ROUTES.app}/`);
}

function isAuthPath(pathname: string) {
  const pathnames = Object.values(ROUTES.auth);

  return pathnames.some((path) => path === pathname);
}

export async function proxy(request: NextRequest) {
  const { locale, pathname } = splitLocale(request.nextUrl.pathname);

  const session = await authServer.api.getSession({
    headers: await headers(),
  });

  if (isAppPath(pathname) && !session) {
    return NextResponse.redirect(
      new URL(getPathname({ href: ROUTES.auth.signIn(), locale }), request.url),
    );
  }

  if (isAuthPath(pathname) && session) {
    return NextResponse.redirect(
      new URL(getPathname({ href: ROUTES.app, locale }), request.url),
    );
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
