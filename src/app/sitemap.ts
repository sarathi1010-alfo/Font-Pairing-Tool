import { MetadataRoute } from 'next';
import { generateCanonicalUrl } from '@/lib/seo-utils';
import { getAllSeoSlugs } from '@/lib/mdx';

export const dynamic = 'force-static';

export async function generateSitemaps() {
  // Return exactly 1000 items, id ranges from 0 to 999
  return Array.from({ length: 1000 }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number | Promise<number> | any }): Promise<MetadataRoute.Sitemap> {
  const resolvedId = await id;

  const tools = [
    {
      url: generateCanonicalUrl('/tools/contrast'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: generateCanonicalUrl('/seo'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
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

  const baseUrls = resolvedId === 0 ? [...staticPages, ...tools] : [];

  const slugs = getAllSeoSlugs();
  const chunkSize = Math.ceil(slugs.length / 1000);

  const start = resolvedId * chunkSize;
  const end = start + chunkSize;

  const chunkedSlugs = slugs.slice(start, end);

  const dynamicUrls = chunkedSlugs.map(slug => ({
    url: generateCanonicalUrl(`/seo/${slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...baseUrls, ...dynamicUrls];
}
