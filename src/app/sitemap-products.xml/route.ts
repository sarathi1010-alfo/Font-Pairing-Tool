import { getAllFonts, getAllPairs } from '@/lib/fonts';
import { generateCanonicalUrl } from '@/lib/seo-utils';

export const dynamic = 'force-static';

export async function GET() {
  const fonts = getAllFonts().map((font) => ({
    url: generateCanonicalUrl(`/fonts/${font.slug}`),
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const pairs = getAllPairs().map((pair) => ({
    url: generateCanonicalUrl(`/pairs/${pair.slug}`),
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const items = [...fonts, ...pairs];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${items
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
