import React from 'react';
import { TypographySystem } from '@/lib/typography-system';
import { CheckCircle2, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LiveWebsitePreviewProps {
  system: TypographySystem;
}

export function LiveWebsitePreview({ system }: LiveWebsitePreviewProps) {
  const { heading, body, scale } = system;

  const headingStyle = {
    fontFamily: `"${heading.font.name}", ${heading.font.category === 'serif' ? 'serif' : 'sans-serif'}`,
    fontWeight: heading.weight,
    lineHeight: heading.lineHeight,
    letterSpacing: heading.letterSpacing,
  };

  const bodyStyle = {
    fontFamily: `"${body.font.name}", ${body.font.category === 'serif' ? 'serif' : 'sans-serif'}`,
    fontWeight: body.weight,
    lineHeight: body.lineHeight,
    letterSpacing: body.letterSpacing,
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      {/* Browser Chrome Mockup */}
      <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500/80" />
        </div>
        <div className="mx-auto bg-white dark:bg-zinc-950 text-zinc-400 dark:text-zinc-500 text-xs px-3 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-2">
          <Shield className="w-3 h-3" />
          <span>acme-startup.io</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-16 md:py-24 max-w-4xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 mb-8 border border-zinc-200 dark:border-zinc-800"
          style={{ ...bodyStyle, fontSize: scale.sizes.sm }}
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Announcing our Series A Funding</span>
        </div>

        <h1
          className="mb-6 text-zinc-900 dark:text-zinc-50"
          style={{ ...headingStyle, fontSize: scale.sizes['4xl'] }}
        >
          The intelligent platform for modern finance teams.
        </h1>

        <p
          className="mb-10 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          style={{ ...bodyStyle, fontSize: scale.sizes.xl }}
        >
          Automate your accounting, sync your bank feeds, and get real-time insights into your runway with zero manual data entry.
        </p>

        <div className="flex justify-center gap-4">
          <Button style={{ ...bodyStyle, fontWeight: 500, fontSize: scale.sizes.base }} className="px-6 py-6 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
            Start Free Trial
          </Button>
          <Button variant="outline" style={{ ...bodyStyle, fontWeight: 500, fontSize: scale.sizes.base }} className="px-6 py-6 rounded-full border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-zinc-100">
            Book a Demo
          </Button>
        </div>
      </div>

      {/* Feature Grid Mockup */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 px-6 py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Real-time Sync", desc: "Connects securely to over 10,000 global financial institutions instantly." },
              { title: "Smart Categorization", desc: "Our engine automatically tags and categorizes your expenses with 99% accuracy." },
              { title: "Audit Ready", desc: "Every transaction is securely stored and instantly exportable for your CPA." }
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-zinc-900 dark:text-zinc-100 mb-4" />
                <h3
                  className="mb-2 text-zinc-900 dark:text-zinc-50"
                  style={{ ...headingStyle, fontSize: scale.sizes.lg }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-zinc-600 dark:text-zinc-400"
                  style={{ ...bodyStyle, fontSize: scale.sizes.base }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
