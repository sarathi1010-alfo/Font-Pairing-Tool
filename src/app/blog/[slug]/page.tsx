import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogMeta } from "@/lib/mdx";
import fs from "fs";
import path from "path";
import { constructMetadata } from "@/lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import { siteConfig } from "@/lib/config";

export function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  if (!slug) return { title: 'Post Not Found' };

  const meta = getBlogMeta(slug);
  if (!meta) return { title: 'Post Not Found' };

  return constructMetadata({
    title: `${meta.title} | FontFusion Blog`,
    description: meta.description,
    path: `/blog/${slug}`,
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

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  if (!slug) notFound();

  let fileContent;
  let meta;
  try {
    const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
    fileContent = fs.readFileSync(filePath, 'utf8');
    meta = getBlogMeta(slug);
  } catch {
    notFound();
  }

  if (!meta) notFound();

  const content = fileContent.replace(/---[\s\S]*?---/, '');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.description,
    "author": {
      "@type": "Organization",
      "name": "FontFusion Team",
      "url": siteConfig.url
    },
    "publisher": {
      "@type": "Organization",
      "name": "FontFusion",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/favicon.ico`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${slug}`
    },
    "datePublished": "2025-05-15T08:00:00+00:00",
    "dateModified": new Date().toISOString()
  };

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
