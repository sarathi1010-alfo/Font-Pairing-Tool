"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllFonts } from "@/lib/fonts";
import { DynamicFontLoader } from "@/components/DynamicFontLoader";
import { Search } from "lucide-react";

export default function BrowsePage() {
  const allFonts = getAllFonts();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredFonts = allFonts.filter(font => {
    const matchesSearch = font.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || font.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(allFonts.map(f => f.category)))];
  const allFontNames = allFonts.map(f => f.name);

  return (
    <div className="container mx-auto px-4 py-12">
      <DynamicFontLoader fontNames={allFontNames} />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-zinc-950 dark:text-zinc-50">Browse Fonts</h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Explore our curated library of the best free Google Fonts for modern web design.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search fonts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFonts.map(font => (
          <Link key={font.slug} href={`/fonts/${font.slug}`} className="group">
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 h-full flex flex-col transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="font-semibold text-lg">{font.name}</h2>
                  <p className="text-sm text-zinc-500 capitalize">{font.category}</p>
                </div>
                <Badge variant="secondary">{font.weights.length} weights</Badge>
              </div>

              <div className="mt-auto overflow-hidden">
                <p
                  className="text-4xl text-zinc-900 dark:text-zinc-100 truncate group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors"
                  style={{ fontFamily: `"${font.name}", sans-serif` }}
                >
                  Ag
                </p>
                <p
                  className="text-xl mt-4 text-zinc-900 dark:text-zinc-100 truncate group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors"
                  style={{ fontFamily: `"${font.name}", sans-serif` }}
                >
                  The quick brown fox
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mt-6">
                {font.mood.slice(0, 3).map(m => (
                  <span key={m} className="text-xs text-zinc-500 bg-zinc-50 dark:bg-zinc-900 px-2 py-1 rounded-md">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredFonts.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          No fonts found matching your search.
        </div>
      )}
    </div>
  );
}
