import { getAllSeoSlugs, getSeoMeta } from "@/lib/mdx";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "SEO Guides & Typography Trends",
  description: "Explore the latest typography trends and best fonts across different countries and use cases.",
  path: "/seo",
});

export default function SeoIndexPage() {
  const slugs = getAllSeoSlugs();
  const guides = slugs
    .map((slug) => getSeoMeta(slug))
    .filter((meta): meta is NonNullable<typeof meta> => meta !== null);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Typography Trends Worldwide</h1>
        <p className="text-xl text-zinc-500">
          Discover the best font choices and typography trends tailored for different regions and use cases.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/seo/${guide.slug}`}
            className="block p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">{guide.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
