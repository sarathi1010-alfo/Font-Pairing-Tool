import { constructMetadata } from "@/lib/seo";
import { Layers, Zap, Heart, Shield } from "lucide-react";

export const metadata = constructMetadata({
  title: "About FontFusion | Our Mission & Vision",
  description: "Learn more about FontFusion, the ultimate font pairing tool for modern designers and developers.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Design should be effortless.</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          FontFusion was built with a simple goal: to help designers and founders find perfect typography combinations without the friction of traditional design tools.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="space-y-6">
          <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
            <Zap className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
          </div>
          <h2 className="text-2xl font-bold">The Problem</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Searching for font pairs is often a slow, manual process. You jump between Google Fonts, your design tool, and the browser, never quite sure how the fonts will feel in a real UI.
          </p>
        </div>

        <div className="space-y-6">
          <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
            <Layers className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
          </div>
          <h2 className="text-2xl font-bold">The Solution</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            FontFusion brings everything into one workspace. Live previews, mood-based filtering, and instant CSS export. We handle the technical details so you can focus on the design.
          </p>
        </div>
      </div>

      <section className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-12 mb-24 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Core Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="shrink-0 h-10 w-10 bg-white dark:bg-zinc-950 rounded-lg flex items-center justify-center border border-zinc-100 dark:border-zinc-800">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Open Source First</h3>
              <p className="text-zinc-600 dark:text-zinc-400">We exclusively use Google Fonts to ensure your projects remain free, accessible, and high-performing.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0 h-10 w-10 bg-white dark:bg-zinc-950 rounded-lg flex items-center justify-center border border-zinc-100 dark:border-zinc-800">
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Privacy Focused</h3>
              <p className="text-zinc-600 dark:text-zinc-400">No tracking, no cookies, no nonsense. Your favorites are stored locally in your browser.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center">
        <p className="text-zinc-500">Part of the <a href="https://alfo.online" className="text-zinc-900 dark:text-zinc-50 font-semibold hover:underline">alfo.online</a> ecosystem.</p>
      </footer>
    </div>
  );
}
