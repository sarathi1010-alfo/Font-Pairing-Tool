"use client";

import React, { useState, useEffect } from 'react';

function getLuminance(hex: string) {
  const rgb = parseInt(hex.replace('#', ''), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;

  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1: string, hex2: string) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (lightest + 0.05) / (darkest + 0.05);
}

export function ContrastCheckerInteractive() {
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#FFFFFF');

  let ratio = 21;
  try {
    ratio = getContrastRatio(fg, bg);
  } catch {
    // Ignore invalid hex, default to 21
  }

  const passesAA = ratio >= 4.5;
  const passesAAA = ratio >= 7;
  const passesAALarge = ratio >= 3;

  return (
    <div className="p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Foreground Color</label>
          <div className="flex gap-4">
            <input
              type="color"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="h-10 w-20 cursor-pointer"
            />
            <input
              type="text"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="flex-1 h-10 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md bg-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Background Color</label>
          <div className="flex gap-4">
            <input
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="h-10 w-20 cursor-pointer"
            />
            <input
              type="text"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="flex-1 h-10 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md bg-transparent"
            />
          </div>
        </div>
      </div>

      <div
        className="p-12 rounded-xl mb-8 flex flex-col items-center justify-center text-center transition-colors border border-zinc-200/50"
        style={{ backgroundColor: bg, color: fg }}
      >
        <div className="text-6xl font-bold mb-4">{ratio.toFixed(2)} : 1</div>
        <p className="text-xl font-medium">The quick brown fox jumps over the lazy dog.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg border ${passesAA ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900' : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900'}`}>
          <div className="font-bold mb-1">WCAG AA (Normal Text)</div>
          <div className="text-sm">{passesAA ? '✅ Pass (>= 4.5)' : '❌ Fail (< 4.5)'}</div>
        </div>
        <div className={`p-4 rounded-lg border ${passesAAA ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900' : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900'}`}>
          <div className="font-bold mb-1">WCAG AAA (Normal Text)</div>
          <div className="text-sm">{passesAAA ? '✅ Pass (>= 7.0)' : '❌ Fail (< 7.0)'}</div>
        </div>
        <div className={`p-4 rounded-lg border ${passesAALarge ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900' : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900'}`}>
          <div className="font-bold mb-1">WCAG AA (Large Text)</div>
          <div className="text-sm">{passesAALarge ? '✅ Pass (>= 3.0)' : '❌ Fail (< 3.0)'}</div>
        </div>
      </div>
    </div>
  );
}
