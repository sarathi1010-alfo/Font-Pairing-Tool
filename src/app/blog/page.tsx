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

  const fundamentals = allPosts.filter(p => p.slug.startsWith("what-is") || p.slug.includes("ultimate-guide") || p.slug.includes("typography-psychology-guide"));
  const pairings = allPosts.filter(p => p.slug.includes("pairing-guide") && !p.slug.includes("ultimate"));
  const technical = allPosts.filter(p => p.slug.includes("accessibility") || p.slug.includes("variable"));
  const industryGuides = allPosts.filter(p => !fundamentals.includes(p) && !pairings.includes(p) && !technical.includes(p));

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <header className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">FontFusion Blog – Typography Guides, Font Pairings &amp; Design Inspiration</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Welcome to the FontFusion blog, your ultimate resource for mastering digital typography. This blog is designed to provide immense value to designers, developers, and founders who want to elevate their projects through exceptional typography. We offer comprehensive guides that demystify complex typographic concepts, practical tutorials on technical implementation, and highly curated collections of font pairings tailored for specific industries and moods. Whether you are looking to understand the nuances of x-height and leading, seeking the perfect serif and sans-serif combination for your next SaaS application, or learning how to implement variable fonts for optimal web performance, you will find expert insights and actionable inspiration here. Dive into our categories below to discover the knowledge you need to make confident, professional design decisions.
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
            <li>
              <Link href="/blog/ultimate-guide-to-font-pairing-2026" className="group block">
                <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">The Ultimate 2026 Guide to Font Pairing</h3>
                <p className="text-sm text-zinc-500 mt-1">Everything you need to know about combining typefaces effectively. From typography fundamentals to advanced font pairing strategies.</p>
              </Link>
            </li>
            <li>
              <Link href="/blog/what-is-font-pairing" className="group block">
                <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">What is Font Pairing?</h3>
                <p className="text-sm text-zinc-500 mt-1">Font pairing is the crucial art of combining different typefaces within a design project to create a...</p>
              </Link>
            </li>
            <li>
              <Link href="/blog/what-is-contrast-in-typography" className="group block">
                <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">What is Contrast in Typography?</h3>
                <p className="text-sm text-zinc-500 mt-1">Typography contrast refers to the distinct visual differences between various elements of text within a design...</p>
              </Link>
            </li>
            <li>
              <Link href="/blog/what-is-a-serif-font" className="group block">
                <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">What is a Serif Font?</h3>
                <p className="text-sm text-zinc-500 mt-1">A serif font is a typeface characterized by the small, decorative strokes or lines—known as serifs...</p>
              </Link>
            </li>
            <li>
              <Link href="/blog/what-is-a-sans-serif-font" className="group block">
                <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">What is a Sans-Serif Font?</h3>
                <p className="text-sm text-zinc-500 mt-1">A sans-serif font is a typeface that completely lacks the small decorative strokes—or serifs—at the ends...</p>
              </Link>
            </li>
            <li>
              <Link href="/blog/what-is-leading" className="group block">
                <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">What is Leading?</h3>
                <p className="text-sm text-zinc-500 mt-1">Leading, also known as line height, is the vertical space between the baselines of successive lines...</p>
              </Link>
            </li>
            {fundamentals.filter(p => !["ultimate-guide-to-font-pairing-2026", "what-is-font-pairing", "what-is-contrast-in-typography", "what-is-a-serif-font", "what-is-a-sans-serif-font", "what-is-leading"].includes(p.slug)).map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{post.description}</p>
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
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">Industry Guides &amp; Overviews</h2>
          <ul className="space-y-4">
            {industryGuides.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">Technical Implementation</h2>
          <ul className="space-y-4">
             {technical.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">{post.title}</h3>
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
