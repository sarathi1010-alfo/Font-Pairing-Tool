# Typography OS Architecture

This document outlines the architecture and implementation plan for transforming the basic font combination generator into a premium "creative typography intelligence workspace."

## UI/UX Principles
1. **Mood First, Tech Second:** Users interact with emotions (luxury, futuristic, brutalist) rather than technical classifications (serif/sans-serif).
2. **Context is King:** Always show typography in real contexts (mockups, live UI previews) rather than isolated alphabet strings.
3. **Professional Tools, Playful UI:** Include gamified elements like confidence scores and interactive playgrounds, but maintain a premium, trustworthy aesthetic.
4. **Keyboard-Driven Velocity:** Implement shortcuts (Space to randomize, arrow keys for weight adjustments) to make the workspace feel like a fast pro tool.
5. **Seamless Ecosystem:** Deeply integrate with PaletteFlow (colors) and other Alfo ecosystem tools to offer full branding systems.

## Core Logic Pseudo-code

### Mood-Based Recommendation
```javascript
function recommendFonts(moodQuery, allFonts) {
  // Extract keywords from query
  const keywords = extractKeywords(moodQuery);

  // Score fonts based on mood and psychological tags matching keywords
  const scoredFonts = allFonts.map(font => {
    let score = 0;
    font.mood.forEach(m => { if (keywords.includes(m)) score += 5; });
    font.psychologicalTags.forEach(t => { if (keywords.includes(t)) score += 3; });
    return { ...font, score };
  });

  // Sort and return top candidates
  return scoredFonts.sort((a, b) => b.score - a.score).slice(0, 5);
}
```

### Pairing Confidence Score
```javascript
function calculatePairingConfidence(headingFont, bodyFont) {
  let score = 50; // Base score

  // Contrast logic: San-serif + Serif usually pairs well
  if (headingFont.category !== bodyFont.category) score += 20;

  // X-Height similarity check (pseudo-logic)
  if (isXHeightSimilar(headingFont, bodyFont)) score += 15;

  // Same font family check (super safe)
  if (headingFont.slug === bodyFont.slug) score = 95;

  // Accessibility check (e.g. body font readability)
  score += bodyFont.accessibilityScore.readability / 10;

  return Math.min(score, 100);
}
```

## Data Models

### Font System Data Model
```typescript
interface TypographySystem {
  id: string;
  name: string;
  heading: {
    font: Font;
    weights: number[];
    lineHeight: number;
    letterSpacing: string;
  };
  body: {
    font: Font;
    weights: number[];
    lineHeight: number;
    letterSpacing: string;
  };
  scale: {
    baseSize: number;
    ratio: number; // e.g. 1.25 for Major Third
  };
  colors: PaletteFlowIntegration; // Optional integration data
}
```

### User Board Data Model
```typescript
interface UserTypographyBoard {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  savedSystems: TypographySystem[];
  inspirationUrls: string[];
}
```

## Progressive Web App (PWA) Setup
- Generate `manifest.json` with appropriate theme colors and icons.
- Add next-pwa (or similar) plugin to `next.config.ts`.
- Implement a basic service worker for offline caching of font files and core assets.

## SEO Page Templates
- Implement dynamic routes `/pairs/[mood]/` for programmatic SEO targeting long-tail keywords (e.g., "luxury serif fonts", "startup typography").
- Utilize `src/lib/seo.ts` to automatically generate canonical tags, standard OpenGraph images, and structured JSON-LD data for these routes.

## Phased Roadmap

### Phase 1: High-ROI Core Features
1. **Live Website Preview**: Develop `LiveWebsitePreview` component.
2. **Mood-Based Typography**: Update data model and UI to prioritize mood selection.
3. **Typography System Generator**: Build core logic to generate full systems.
4. **Accessibility Scoring**: Implement and display readability/contrast metrics.
5. **Real Design Mockups**: Add varied context views (hero, dashboard).
6. **PaletteFlow Integration**: Link generated systems to color palettes.
7. **Save Typography Boards**: Implement local-storage saving mechanism.
8. **Export Design Tokens**: Provide CSS/Tailwind export utilities.

### Phase 2: Intelligence & Growth
9. **"Copy This Website" Feature**: URL-based heuristic font matching.
10. **Brand Personality Generator**: AI-ish flow based on user inputs.
11. **Massive Programmatic SEO**: Deploy thousands of generated pairing pages.
12. **Typography Trends Hub**: Curated editorial content section.
