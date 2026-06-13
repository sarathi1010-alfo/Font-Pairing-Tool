"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { getAllFonts, getAllPairs, FontPair, Font } from "@/lib/fonts";
import { DynamicFontLoader } from "@/components/DynamicFontLoader";
import { useFavorites } from "@/lib/storage";
import { RefreshCw, Heart, Share, SlidersHorizontal, ArrowLeftRight, Sparkles, ExternalLink } from "lucide-react";
import { LiveWebsitePreview } from "@/components/LiveWebsitePreview";
import { generateTypographySystem } from "@/lib/typography-system";
import { calculatePairingConfidence } from "@/lib/recommendation";
import Link from "next/link";

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
  const [selectedMood, setSelectedMood] = useState<string>("all");

  const uniqueMoods = Array.from(new Set(allFonts.flatMap(f => f.mood))).sort();

  // Update font data when pair changes
  const handleSetPair = (pair: FontPair) => {
    setCurrentPair(pair);
    setHeadingFontData(allFonts.find(f => f.name === pair.headingFont));
    setBodyFontData(allFonts.find(f => f.name === pair.bodyFont));
  };

  const randomize = () => {
    const validPairs = selectedMood === "all"
      ? allPairs
      : allPairs.filter(p => {
          const hFont = allFonts.find(f => f.name === p.headingFont);
          const bFont = allFonts.find(f => f.name === p.bodyFont);
          return (hFont?.mood.includes(selectedMood) || bFont?.mood.includes(selectedMood));
        });

    if (validPairs.length === 0) return;

    const currentIndex = validPairs.findIndex(p => p.slug === currentPair.slug);
    // eslint-disable-next-line react-hooks/purity
    let nextIndex = Math.floor(Math.random() * validPairs.length);

    if (validPairs.length > 1 && nextIndex === currentIndex) {
      nextIndex = (nextIndex + 1) % validPairs.length;
    }

    handleSetPair(validPairs[nextIndex]);
  };

  if (!currentPair) return null;

  const fontNames = [currentPair.headingFont, currentPair.bodyFont];

  const system = headingFontData && bodyFontData
    ? generateTypographySystem(headingFontData, bodyFontData)
    : null;

  const confidenceScore = headingFontData && bodyFontData
    ? calculatePairingConfidence(headingFontData, bodyFontData)
    : 50;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <DynamicFontLoader fontNames={fontNames} />

      {/* Sidebar Controls */}
      <aside className="w-full md:w-80 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 flex flex-col gap-8 shrink-0">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Intelligence Workspace
          </h2>

          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Brand Mood</label>
            <select
              className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
            >
              <option value="all">Any Mood</option>
              {uniqueMoods.map(mood => (
                <option key={mood} value={mood} className="capitalize">{mood}</option>
              ))}
            </select>
          </div>

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
          <div className="mb-4 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1"><Sparkles className="w-4 h-4 text-amber-500"/> Confidence</span>
            <span className="font-bold text-amber-500">{confidenceScore}/100</span>
          </div>
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
        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <Link href="https://paletteflow.alfo.online/" target="_blank" className="group block p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/50 hover:border-indigo-300 transition-all">
            <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1 mb-1">
              Need Colors? <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </h4>
            <p className="text-xs text-indigo-700/80 dark:text-indigo-400/80">Generate a matching brand palette with PaletteFlow.</p>
          </Link>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 bg-white dark:bg-zinc-950 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">

          {/* Contextual Preview */}
          {system && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Live Context</h2>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900">
                    A11y Score: {system.accessibilityScore}/100
                  </Badge>
                </div>
              </div>
              <LiveWebsitePreview system={system} />
            </div>
          )}

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
