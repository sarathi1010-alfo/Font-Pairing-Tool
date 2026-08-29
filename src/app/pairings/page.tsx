import { constructMetadata } from "@/lib/seo";
import Link from "next/link";
import { getAllPairingSlugs, getPairingMeta } from "@/lib/mdx";

export const metadata = constructMetadata({
  title: "Browse Font Pairings - FontFusion",
  description: "Browse all generated font pairings.",
  path: "/pairings",
});

export default function PairingsPage() {
  const slugs = getAllPairingSlugs();
  const pairings = slugs.map((slug) => getPairingMeta(slug)).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Browse Font Pairings</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Browse page for all generated font pairings.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {pairings.map((pairing) => (
          <div key={pairing?.slug} className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
             <h2 className="text-xl font-bold mb-2">{pairing?.title}</h2>
             <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">{pairing?.description}</p>
             <Link href={`/pairings/${pairing?.slug}`} className="text-indigo-600 hover:underline text-sm font-medium">
               View Pairing
             </Link>
          </div>
        ))}
      </div>
    </div>
  );
}