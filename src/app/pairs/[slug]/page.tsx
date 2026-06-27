import { notFound } from "next/navigation";
import { getAllPairs, getPairBySlug } from "@/lib/fonts";
import { DynamicFontLoader } from "@/components/DynamicFontLoader";
import { constructMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

export function generateStaticParams() {
  const pairs = getAllPairs();
  return pairs.map((pair) => ({
    slug: pair.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  if (!slug) return { title: 'Pairing Not Found' };

  const pair = getPairBySlug(slug);
  if (!pair) return { title: 'Pairing Not Found' };

  return constructMetadata({
    title: `${pair.headingFont} & ${pair.bodyFont} Font Pairing | FontFusion`,
    description: `Discover why ${pair.headingFont} and ${pair.bodyFont} make a perfect typography combination. Explore live previews and CSS snippets.`,
    path: `/pairs/${slug}`,
  });
}

export default async function PairDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  if (!slug) notFound();

  const pair = getPairBySlug(slug);

  if (!pair) {
    notFound();
  }

  const fontsToLoad = [pair.headingFont, pair.bodyFont];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
      <DynamicFontLoader fontNames={fontsToLoad} />

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            {pair.headingFont} <span className="text-zinc-400 font-light">&</span> {pair.bodyFont}
          </h1>
        </div>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
          {pair.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {pair.mood.map(m => (
            <Badge key={m} variant="secondary" className="capitalize">{m}</Badge>
          ))}
          {pair.useCases.map(uc => (
            <Badge key={uc} variant="outline" className="capitalize border-dashed">{uc}</Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-12">
        <Button asChild size="lg">
          <Link href={`/generator?pair=${pair.slug}`}>
            <SlidersHorizontal className="mr-2 h-5 w-5" />
            Open in Generator
          </Link>
        </Button>
      </div>

      <div className="p-8 md:p-16 border border-zinc-200 dark:border-zinc-800 rounded-2xl mb-16 bg-white dark:bg-zinc-950">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2
              className="text-5xl md:text-6xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: `"${pair.headingFont}", sans-serif` }}
            >
              The digital experience of the future.
            </h2>
            <p
              className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
              style={{ fontFamily: `"${pair.bodyFont}", sans-serif` }}
            >
              Typography is the craft of endowing human language with a durable visual form. Good typography communicates its message clearly, while great typography captures the emotion of the content.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-100 dark:border-zinc-800/50">
            <div>
              <div className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider">Heading Font</div>
              <Link href={`/fonts/${pair.headingFont.toLowerCase().replace(/ /g, '-')}`} className="text-lg font-semibold hover:underline flex items-center group">
                {pair.headingFont}
                <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider">Body Font</div>
              <Link href={`/fonts/${pair.bodyFont.toLowerCase().replace(/ /g, '-')}`} className="text-lg font-semibold hover:underline flex items-center group">
                {pair.bodyFont}
                <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Quick Integration</h3>
        <div className="bg-zinc-950 text-zinc-50 p-6 rounded-xl overflow-x-auto">
          <pre className="text-sm">
            <code>
{`/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=${pair.headingFont.replace(/ /g, '+')}:wght@400;700&family=${pair.bodyFont.replace(/ /g, '+')}:wght@400;500&display=swap');

/* CSS Variables */
:root {
  --font-heading: '${pair.headingFont}', serif;
  --font-body: '${pair.bodyFont}', sans-serif;
}

/* Base Styles */
h1, h2, h3, h4 {
  font-family: var(--font-heading);
}

body {
  font-family: var(--font-body);
}`}
            </code>
          </pre>
        </div>
      </div>

    </div>
  );
}
