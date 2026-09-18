import type { MetadataRoute } from 'next';

import { requireEnvSearchable } from '@/env/requireEnvSearchable';
import { SITE_ORIGIN } from '@/shared/config/env';
import { getRobotsDisallowPaths } from '@/utils';

export default function robots(): MetadataRoute.Robots {
  const isSearchable = requireEnvSearchable() === 'true';

  return {
    rules: {
      allow: isSearchable ? '/' : undefined,
      disallow: isSearchable ? ['/*?*', ...getRobotsDisallowPaths()] : '/',
      userAgent: '*',
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
