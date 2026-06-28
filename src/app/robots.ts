import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/tools/'],
      disallow: [
        '/favorites',      // Don't index local user state pages
        '/api/',           // Block API routes
        '/_next/',         // Block Next.js build output
        '/admin/',         // Future admin paths
      ],
    },
    sitemap: 'https://fontfusion.alfo.online/sitemap.xml',
  };
}
