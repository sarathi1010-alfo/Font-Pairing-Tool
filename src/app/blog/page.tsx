import { constructMetadata } from "@/lib/seo";
import Link from "next/link";
import { getAllBlogSlugs, getBlogMeta } from "@/lib/mdx";

export const metadata = constructMetadata({
  title: "FontFusion Blog – Typography Guides, Font Pairings & Design Inspiration",
  description: "Explore in-depth typography guides, curated font pairings, and design inspiration on the FontFusion blog.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const allSlugs = getAllBlogSlugs();
  const allPosts = allSlugs.map(slug => getBlogMeta(slug)).filter(Boolean) as { slug: string; title: string; description?: string }[];

  // For demonstration, group by some rough logic
  const fundamentals = allPosts.filter(p => p.slug.startsWith("what-is") || p.slug.includes("ultimate-guide"));
  const pairings = allPosts.filter(p => p.slug.includes("pairing-guide") && !p.slug.includes("ultimate"));
  const technical = allPosts.filter(p => p.slug.includes("accessibility"));

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <header className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">FontFusion Blog – Typography Guides, Font Pairings &amp; Design Inspiration</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Welcome to the FontFusion blog, your ultimate resource for mastering digital typography. Whether you&apos;re looking for the fundamental rules of font pairing, exploring industry-specific typographic guides, or diving deep into the technical implementation of web fonts, our expert articles have you covered. Let us help you elevate your design workflow with curated insights and actionable inspiration.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            &larr; Back Home
          </Link>
          <Link href="/generator" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Open Generator
          </Link>
          <Link href="/browse" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Browse Fonts
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">Typography Fundamentals</h2>
          <ul className="space-y-4">
            {fundamentals.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                  {post.slug.includes("ultimate-guide") && <p className="text-sm text-zinc-500 mt-1">Master the art of combining typefaces with our comprehensive pillar guide.</p>}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">Font Pairings &amp; Collections</h2>
          <ul className="space-y-4">
            {pairings.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h3 className="text-xl font-semibold group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">Industry Guides</h2>
          <ul className="space-y-4">
            <li className="text-zinc-500 italic">More guides coming soon...</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">Technical Implementation</h2>
          <ul className="space-y-4">
             {technical.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h3 className="text-xl font-semibold group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
