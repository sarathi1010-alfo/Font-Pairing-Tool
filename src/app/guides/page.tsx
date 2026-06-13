import { getAllGuideSlugs, getGuideMeta } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Typography Guides & Tutorials | FontPair",
  description: "Learn how to pair fonts, understand typography basics, and improve your design skills with our comprehensive guides.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  const slugs = getAllGuideSlugs();
  const guides = slugs.map(slug => getGuideMeta(slug)).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-16">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">Typography Guides</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Learn the principles of typography, discover the best font combinations for specific use cases, and elevate your design skills.
        </p>
      </header>

      <div className="grid gap-8">
        {guides.map((guide) => (
          <Link
            key={guide!.slug}
            href={`/guides/${guide!.slug}`}
            className="group block p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-950"
          >
            <h2 className="text-2xl font-bold mb-3 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              {guide!.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
              {guide!.description}
            </p>
            <div className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Read Guide <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
