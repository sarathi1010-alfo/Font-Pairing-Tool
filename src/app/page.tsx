import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ArrowRight, Layers, Type, Sparkles, CheckCircle2 } from "lucide-react";
import { getAllPairs } from "@/lib/fonts";
import { DynamicFontLoader } from "@/components/DynamicFontLoader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FontFusion - Free Font Pairing Tool & Typography",
  description:
    "Discover harmonious font pairings and typography combinations in seconds. Free font pairing tool with live UI previews, contrast checks, and CSS export.",
  alternates: {
    canonical: "https://fontfusion.alfo.online/",
  },
  openGraph: {
    title: "FontFusion - Free Font Pairing Tool & Typography",
    description:
      "Discover harmonious font pairings and typography combinations in seconds. Free font pairing tool with live UI previews, contrast checks, and CSS export.",
    url: "https://fontfusion.alfo.online/",
    siteName: "FontFusion",
    type: "website",
    images: [
      {
        url: "https://fontfusion.alfo.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "FontFusion Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FontFusion - Free Font Pairing Tool & Typography",
    description:
      "Discover harmonious font pairings and typography combinations in seconds. Free font pairing tool with live UI previews, contrast checks, and CSS export.",
    images: ["https://fontfusion.alfo.online/og-image.png"],
  },
};

export default function Home() {
  const featuredPairs = getAllPairs().slice(0, 4);
  const featuredFonts = featuredPairs.flatMap((p) => [p.headingFont, p.bodyFont]);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "FontFusion",
      url: "https://fontfusion.alfo.online/",
      description:
        "Free online font pairing tool and typography matchmaker with real-time UI previews and CSS code export.",
      applicationCategory: "DesignApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What makes a good font pairing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A successful font pairing creates clear visual hierarchy through deliberate contrast (such as pairing a geometric sans-serif heading with a readable serif body font) while maintaining shared mood, proportion, and tonal harmony.",
          },
        },
        {
          "@type": "Question",
          name: "How many different fonts should I use on a single website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most web designs should stick to 2 typefaces: one primary font for headings and titles, and one complementary font for body copy. Using more than 3 fonts adds unnecessary visual noise and slows down page load times.",
          },
        },
        {
          "@type": "Question",
          name: "How do I ensure font pairings are accessible and readable?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ensure body copy has an adequate x-height, open counters, distinguishable letterforms, a base font-size of at least 16px, and meets WCAG 2.1 AA color contrast standards (at least 4.5:1 for normal text).",
          },
        },
        {
          "@type": "Question",
          name: "Can I use these font pairings for commercial web development?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all pairings featured on FontFusion utilize open-source typefaces from the Google Fonts catalog licensed under open licenses like the SIL Open Font License (OFL) or Apache License.",
          },
        },
        {
          "@type": "Question",
          name: "How do I integrate Google Fonts pairings into Next.js and Tailwind CSS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In Next.js, use next/font/google to automatically self-host and preload the font files with zero layout shift. Then reference the CSS variables inside your tailwind.config.js or globals.css font-family theme configuration.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Choose and Implement Font Pairings for Your Website",
      description:
        "A practical 4-step guide to discovering, previewing, and integrating matching typography into your web projects.",
      step: [
        {
          "@type": "HowToStep",
          name: "Choose a Distinctive Heading Font",
          text: "Select an expressive display, serif, or sans-serif typeface that establishes brand identity and personality.",
          position: 1,
        },
        {
          "@type": "HowToStep",
          name: "Match a Complementary Body Typeface",
          text: "Pair your heading font with a highly legible body font featuring generous x-height and clear kerning.",
          position: 2,
        },
        {
          "@type": "HowToStep",
          name: "Test on Live Responsive UI Elements",
          text: "Preview the pairing on actual buttons, cards, headings, and long-form paragraphs across light and dark modes.",
          position: 3,
        },
        {
          "@type": "HowToStep",
          name: "Export Production-Ready CSS",
          text: "Copy the Google Fonts embed links, Next.js font loader configurations, and Tailwind font-family classes directly into your code.",
          position: 4,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://fontfusion.alfo.online/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Font Pairing Tool",
          item: "https://fontfusion.alfo.online/#pairings",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <DynamicFontLoader fontNames={featuredFonts} />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-zinc-950 dark:text-zinc-50 max-w-4xl mx-auto">
          Free Font Pairing Tool &amp; Typography Matcher
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
          Find harmonious font combinations that look premium, highly readable, and ready to ship. FontFusion helps designers, developers, and founders discover, compare, and export production-ready Google Font pairs with live UI previews and WCAG contrast validation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="h-12 min-h-[44px] min-w-[44px] px-8 text-base w-full sm:w-auto">
            <Link href="/generator">
              Try a pairing now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 min-h-[44px] min-w-[44px] px-8 text-base w-full sm:w-auto">
            <Link href="/browse">Browse Fonts</Link>
          </Button>
        </div>
      </section>

      {/* 4-Step How It Works Guide */}
      <section className="py-12 bg-zinc-50/50 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              How It Works: 4 Steps to Perfect Typography
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Follow this battle-tested methodology to pair complementary fonts with optimal legibility and contrast.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Pick Heading Font</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Choose a distinctive serif, display, or geometric typeface to anchor page titles and banners.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Match Body Typeface</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Pair with a clean, readable text font engineered for paragraph legibility and long-form reading.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Test on Live UI</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Evaluate visual hierarchy, line lengths, letter spacing, and contrast in responsive layouts.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Export Code</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Copy ready-to-paste Google Fonts imports, Tailwind font tokens, and CSS font-family declarations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <section className="container mx-auto px-4 my-12">
        <AdPlaceholder size="728x90" />
      </section>

      {/* Featured Pairings */}
      <section id="pairings" className="py-16 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Pairings</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
                Curated combinations for modern digital products. When implementing these styles, read our <Link href="/blog/dark-mode-typography-guide" className="text-indigo-600 hover:underline">Dark Mode Typography Guide</Link> to calibrate contrast across devices.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex min-h-[44px] min-w-[44px]">
              <Link href="/browse">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {featuredPairs.map((pair) => (
              <Link key={pair.slug} href={`/pairs/${pair.slug}`} className="group block">
                <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 h-full">
                  <div className="flex justify-between items-start mb-6 text-sm text-zinc-500">
                    <div className="flex gap-2">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{pair.headingFont}</span>
                      <span>&amp;</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{pair.bodyFont}</span>
                    </div>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {pair.mood.slice(0, 2).map((m) => (
                        <span key={m} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs capitalize">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3
                      className="text-4xl font-bold mb-4 leading-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-2"
                      style={{ fontFamily: `"${pair.headingFont}", sans-serif` }}
                    >
                      Design that speaks for itself.
                    </h3>
                    <p
                      className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3"
                      style={{ fontFamily: `"${pair.bodyFont}", sans-serif` }}
                    >
                      Good typography is transparent. It communicates the message without drawing attention to the letters themselves. When pairing fonts, contrast is your most powerful tool.
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Blocks */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
              <Layers className="h-8 w-8 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h3 className="text-xl font-bold mb-3">Browse &amp; Compare</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Instantly see how different typefaces interact. Filter by mood, style, and use-case to find the perfect match.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
              <Type className="h-8 w-8 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Preview</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Test your chosen pairs on real UI elements and long-form copy to ensure readability and hierarchy.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h3 className="text-xl font-bold mb-3">Ready to Ship</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Copy the CSS directly or get the Google Fonts import links. Your perfect typography stack, ready in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Machine-Parseable FAQs with Schema Parity */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-6">
            <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
              <h3 className="text-xl font-semibold mb-2">
                What makes a good font pairing?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A successful font pairing creates clear visual hierarchy through deliberate contrast (such as pairing a geometric sans-serif heading with a readable serif body font) while maintaining shared mood, proportion, and tonal harmony.
              </p>
            </div>
            <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
              <h3 className="text-xl font-semibold mb-2">
                How many different fonts should I use on a single website?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Most web designs should stick to 2 typefaces: one primary font for headings and titles, and one complementary font for body copy. Using more than 3 fonts adds unnecessary visual noise and slows down page load times.
              </p>
            </div>
            <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
              <h3 className="text-xl font-semibold mb-2">
                How do I ensure font pairings are accessible and readable?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Ensure body copy has an adequate x-height, open counters, distinguishable letterforms, a base font-size of at least 16px, and meets WCAG 2.1 AA color contrast standards (at least 4.5:1 for normal text).
              </p>
            </div>
            <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
              <h3 className="text-xl font-semibold mb-2">
                Can I use these font pairings for commercial web development?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Yes, all pairings featured on FontFusion utilize open-source typefaces from the Google Fonts catalog licensed under open licenses like the SIL Open Font License (OFL) or Apache License.
              </p>
            </div>
            <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950">
              <h3 className="text-xl font-semibold mb-2">
                How do I integrate Google Fonts pairings into Next.js and Tailwind CSS?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                In Next.js, use next/font/google to automatically self-host and preload the font files with zero layout shift. Then reference the CSS variables inside your tailwind.config.js or globals.css font-family theme configuration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
