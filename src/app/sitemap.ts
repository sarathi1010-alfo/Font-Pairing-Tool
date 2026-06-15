import { MetadataRoute } from 'next';
import { getAllFonts, getAllPairs } from '@/lib/fonts';
import { getAllGuideSlugs } from '@/lib/mdx';

export const dynamic = 'force-static';

import { SITE_URL } from '@/lib/config';

// Example dynamic sub-sitemaps could be supported here by reading the "id" param if generating multiple sitemaps.
// For now, this is a monolithic sitemap, but prepared for segmentation.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fontpair.alfo.online";

  const fonts = getAllFonts().map((font) => ({
    url: `${baseUrl}/fonts/${font.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const pairs = getAllPairs().map((pair) => ({
    url: `${baseUrl}/pairs/${pair.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const guides = getAllGuideSlugs().map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Potential tools sitemap addition when tools are populated
  const tools = [
    {
      url: `${baseUrl}/tools/contrast`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ];

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/generator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/browse`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
 seo-architecture-infrastructure-3788948891916168940
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,

      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
 jules-1134815465466981712-097bc9f0
    },
  ];

  return [...staticPages, ...fonts, ...pairs, ...guides, ...tools];
}
