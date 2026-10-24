import { constructMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "About FontFusion – Your Typography Pairing Partner",
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
          At FontFusion, our core mission is simple yet powerful: we are dedicated to helping designers, founders, and developers find the perfect font pairings for their digital projects. We understand that typography is the bedrock of visual communication, and selecting the right combination can elevate a good design into a great one. We offer an intuitive, powerful tool designed to eliminate the guesswork and frustration typically associated with typographic selection. Our platform enables users to instantly preview, compare, and save high-quality, open-source fonts tailored to their specific needs.
        </p>
        <p>
          We believe that excellent design should be accessible to everyone. By curating extensive collections of fonts based on mood, industry, and practical use case, we provide a streamlined workflow that saves you time and sparks creativity. We are committed to maintaining a robust, continuously updated library of typographic resources and educational guides. Whether you are building a modern SaaS dashboard, a luxury e-commerce brand, or an elegant editorial blog, FontFusion equips you with the insights and tools necessary to make confident, professional design decisions.
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
