import { Font } from './fonts';

export interface TypographyScale {
  baseSize: number; // in pixels, typically 16
  ratio: number;    // e.g. 1.25 for Major Third
  sizes: {
    xs: string;     // ~0.75rem / 12px
    sm: string;     // ~0.875rem / 14px
    base: string;   // 1rem / 16px
    lg: string;     // ~1.125rem / 18px
    xl: string;     // ~1.25rem / 20px
    '2xl': string;  // ~1.5rem / 24px
    '3xl': string;  // ~1.875rem / 30px
    '4xl': string;  // ~2.25rem / 36px
    '5xl': string;  // ~3rem / 48px
  };
}

export interface TypographySystem {
  heading: {
    font: Font;
    weight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  body: {
    font: Font;
    weight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  scale: TypographyScale;
  accessibilityScore: number;
}

/**
 * Generates a full typography system including scale and spacing rules
 * based on selected heading and body fonts.
 */
export function generateTypographySystem(
  headingFont: Font,
  bodyFont: Font,
  baseSize: number = 16,
  ratio: number = 1.25 // Major Third as default comfortable scale
): TypographySystem {

  // Define weights based on available weights in font data
  // Prefer bolder headings and normal body, falling back to what's available
  const headingWeight = headingFont.weights.includes(700) ? 700 : headingFont.weights.includes(600) ? 600 : headingFont.weights[0];
  const bodyWeight = bodyFont.weights.includes(400) ? 400 : bodyFont.weights.includes(500) ? 500 : bodyFont.weights[0];

  // Adjust line height and letter spacing based on font category
  const headingProps = {
    font: headingFont,
    weight: headingWeight,
    lineHeight: headingFont.category === 'display' ? 1.1 : 1.2,
    letterSpacing: headingFont.category === 'sans' ? '-0.02em' : 'normal'
  };

  const bodyProps = {
    font: bodyFont,
    weight: bodyWeight,
    lineHeight: bodyFont.category === 'serif' ? 1.6 : 1.5,
    letterSpacing: 'normal'
  };

  // Generate responsive scale sizes based on ratio
  // Base is 1rem. Calculate others recursively.
  const calcSize = (step: number) => {
    return `${(Math.pow(ratio, step)).toFixed(3)}rem`;
  };

  const scale: TypographyScale = {
    baseSize,
    ratio,
    sizes: {
      xs: calcSize(-2),     // base / ratio^2
      sm: calcSize(-1),     // base / ratio
      base: '1rem',
      lg: calcSize(1),
      xl: calcSize(2),
      '2xl': calcSize(3),
      '3xl': calcSize(4),
      '4xl': calcSize(5),
      '5xl': calcSize(6),
    }
  };

  // Calculate system-level accessibility/readability score
  // Primarily determined by the body font's score
  const baseAcc = bodyFont.accessibilityScore || 80;
  // Small penalty if heading font is difficult
  const headingAcc = headingFont.accessibilityScore || 80;

  const systemAccScore = Math.floor((baseAcc * 0.8) + (headingAcc * 0.2));

  return {
    heading: headingProps,
    body: bodyProps,
    scale,
    accessibilityScore: systemAccScore
  };
}

/**
 * Returns CSS variable strings for a given typography system
 */
export function generateSystemCSS(system: TypographySystem): string {
  return `
:root {
  --font-sans: ${system.body.font.name}, system-ui, sans-serif;
  --font-heading: ${system.heading.font.name}, ${system.heading.font.category === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif'};

  --font-weight-body: ${system.body.weight};
  --font-weight-heading: ${system.heading.weight};

  --line-height-body: ${system.body.lineHeight};
  --line-height-heading: ${system.heading.lineHeight};

  --letter-spacing-heading: ${system.heading.letterSpacing};

  --text-xs: ${system.scale.sizes.xs};
  --text-sm: ${system.scale.sizes.sm};
  --text-base: ${system.scale.sizes.base};
  --text-lg: ${system.scale.sizes.lg};
  --text-xl: ${system.scale.sizes.xl};
  --text-2xl: ${system.scale.sizes['2xl']};
  --text-3xl: ${system.scale.sizes['3xl']};
  --text-4xl: ${system.scale.sizes['4xl']};
  --text-5xl: ${system.scale.sizes['5xl']};
}
  `.trim();
}
