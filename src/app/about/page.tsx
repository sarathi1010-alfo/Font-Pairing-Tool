import { constructMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "About FontFusion - Your Typography Pairing Partner",
  description: "Learn more about FontFusion's mission to help designers and founders find the perfect typography combinations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">About FontFusion – Your Typography Pairing Partner</h1>
      </header>

      <section className="prose prose-zinc dark:prose-invert max-w-none text-lg leading-relaxed">
        <p>
          At FontFusion, our mission is to empower designers, founders, and creators to discover the perfect typography combinations effortlessly. Finding the right font pairing shouldn&apos;t be a tedious process of trial and error. We&apos;ve built an intelligent, seamless tool that helps you instantly preview, compare, and save open-source fonts. Our purpose goes beyond simply displaying typefaces; we aim to educate and inspire our users to make informed, confident design decisions that elevate their digital projects.
        </p>
        <p>
          Typography is the foundational element of any digital experience. It communicates tone, establishes hierarchy, and ensures readability across all devices. Our curated collections of Google Fonts are categorized by mood, industry, and use case, allowing you to focus on what matters most—designing beautiful, impactful products. We are deeply committed to providing an accessible, robust platform where creativity thrives. Our features include live previews, extensive filtering options, and instant CSS/Google Fonts code generation to seamlessly integrate chosen typography into your codebase.
        </p>
        <p>
          Whether you&apos;re building a tech startup, a luxury brand, or a personal blog, FontFusion provides the typographic clarity you need. Our comprehensive font generator removes the guesswork, offering expertly crafted pairings and immediate exports to streamline your daily workflow. By bridging the gap between aesthetic beauty and technical implementation, we ensure that every designer has the resources they need to create cohesive, stunning digital environments.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-base font-medium rounded-md text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            Back to Homepage
          </Link>
          <Link href="/generator" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
            Try the Generator
          </Link>
        </div>
      </section>
    </div>
  );
}
