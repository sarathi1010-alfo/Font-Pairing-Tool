import { getAllGuideSlugs, getAllSeoSlugs } from '@/lib/mdx';
import { generateCanonicalUrl } from '@/lib/seo-utils';

export const dynamic = 'force-static';

export async function GET() {
  const guides = getAllGuideSlugs().map((slug) => ({
    url: generateCanonicalUrl(`/guides/${slug}`),
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const seoPages = getAllSeoSlugs().map((slug) => ({
    url: generateCanonicalUrl(`/seo/${slug}`),
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const allArticles = [...guides, ...seoPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allArticles
    .map(
      (item) => `
    <url>
      <loc>${item.url}</loc>
      <lastmod>${item.lastModified}</lastmod>
      <changefreq>${item.changeFrequency}</changefreq>
      <priority>${item.priority}</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
