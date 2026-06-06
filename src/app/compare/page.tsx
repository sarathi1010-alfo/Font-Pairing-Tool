"use client";

import { useState } from "react";
import { getAllPairs, FontPair } from "@/lib/fonts";
import { DynamicFontLoader } from "@/components/DynamicFontLoader";

export default function ComparePage() {
  const allPairs = getAllPairs();
  const [leftPair, setLeftPair] = useState<FontPair>(allPairs[0]);
  const [rightPair, setRightPair] = useState<FontPair>(allPairs[1]);

  const allSelectedFonts = [
    leftPair.headingFont, leftPair.bodyFont,
    rightPair.headingFont, rightPair.bodyFont
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <DynamicFontLoader fontNames={allSelectedFonts} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Compare Pairings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

          {/* Left Side */}
          <div className="flex flex-col gap-6">
            <select
              value={leftPair.slug}
              onChange={(e) => setLeftPair(allPairs.find(p => p.slug === e.target.value) || allPairs[0])}
              className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md font-medium"
            >
              {allPairs.map(pair => (
                <option key={pair.slug} value={pair.slug}>
                  {pair.headingFont} & {pair.bodyFont}
                </option>
              ))}
            </select>

            <div className="p-8 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 min-h-[500px]">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: `"${leftPair.headingFont}", sans-serif` }}
              >
                The Art of Composition
              </h2>
              <p
                className="text-lg mb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed"
                style={{ fontFamily: `"${leftPair.bodyFont}", sans-serif` }}
              >
                Typography is the craft of endowing human language with a durable visual form. Good typography communicates its message clearly, while great typography captures the emotion of the content.
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg mt-8">
                <div
                  className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2"
                  style={{ fontFamily: `"${leftPair.headingFont}", sans-serif` }}
                >
                  Subheading Example
                </div>
                <p
                  className="text-sm text-zinc-600 dark:text-zinc-400"
                  style={{ fontFamily: `"${leftPair.bodyFont}", sans-serif` }}
                >
                  This is how smaller UI elements or secondary text will appear using the selected body font. It should remain highly legible even at reduced sizes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6">
            <select
              value={rightPair.slug}
              onChange={(e) => setRightPair(allPairs.find(p => p.slug === e.target.value) || allPairs[1])}
              className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md font-medium"
            >
              {allPairs.map(pair => (
                <option key={pair.slug} value={pair.slug}>
                  {pair.headingFont} & {pair.bodyFont}
                </option>
              ))}
            </select>

            <div className="p-8 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 min-h-[500px]">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: `"${rightPair.headingFont}", sans-serif` }}
              >
                The Art of Composition
              </h2>
              <p
                className="text-lg mb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed"
                style={{ fontFamily: `"${rightPair.bodyFont}", sans-serif` }}
              >
                Typography is the craft of endowing human language with a durable visual form. Good typography communicates its message clearly, while great typography captures the emotion of the content.
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg mt-8">
                <div
                  className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2"
                  style={{ fontFamily: `"${rightPair.headingFont}", sans-serif` }}
                >
                  Subheading Example
                </div>
                <p
                  className="text-sm text-zinc-600 dark:text-zinc-400"
                  style={{ fontFamily: `"${rightPair.bodyFont}", sans-serif` }}
                >
                  This is how smaller UI elements or secondary text will appear using the selected body font. It should remain highly legible even at reduced sizes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
