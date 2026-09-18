import { routing } from '@/i18n/routing';
import { SITE_ORIGIN } from '@/shared/config/env';

type TPage = {
  lastModified: Date;
  priority: number;
  url: string;
};

function createSitemapObject(href: string, priority: number): TPage {
  return {
    priority,
    lastModified: new Date(),
    url: SITE_ORIGIN + href,
  };
}

export default async function sitemap() {
  const pages: TPage[] = [];

  const addPage = (page: TPage) => {
    try {
      const newUrl = new URL(page.url);
      const newPathname = newUrl.pathname;

      const has = pages.find((p) => {
        const currentUrl = new URL(p.url);
        const currentPathname = currentUrl.pathname;

        return newPathname === currentPathname;
      });

      if (!has) {
        pages.push(page);
      }
    } catch {
      //
    }
  };

  await Promise.all(
    routing.locales.map(async (locale) => {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;

      addPage(createSitemapObject(`${prefix}/`, 1));
    }),
  );

  return pages;
}
