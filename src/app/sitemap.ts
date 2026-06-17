import { MetadataRoute } from 'next';
import { getAllFonts, getAllPairs } from '@/lib/fonts';
import { getAllGuideSlugs } from '@/lib/mdx';
import { generateCanonicalUrl } from '@/lib/seo-utils';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {

  const fonts = getAllFonts().map((font) => ({
    url: generateCanonicalUrl(`/fonts/${font.slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const pairs = getAllPairs().map((pair) => ({
    url: generateCanonicalUrl(`/pairs/${pair.slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const guides = getAllGuideSlugs().map((slug) => ({
    url: generateCanonicalUrl(`/guides/${slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const tools = [
    {
      url: generateCanonicalUrl('/tools/contrast'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ];

  const staticPages = [
    {
      url: generateCanonicalUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: generateCanonicalUrl('/generator'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: generateCanonicalUrl('/browse'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: generateCanonicalUrl('/compare'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: generateCanonicalUrl('/guides'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: generateCanonicalUrl('/tools'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: generateCanonicalUrl('/privacy-policy'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: generateCanonicalUrl('/terms-and-conditions'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: generateCanonicalUrl('/contact'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...fonts, ...pairs, ...guides, ...tools];
}
