import fontsData from '../data/fonts.json';
import pairsData from '../data/pairs.json';

export interface Font {
  slug: string;
  name: string;
  category: 'sans' | 'serif' | 'display' | 'mono';
  mood: string[];
  weights: number[];
  bestFor: string[];
  partners: string[];
}

export interface FontPair {
  slug: string;
  headingFont: string;
  bodyFont: string;
  mood: string[];
  useCases: string[];
  description: string;
}

export function getAllFonts(): Font[] {
  return fontsData as Font[];
}

export function getFontBySlug(slug: string): Font | undefined {
  return getAllFonts().find(f => f.slug === slug);
}

export function getAllPairs(): FontPair[] {
  return pairsData as FontPair[];
}

export function getPairBySlug(slug: string): FontPair | undefined {
  return getAllPairs().find(p => p.slug === slug);
}

// Generate the Google Fonts URL for a list of font names
export function getGoogleFontsUrl(fontNames: string[]): string {
  if (!fontNames || fontNames.length === 0) return '';

  // Deduplicate and format font names for Google Fonts API
  const uniqueFonts = Array.from(new Set(fontNames));
  const families = uniqueFonts.map(fontName => {
    const formattedName = fontName.replace(/ /g, '+');
    // Load common weights for each font to ensure they render nicely
    return `family=${formattedName}:wght@400;500;600;700`;
  });

  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}
