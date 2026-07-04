import { getAllBlogSlugs, getBlogMeta } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "FontFusion Blog | Typography Insights & Design Trends",
  description: "Stay ahead of the curve with our latest articles on typography, font pairing, and digital design trends.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const slugs = getAllBlogSlugs();
  const posts = slugs.map(slug => getBlogMeta(slug)).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-16">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">FontFusion Blog</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          In-depth articles, design theories, and the latest news from the world of typography.
        </p>
      </header>

      <div className="grid gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post!.slug}
              href={`/blog/${post!.slug}`}
              className="group block p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-950"
            >
              <h2 className="text-2xl font-bold mb-3 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                {post!.title}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                {post!.description}
              </p>
              <div className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Read Article <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-zinc-500">No blog posts found. Check back soon!</p>
        )}
      </div>
    </div>
  );
}
