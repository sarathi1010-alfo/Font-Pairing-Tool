import React, { useState } from 'react';
import { TypographySystem } from '@/lib/typography-system';
import { CheckCircle2, Shield, Zap, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LiveWebsitePreviewProps {
  system: TypographySystem;
}

export function LiveWebsitePreview({ system }: LiveWebsitePreviewProps) {
  const { heading, body, scale } = system;
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');

  const isDark = previewMode === 'dark';

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
    <div className={`w-full border rounded-xl overflow-hidden shadow-sm transition-colors ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"}`}>
      {/* Browser Chrome Mockup */}
      <div className={`px-4 py-3 flex items-center justify-between border-b transition-colors ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
        <div className="flex gap-1.5">
          <div className={`w-3 h-3 rounded-full ${isDark ? "bg-red-500/80" : "bg-red-400"}`} />
          <div className={`w-3 h-3 rounded-full ${isDark ? "bg-amber-500/80" : "bg-amber-400"}`} />
          <div className={`w-3 h-3 rounded-full ${isDark ? "bg-green-500/80" : "bg-green-400"}`} />
        </div>
        <div className={`text-xs px-3 py-1 rounded-md border shadow-sm flex items-center gap-2 transition-colors ${isDark ? "bg-zinc-950 text-zinc-500 border-zinc-800" : "bg-white text-zinc-400 border-zinc-200"}`}>
          <Shield className="w-3 h-3" />
          <span>acme-startup.io</span>
        </div>
        <div>
          <button
            onClick={() => setPreviewMode(isDark ? 'light' : 'dark')}
            className={`flex items-center justify-center p-1.5 rounded-md border transition-colors ${isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-100'}`}
            title="Toggle Preview Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-16 md:py-24 max-w-4xl mx-auto text-center">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 border transition-colors ${isDark ? "bg-zinc-900 text-zinc-200 border-zinc-800" : "bg-zinc-100 text-zinc-800 border-zinc-200"}`}
          style={{ ...bodyStyle, fontSize: scale.sizes.sm }}
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Announcing our Series A Funding</span>
        </div>

        <h1
          className={`mb-6 transition-colors ${isDark ? "text-zinc-50" : "text-zinc-900"}`}
          style={{ ...headingStyle, fontSize: scale.sizes['4xl'] }}
        >
          The intelligent platform for modern finance teams.
        </h1>

        <p
          className={`mb-10 max-w-2xl mx-auto transition-colors ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
          style={{ ...bodyStyle, fontSize: scale.sizes.xl }}
        >
          Automate your accounting, sync your bank feeds, and get real-time insights into your runway with zero manual data entry.
        </p>

        <div className="flex justify-center gap-4">
          <Button style={{ ...bodyStyle, fontWeight: 500, fontSize: scale.sizes.base }} className={`px-6 py-6 rounded-full transition-colors ${isDark ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-zinc-800"}`}>
            Start Free Trial
          </Button>
          <Button variant="outline" style={{ ...bodyStyle, fontWeight: 500, fontSize: scale.sizes.base }} className={`px-6 py-6 rounded-full bg-transparent transition-colors ${isDark ? "border-zinc-800 text-zinc-100" : "border-zinc-200 text-zinc-900"}`}>
            Book a Demo
          </Button>
        </div>
      </div>

      {/* Feature Grid Mockup */}
      <div className={`px-6 py-16 border-t transition-colors ${isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Real-time Sync", desc: "Connects securely to over 10,000 global financial institutions instantly." },
              { title: "Smart Categorization", desc: "Our engine automatically tags and categorizes your expenses with 99% accuracy." },
              { title: "Audit Ready", desc: "Every transaction is securely stored and instantly exportable for your CPA." }
            ].map((feature, i) => (
              <div key={i} className={`p-6 rounded-2xl border shadow-sm transition-colors ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"}`}>
                <CheckCircle2 className={`w-8 h-8 mb-4 transition-colors ${isDark ? "text-zinc-100" : "text-zinc-900"}`} />
                <h3
                  className={`mb-2 transition-colors ${isDark ? "text-zinc-50" : "text-zinc-900"}`}
                  style={{ ...headingStyle, fontSize: scale.sizes.lg }}
                >
                  {feature.title}
                </h3>
                <p
                  className={`transition-colors ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
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
