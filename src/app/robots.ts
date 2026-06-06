import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/favorites'], // Don't index local user state pages
    },
    sitemap: 'https://fontpairing.com/sitemap.xml',
  };
}
