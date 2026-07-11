import { getAllPairingSlugs, getPairingMeta } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Font Pairing Collections | Curated Typography Inspiration",
  description: "Browse our curated collections of font pairings organized by mood, industry, and style. Find the perfect typography for your next project.",
  path: "/pairings",
});

export default function PairingsIndexPage() {
  const slugs = getAllPairingSlugs();
  const pairings = slugs
    .map((slug) => getPairingMeta(slug))
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <header className="mb-16">
        <div className="flex items-center gap-2 text-zinc-500 mb-4 font-medium">
           <Sparkles className="h-4 w-4" />
           <span>Curated Collections</span>
        </div>
        <h1 className="text-5xl font-bold mb-6 tracking-tight">Typography Pairings</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Expertly selected font combinations for every use case. From modern tech startups to elegant luxury brands, we've done the work of finding fonts that look beautiful together.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pairings.map((pairing) => (
          <Link
            key={pairing.slug}
            href={`/pairings/${pairing.slug}`}
            className="group block p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all bg-white dark:bg-zinc-950 hover:shadow-md"
          >
            <h2 className="text-2xl font-bold mb-3 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              {pairing.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              {pairing.description}
            </p>
            <div className="flex items-center text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Explore Collection <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {pairings.length === 0 && (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
           <p className="text-zinc-500">We are currently curating new collections. Check back soon!</p>
        </div>
      )}

      <div className="mt-20 p-12 bg-zinc-900 text-white rounded-3xl text-center">
         <h3 className="text-3xl font-bold mb-4">Didn't find what you're looking for?</h3>
         <p className="text-zinc-400 mb-10 text-lg">Use our interactive generator to create your own unique font pairings.</p>
         <Link href="/generator" className="inline-flex items-center justify-center px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors">
            Open Font Generator
         </Link>
      </div>
    </div>
  );
}
