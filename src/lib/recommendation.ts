import { Font, getAllFonts } from './fonts';

export interface ScoredFont extends Font {
  score: number;
}

/**
 * Recommend fonts based on a mood or vibe query.
 * Matches against font category, mood tags, and psychological tags.
 */
export function recommendFonts(moodQuery: string, limit: number = 5): ScoredFont[] {
  const allFonts = getAllFonts();
  if (!moodQuery || moodQuery.trim() === '') {
    return allFonts.slice(0, limit).map(font => ({ ...font, score: 0 }));
  }

  const query = moodQuery.toLowerCase().trim();
  // Simple tokenization
  const keywords = query.split(/\s+/);

  const scoredFonts = allFonts.map(font => {
    let score = 0;

    keywords.forEach(keyword => {
      // Exact category match gets a moderate boost
      if (font.category === keyword) {
        score += 3;
      }

      // Match against mood tags
      font.mood.forEach(m => {
        if (m.toLowerCase().includes(keyword)) {
          score += 5;
        }
      });

      // Match against psychological tags
      if (font.psychologicalTags) {
        font.psychologicalTags.forEach(tag => {
          if (tag.toLowerCase().includes(keyword)) {
            score += 4;
          }
        });
      }
    });

    return { ...font, score };
  });

  // Filter out fonts that don't match at all, then sort by score descending
  const matches = scoredFonts.filter(f => f.score > 0);

  // Sort by score (desc), then fall back to accessibility score (desc)
  matches.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    const aAcc = a.accessibilityScore || 0;
    const bAcc = b.accessibilityScore || 0;
    return bAcc - aAcc;
  });

  // If no matches, just return default top fonts based on accessibility
  if (matches.length === 0) {
    return allFonts
      .map(font => ({ ...font, score: 0 }))
      .sort((a, b) => (b.accessibilityScore || 0) - (a.accessibilityScore || 0))
      .slice(0, limit);
  }

  return matches.slice(0, limit);
}

/**
 * Calculates a confidence score (0-100) for a given font pairing.
 */
export function calculatePairingConfidence(headingFont: Font, bodyFont: Font): number {
  let score = 50; // Base score

  // Contrast logic: San-serif + Serif usually pairs well
  if (headingFont.category !== bodyFont.category) {
    score += 20;
  } else {
    // If they are the same category but different fonts, it might be tricky
    if (headingFont.slug !== bodyFont.slug) {
      score -= 10;
    }
  }

  // Same font family check (super safe, monotype system)
  if (headingFont.slug === bodyFont.slug) {
    return 95; // highly confident in single-font systems
  }

  // Accessibility check (e.g. body font readability)
  if (bodyFont.accessibilityScore) {
    // We expect body font to be highly readable. A score of 90+ gives +15, 80+ gives +10
    score += (bodyFont.accessibilityScore - 70) * 0.5;
  }

  // Check if they are explicit partners in our database
  if (headingFont.partners.includes(bodyFont.slug) || bodyFont.partners.includes(headingFont.slug)) {
    score += 15;
  }

  return Math.min(Math.max(Math.floor(score), 0), 100);
}
