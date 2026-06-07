import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

import { SITE_URL } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/favorites'], // Don't index local user state pages
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
