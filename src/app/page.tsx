import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ArrowRight, Layers, Type } from "lucide-react";
import { getAllPairs } from "@/lib/fonts";
import { DynamicFontLoader } from "@/components/DynamicFontLoader";

export default function Home() {
  const featuredPairs = getAllPairs().slice(0, 4);
  const featuredFonts = featuredPairs.flatMap(p => [p.headingFont, p.bodyFont]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <DynamicFontLoader fontNames={featuredFonts} />

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-zinc-950 dark:text-zinc-50 max-w-4xl mx-auto">
          Find font pairs that look premium, readable, and ready to ship.
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
          A fast, beautiful font pairing tool that helps designers and founders discover, compare, and save the perfect typography combinations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
            <Link href="/generator">
              Try a pairing now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
            <Link href="/browse">
              Browse Fonts
            </Link>
          </Button>
        </div>
      </section>

      {/* Ad Placement */}
      <section className="container mx-auto px-4 mb-20">
        <AdPlaceholder size="728x90" />
      </section>

      {/* Featured Pairings */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Pairings</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Curated combinations for your next project.</p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link href="/browse">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {featuredPairs.map((pair) => (
              <Link key={pair.slug} href={`/pairs/${pair.slug}`} className="group block">
                <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 h-full">
                  <div className="flex justify-between items-start mb-6 text-sm text-zinc-500">
                    <div className="flex gap-2">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{pair.headingFont}</span>
                      <span>&</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{pair.bodyFont}</span>
                    </div>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {pair.mood.slice(0, 2).map(m => (
                        <span key={m} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs capitalize">{m}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3
                      className="text-4xl font-bold mb-4 leading-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-2"
                      style={{ fontFamily: `"${pair.headingFont}", sans-serif` }}
                    >
                      Design that speaks for itself.
                    </h3>
                    <p
                      className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3"
                      style={{ fontFamily: `"${pair.bodyFont}", sans-serif` }}
                    >
                      Good typography is transparent. It communicates the message without drawing attention to the letters themselves. When pairing fonts, contrast is your most powerful tool.
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Blocks */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
              <Layers className="h-8 w-8 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h3 className="text-xl font-bold mb-3">Browse & Compare</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Instantly see how different typefaces interact. Filter by mood, style, and use-case to find the perfect match.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
              <Type className="h-8 w-8 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Preview</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Test your chosen pairs on real UI elements and long-form copy to ensure readability and hierarchy.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
              <ArrowRight className="h-8 w-8 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h3 className="text-xl font-bold mb-3">Ready to Ship</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Copy the CSS directly or get the Google Fonts import links. Your perfect typography stack, ready in seconds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
