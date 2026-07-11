import { getAllBlogSlugs, getBlogMeta } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "FontFusion Blog | Typography Trends & Design Insights",
  description: "Stay ahead of the curve with the latest typography trends, font pairing guides, and design insights from the FontFusion team.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogMeta(slug))
    .filter((post): post is NonNullable<typeof post> => post !== null);

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">The FontFusion Blog</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Expert advice on typography, font pairing, and digital design. We help you choose fonts that speak to your audience.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg bg-white dark:bg-zinc-950"
          >
            <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
               <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Jan 2026</span>
               </div>
               <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>FontFusion Team</span>
               </div>
            </div>
            <h2 className="text-xl font-bold mb-3 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-2">
              {post.title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3 text-sm leading-relaxed">
              {post.description}
            </p>
            <div className="mt-auto flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Read Article <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
           <p className="text-zinc-500">New articles coming soon. Stay tuned!</p>
        </div>
      )}
    </div>
  );
}
