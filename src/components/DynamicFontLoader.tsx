"use client";

import { useEffect } from 'react';

// Generates deduplicated single font urls, not bulk urls
function getSingleFontUrls(fontNames: string[]): string[] {
  if (!fontNames || fontNames.length === 0) return [];

  const uniqueFonts = Array.from(new Set(fontNames));
  return uniqueFonts.map(fontName => {
    const formattedName = fontName.replace(/ /g, '+');
    return `https://fonts.googleapis.com/css2?family=${formattedName}:wght@400;500;600;700&display=swap`;
  });
}

interface DynamicFontLoaderProps {
  fontNames: string[];
}

export function DynamicFontLoader({ fontNames }: DynamicFontLoaderProps) {
  useEffect(() => {
    if (!fontNames || fontNames.length === 0) return;

    const urls = getSingleFontUrls(fontNames);

    urls.forEach(url => {
        let link = document.querySelector(`link[href="${url}"]`) as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            document.head.appendChild(link);
        }
    });

    // We don't cleanup the link to avoid flashing and multiple network requests
    // when moving between pairs that share fonts.
  }, [fontNames]);

  return null;
}
