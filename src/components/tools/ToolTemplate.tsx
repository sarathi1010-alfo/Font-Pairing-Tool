import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ToolTemplateProps {
  title: string;
  description: string;
  toolComponent: React.ReactNode;
  howItWorks: React.ReactNode;
  faqs: { question: string; answer: string }[];
  relatedTools: { title: string; href: string }[];
}

export function ToolTemplate({
  title,
  description,
  toolComponent,
  howItWorks,
  faqs,
  relatedTools
}: ToolTemplateProps) {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <div className="mb-12">
        <Link href="/tools" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center mb-6">
          ← Back to all tools
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <div className="mb-16">
        {/* The interactive tool goes here */}
        {toolComponent}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">How it works</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            {howItWorks}
          </div>

          <h2 className="text-2xl font-bold mb-4 mt-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="flex flex-col gap-3">
            {relatedTools.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <span className="font-medium">{tool.title}</span>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
