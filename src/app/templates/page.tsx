import { constructMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Font Pairing Templates - FontFusion",
  description: "Pre-made font pairing templates.",
  path: "/templates",
});

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Font Pairing Templates</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Browse our gallery showcasing pre-made font pairing templates.
        </p>
      </header>
      <div className="text-center mt-12">
        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-base font-medium rounded-md text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}