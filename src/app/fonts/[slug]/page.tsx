import { notFound } from "next/navigation";
import { getAllFonts, getFontBySlug } from "@/lib/fonts";
import { DynamicFontLoader } from "@/components/DynamicFontLoader";
import { constructMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  const fonts = getAllFonts();
  return fonts.map((font) => ({
    slug: font.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  if (!slug) return { title: 'Font Not Found' };

  const font = getFontBySlug(slug);
  if (!font) return { title: 'Font Not Found' };

  return constructMetadata({
    title: `${font.name} Font Details, Pairings & Alternatives | FontPair`,
    description: `Discover the best font pairings, use cases, and design details for ${font.name}, a popular ${font.category} typeface.`,
    path: `/fonts/${slug}`,
  });
}

export default async function FontDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  if (!slug) notFound();

  const font = getFontBySlug(slug);

  if (!font) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <DynamicFontLoader fontNames={[font.name]} />

      <div className="mb-12">
        <Link href="/browse" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center mb-6">
          ← Back to all fonts
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-5xl font-bold">{font.name}</h1>
          <Badge variant="secondary" className="capitalize text-sm px-3 py-1">{font.category}</Badge>
        </div>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          A versatile {font.category} typeface ideal for {font.bestFor.slice(0, 2).join(' and ')}.
        </p>
      </div>

      <div className="p-8 md:p-16 border border-zinc-200 dark:border-zinc-800 rounded-2xl mb-16 overflow-hidden bg-white dark:bg-zinc-950">
        <div
          className="text-8xl md:text-[150px] leading-none mb-8 text-zinc-900 dark:text-zinc-50"
          style={{ fontFamily: `"${font.name}", sans-serif` }}
        >
          Aa
        </div>
        <div
          className="text-3xl md:text-5xl leading-tight mb-8"
          style={{ fontFamily: `"${font.name}", sans-serif` }}
        >
          The quick brown fox jumps over the lazy dog.
        </div>
        <div
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
          style={{ fontFamily: `"${font.name}", sans-serif` }}
        >
          0123456789 !@#$%^&amp;*()_+-=[]&#123;&#125;|;:&apos;,./&lt;&gt;?
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Characteristics</h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-zinc-500 mb-1">Available Weights</div>
              <div className="flex gap-2 flex-wrap">
                {font.weights.map(w => (
                  <Badge key={w} variant="outline">{w}</Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-zinc-500 mb-1">Mood & Vibe</div>
              <div className="flex gap-2 flex-wrap">
                {font.mood.map(m => (
                  <Badge key={m} variant="secondary" className="capitalize">{m}</Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-zinc-500 mb-1">Best Used For</div>
              <div className="flex gap-2 flex-wrap">
                {font.bestFor.map(b => (
                  <Badge key={b} variant="outline" className="capitalize border-dashed">{b}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Best Partners</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            {font.name} pairs exceptionally well with these typefaces:
          </p>
          <div className="flex flex-col gap-3">
            {font.partners.map(partnerSlug => {
              // We would ideally fetch the actual partner name from data, but for now format slug
              const partnerName = partnerSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
              return (
                <Link
                  key={partnerSlug}
                  href={`/fonts/${partnerSlug}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <span className="font-medium">{partnerName}</span>
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
