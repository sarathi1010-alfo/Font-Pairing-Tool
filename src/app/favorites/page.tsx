"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/storage";
import { getAllPairs } from "@/lib/fonts";
import { DynamicFontLoader } from "@/components/DynamicFontLoader";
import { Button } from "@/components/ui/button";
import { HeartOff, ArrowRight } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isLoaded } = useFavorites();
  const allPairs = getAllPairs();

  const favoritePairs = allPairs.filter(pair => favorites.includes(pair.slug));
  const fontsToLoad = favoritePairs.flatMap(p => [p.headingFont, p.bodyFont]);

  if (!isLoaded) {
    return <div className="container mx-auto px-4 py-20 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <DynamicFontLoader fontNames={fontsToLoad} />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-zinc-950 dark:text-zinc-50">Saved Pairings</h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Your personal collection of typography combinations. Saved locally to your browser.
        </p>
      </div>

      {favoritePairs.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 border-dashed">
          <p className="text-zinc-500 mb-6">You haven&apos;t saved any font pairings yet.</p>
          <Button asChild>
            <Link href="/generator">
              Discover Pairings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritePairs.map((pair) => (
            <div key={pair.slug} className="group flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 h-full">
              <div className="flex justify-between items-start mb-6 text-sm text-zinc-500">
                <div className="flex gap-2">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{pair.headingFont}</span>
                  <span>&</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{pair.bodyFont}</span>
                </div>
                <button
                  onClick={() => toggleFavorite(pair.slug)}
                  className="text-zinc-400 hover:text-red-500 transition-colors"
                  aria-label="Remove from favorites"
                >
                  <HeartOff className="h-5 w-5" />
                </button>
              </div>

              <Link href={`/pairs/${pair.slug}`} className="block flex-1 mb-6">
                <h3
                  className="text-3xl font-bold mb-4 leading-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-2"
                  style={{ fontFamily: `"${pair.headingFont}", sans-serif` }}
                >
                  Design that speaks for itself.
                </h3>
                <p
                  className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3"
                  style={{ fontFamily: `"${pair.bodyFont}", sans-serif` }}
                >
                  Good typography is transparent. It communicates the message without drawing attention to the letters themselves. When pairing fonts, contrast is your most powerful tool.
                </p>
              </Link>

              <div className="mt-auto flex gap-2">
                <Button asChild variant="secondary" className="flex-1">
                  <Link href={`/generator?pair=${pair.slug}`}>
                    Open in Generator
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
