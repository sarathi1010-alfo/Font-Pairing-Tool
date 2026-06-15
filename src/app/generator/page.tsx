"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { getAllFonts, getAllPairs, FontPair, Font } from "@/lib/fonts";
import { DynamicFontLoader } from "@/components/DynamicFontLoader";
import { useFavorites } from "@/lib/storage";
import { RefreshCw, Heart, Share, SlidersHorizontal, ArrowLeftRight } from "lucide-react";

export default function GeneratorPage() {
  const allPairs = getAllPairs();
  const allFonts = getAllFonts();
  const { toggleFavorite, isFavorite, isLoaded } = useFavorites();

  const [currentPair, setCurrentPair] = useState<FontPair>(allPairs[0]);
  const [headingFontData, setHeadingFontData] = useState<Font | undefined>(allFonts.find(f => f.name === allPairs[0].headingFont));
  const [bodyFontData, setBodyFontData] = useState<Font | undefined>(allFonts.find(f => f.name === allPairs[0].bodyFont));

  // Settings
  const [fontSize, setFontSize] = useState([100]); // Percentage
  const [lineHeight, setLineHeight] = useState([150]); // Percentage

  // Update font data when pair changes
  const handleSetPair = (pair: FontPair) => {
    setCurrentPair(pair);
    setHeadingFontData(allFonts.find(f => f.name === pair.headingFont));
    setBodyFontData(allFonts.find(f => f.name === pair.bodyFont));
  };

  const randomize = () => {
    const currentIndex = allPairs.findIndex(p => p.slug === currentPair.slug);
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * allPairs.length);
    } while (nextIndex === currentIndex && allPairs.length > 1);

    handleSetPair(allPairs[nextIndex]);
  };

  if (!currentPair) return null;

  const fontNames = [currentPair.headingFont, currentPair.bodyFont];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <DynamicFontLoader fontNames={fontNames} />

      {/* Sidebar Controls */}
      <aside className="w-full md:w-80 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 flex flex-col gap-8 shrink-0">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Controls
          </h2>

          <Button onClick={randomize} className="w-full mb-4 h-12 text-md" variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Randomize Pair
          </Button>

          {isLoaded && (
            <div className="flex gap-2">
              <Button
                variant={isFavorite(currentPair.slug) ? "default" : "outline"}
                className="flex-1"
                onClick={() => toggleFavorite(currentPair.slug)}
              >
                <Heart className={`mr-2 h-4 w-4 ${isFavorite(currentPair.slug) ? "fill-current" : ""}`} />
                {isFavorite(currentPair.slug) ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" className="flex-1">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Font Size</label>
              <span className="text-sm text-zinc-500">{fontSize[0]}%</span>
            </div>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={80}
              max={150}
              step={1}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Line Height</label>
              <span className="text-sm text-zinc-500">{lineHeight[0]}%</span>
            </div>
            <Slider
              value={lineHeight}
              onValueChange={setLineHeight}
              min={120}
              max={200}
              step={5}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">
            Current Pair Specs
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="text-xs text-zinc-500 mb-1">Heading</div>
              <div className="font-semibold">{currentPair.headingFont}</div>
              <div className="text-xs text-zinc-500 mt-1 capitalize">{headingFontData?.category}</div>
            </div>
            <div className="flex justify-center text-zinc-300 dark:text-zinc-700">
              <ArrowLeftRight className="h-4 w-4 rotate-90" />
            </div>
            <div className="p-4 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="text-xs text-zinc-500 mb-1">Body</div>
              <div className="font-semibold">{currentPair.bodyFont}</div>
              <div className="text-xs text-zinc-500 mt-1 capitalize">{bodyFontData?.category}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 bg-white dark:bg-zinc-950 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {currentPair.mood.map(m => (
              <Badge key={m} variant="secondary" className="capitalize">{m}</Badge>
            ))}
            {currentPair.useCases.map(uc => (
              <Badge key={uc} variant="outline" className="capitalize border-dashed">{uc}</Badge>
            ))}
          </div>

          {/* Typography Specimen */}
          <div
            className="space-y-10 transition-all duration-200"
            style={{
              transform: `scale(${fontSize[0] / 100})`,
              transformOrigin: 'top left',
              width: `${100 / (fontSize[0] / 100)}%`
            }}
          >
            <div>
              <h1
                className="text-6xl md:text-8xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-50"
                style={{ fontFamily: `"${currentPair.headingFont}", sans-serif` }}
              >
                The quick brown fox jumps over the lazy dog.
              </h1>
              <p
                className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl"
                style={{
                  fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                  lineHeight: lineHeight[0] / 100
                }}
              >
                Typography is the craft of endowing human language with a durable visual form.
                Good typography communicates its message clearly, while great typography captures the emotion of the content.
              </p>
            </div>

            <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full my-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ fontFamily: `"${currentPair.headingFont}", sans-serif` }}
                >
                  Clear Hierarchy
                </h2>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                    lineHeight: lineHeight[0] / 100
                  }}
                >
                  Establishing hierarchy is one of the primary goals of typography. By pairing <strong>{currentPair.headingFont}</strong> and <strong>{currentPair.bodyFont}</strong>, you create a distinct visual separation between the structural elements of your page and the long-form content.
                </p>
                <p
                  style={{
                    fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                    lineHeight: lineHeight[0] / 100
                  }}
                >
                  Notice how the heading font draws the eye, while the body font recedes to allow for comfortable reading. {currentPair.description}
                </p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: `"${currentPair.headingFont}", sans-serif` }}
                >
                  UI Element Preview
                </h3>
                <p
                  className="text-sm mb-6 text-zinc-500"
                  style={{ fontFamily: `"${currentPair.bodyFont}", sans-serif` }}
                >
                  How this looks in a product card or small component.
                </p>
                <div className="space-y-4">
                  <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full mb-4"></div>
                  <h4
                    className="font-bold text-lg"
                    style={{ fontFamily: `"${currentPair.headingFont}", sans-serif` }}
                  >
                    Project Alpha
                  </h4>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: `"${currentPair.bodyFont}", sans-serif`,
                      lineHeight: lineHeight[0] / 100
                    }}
                  >
                    A brief description of the project goes here, utilizing the body font at a smaller size.
                  </p>
                  <Button className="w-full mt-2" style={{ fontFamily: `"${currentPair.bodyFont}", sans-serif` }}>
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
