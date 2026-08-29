import { constructMetadata } from "@/lib/seo";
import Link from "next/link";
import { getAllFonts } from "@/lib/fonts";

export const metadata = constructMetadata({
  title: "Font Directory - FontFusion",
  description: "Directory listing all available fonts with categories.",
  path: "/fonts",
});

export default function FontsPage() {
  const fonts = getAllFonts();

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Font Directory</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Directory listing all available fonts with categories.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {fonts.map((font) => (
          <div key={font.slug} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
             <h2 className="text-xl font-bold">{font.name}</h2>
             <p className="text-sm text-zinc-500 capitalize">{font.category}</p>
             <Link href={`/fonts/${font.slug}`} className="text-indigo-600 hover:underline mt-2 inline-block text-sm">
               View Font
             </Link>
          </div>
        ))}
      </div>
    </div>
  );
}