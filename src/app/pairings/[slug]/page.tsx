import { notFound } from "next/navigation";
import { getAllPairingSlugs, getPairingMeta } from "@/lib/mdx";
import fs from "fs";
import path from "path";
import { constructMetadata } from "@/lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  const slugs = getAllPairingSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  if (!slug) return { title: 'Pairing Not Found' };

  const meta = getPairingMeta(slug);
  if (!meta) return { title: 'Pairing Not Found' };

  return constructMetadata({
    title: `${meta.title} | FontFusion Pairings`,
    description: meta.description,
    path: `/pairings/${slug}`,
  });
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-4xl md:text-5xl font-bold mt-12 mb-6 tracking-tight" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-3xl font-bold mt-12 mb-4 tracking-tight" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-2xl font-bold mt-8 mb-4 tracking-tight" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-zinc-700 dark:text-zinc-300" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-zinc-900 dark:text-zinc-50" {...props} />,
};

export default async function PairingPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  if (!slug) notFound();

  let fileContent;
  let meta;
  try {
    const filePath = path.join(process.cwd(), 'src/content/pairings', `${slug}.mdx`);
    fileContent = fs.readFileSync(filePath, 'utf8');
    meta = getPairingMeta(slug);
  } catch {
    notFound();
  }

  if (!meta) notFound();

  const content = fileContent.replace(/---[\s\S]*?---/, '');

  // Extract FAQs for Schema
  const faqRegex = /<summary[^>]*>(.*?)<\/summary>[\s\S]*?<p[^>]*text[^>]*>(.*?)<\/p>/g;
  const faqs = [];
  let match;
  while ((match = faqRegex.exec(content)) !== null) {
    faqs.push({
      "@type": "Question",
      "name": match[1],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": match[2]
      }
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs,
    "publisher": {
      "@type": "Organization",
      "name": "FontFusion"
    }
  };

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">{meta.title}</h1>
        <p className="text-xl text-zinc-500">{meta.description}</p>
      </header>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  );
}
