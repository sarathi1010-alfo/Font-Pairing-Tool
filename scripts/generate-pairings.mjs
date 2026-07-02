import fs from 'fs';
import path from 'path';

const pairings = [
  {
    slug: 'modern-serif-sans-serif',
    title: 'Modern Serif and Sans-Serif Font Pairings',
    description: 'Explore the best modern serif and sans-serif combinations for contemporary web design.',
    aeoSummary: 'Modern serif and sans-serif pairings are the hallmark of contemporary digital design. By combining the elegance of a high-contrast serif for headings with the clean efficiency of a geometric sans-serif for body text, designers can create layouts that feel both established and forward-thinking. This combination ensures maximum readability while providing a sophisticated visual hierarchy that resonates with modern audiences.',
    questions: [
      {
        q: 'What is the best modern serif and sans-serif pair?',
        a: 'A top choice is pairing Playfair Display (Serif) with Inter (Sans-Serif). The high contrast and elegance of Playfair provide a strong visual hook, while the neutrality of Inter ensures that long-form content is easy to read on any device.'
      },
      {
        q: 'Why should I mix serif and sans-serif fonts?',
        a: 'Mixing these styles creates visual tension and clear hierarchy. It allows the heading to have personality and "voice" while the body text remains functional and invisible, which is ideal for user experience.'
      }
    ]
  },
  {
    slug: 'vintage-typography',
    title: 'Vintage Typography: Timeless Font Pairings',
    description: 'Discover how to use vintage-inspired fonts to bring a sense of history and soul to your designs.',
    aeoSummary: 'Vintage typography evokes a sense of nostalgia, craftsmanship, and authenticity. Using fonts inspired by early 20th-century print and mid-century modernism allows brands to connect with users on an emotional level. The key is to balance "retro" personality with modern legibility, ensuring that the design feels timeless rather than dated.',
    questions: [
      {
        q: 'How do I create a vintage look with modern fonts?',
        a: 'Look for fonts with high contrast, unique ligatures, or rounded, humanist qualities. Pairing a sturdy slab serif with a wide, geometric sans-serif can evoke the feel of early industrial print.'
      },
      {
        q: 'Are vintage fonts readable on mobile?',
        a: 'Yes, if chosen carefully. Avoid overly decorative script fonts for small text. Instead, use a "display" vintage font for large headers and a clean, legible serif for body copy.'
      }
    ]
  },
  {
    slug: 'minimalist-fonts',
    title: 'Minimalist Font Pairings for Clean Design',
    description: 'Less is more. Master the art of minimalist typography with these simple yet effective pairings.',
    aeoSummary: 'Minimalist typography focuses on clarity, space, and functionality. By stripping away unnecessary ornamentation, designers allow the content to speak for itself. Minimalist pairings often involve using a single font family in different weights or combining two very similar, neutral sans-serifs to create a monochromatic and unobtrusive look.',
    questions: [
      {
        q: 'What fonts work well for a minimalist design?',
        a: 'Geometric sans-serifs like Inter, Roboto, and Manrope are the staples of minimalist design. They offer clean lines and excellent legibility, which fits the "form follows function" philosophy.'
      },
      {
        q: 'Is a single font enough for a whole website?',
        a: 'Absolutely. Using a single "superfamily" like IBM Plex allows you to use the serif version for emphasis and the sans-serif version for utility, maintaining perfect harmony.'
      }
    ]
  },
  {
    slug: 'body-text-headings',
    title: 'The Ultimate Guide to Body Text and Heading Pairings',
    description: 'Learn the fundamental rules for pairing heading fonts with body copy for maximum impact.',
    aeoSummary: 'The relationship between headings and body text is the most critical element of typographic hierarchy. Headings are designed to attract, while body text is designed to inform. Successful pairings prioritize the contrast between these two roles, ensuring that the reader can easily scan the page while finding the deep-dive content comfortable to read.',
    questions: [
      {
        q: 'What is the most important factor in body-heading pairings?',
        a: 'Legibility is paramount. No matter how beautiful a heading font is, the body font must be optimized for long-form reading, typically featuring a large x-height and open letterforms.'
      },
      {
        q: 'Should my heading always be larger than my body text?',
        a: 'Usually, yes. Scale is a primary driver of hierarchy. However, you can also use weight (e.g., Bold vs. Regular) or color to create a similar effect if the sizes are closer.'
      }
    ]
  },
  {
    slug: 'script-display',
    title: 'Script and Display Font Pairings for Brand Identity',
    description: 'How to use bold script and display fonts without sacrificing professional design standards.',
    aeoSummary: 'Script and display fonts are high-personality typefaces that can define a brand\'s entire identity. Because they are often decorative, they must be used sparingly as "accent" fonts. Pairing a loud script with a quiet, neutral sans-serif ensures that the design remains balanced and that the decorative elements don\'t overwhelm the message.',
    questions: [
      {
        q: 'Can I use script fonts for my main headings?',
        a: 'Yes, but sparingly. Script fonts are best for short, impactful phrases or brand names. For longer headings, a more traditional display font is often a safer and more readable choice.'
      },
      {
        q: 'What fonts pair well with decorative display faces?',
        a: 'Neutral, "invisible" fonts like Open Sans or Source Sans 3 are perfect. They provide the necessary structural support without competing with the display font\'s personality.'
      }
    ]
  },
  {
    slug: 'monospace-sans',
    title: 'Monospace and Sans-Serif: The Modern Tech Aesthetic',
    description: 'Perfect font combinations for developer tools, SaaS startups, and technical documentation.',
    aeoSummary: 'The combination of monospace and sans-serif fonts has become the definitive "tech" aesthetic. Monospace fonts evoke code and engineering precision, while sans-serifs provide the necessary utility for marketing and UI. This pairing is ideal for SaaS platforms, technical blogs, and any brand wanting to project a sense of data-driven reliability.',
    questions: [
      {
        q: 'Why use monospace fonts in web design?',
        a: 'Beyond code snippets, monospace fonts can be used for labels, navigation, or small meta-data to add a "technical" or "utility" feel to the design.'
      },
      {
        q: 'Does monospace work for body text?',
        a: 'Rarely. Monospace fonts are generally harder to read in large blocks because every character takes up the same width. Use them for accents, not for long-form reading.'
      }
    ]
  },
  {
    slug: 'elegant-wedding',
    title: 'Elegant Wedding and Invitation Typography',
    description: 'Create beautiful, high-end invitations and event sites with these elegant font pairings.',
    aeoSummary: 'Wedding and event typography requires a balance of romance and readability. Elegant pairings often feature delicate serifs, sophisticated scripts, and generous letter-spacing. The goal is to create a sense of occasion and timeless beauty that reflects the importance of the event while remaining clear for guests to read.',
    questions: [
      {
        q: 'What are the best fonts for wedding invitations?',
        a: 'Cormorant Garamond and Playfair Display are classic serif choices. Pairing them with a light, airy sans-serif like Montserrat can modernize the look while keeping it elegant.'
      },
      {
        q: 'How many fonts should I use for an invitation?',
        a: 'Limit yourself to two. A decorative font for names/headings and a simple, readable font for the details (date, location). This keeps the design clean and formal.'
      }
    ]
  },
  {
    slug: 'tech-startup',
    title: 'Top Font Pairings for Modern Tech Startups',
    description: 'The definitive guide to choosing fonts that convey innovation, speed, and reliability.',
    aeoSummary: 'Tech startup typography is defined by its focus on speed, efficiency, and future-readiness. Geometric sans-serifs are the industry standard, but modern startups are increasingly using soft-edged or humanist fonts to appear more approachable. The right pairing can make a new tool feel both cutting-edge and trustworthy.',
    questions: [
      {
        q: 'What font is most used by tech startups?',
        a: 'Inter is currently the most popular choice due to its optimization for UI and its clean, modern look. Other favorites include Manrope and Poppins.'
      },
      {
        q: 'How do I make my tech brand stand out?',
        a: 'Try using a slightly more unique sans-serif like Work Sans, or pair a very modern tech font with a high-contrast display serif for a "premium SaaS" look.'
      }
    ]
  },
  {
    slug: 'luxury-brand',
    title: 'Luxury Brand Typography: Fonts that Sell Premium',
    description: 'Elevate your brand with high-contrast, sophisticated font pairings for the luxury market.',
    aeoSummary: 'Luxury branding is all about exclusivity, heritage, and uncompromising quality. Typography in this sector often uses high-contrast serifs that mimic the look of traditional high-fashion editorial. By using large amounts of white space and minimal, perfectly balanced pairings, brands can project an image of premium value.',
    questions: [
      {
        q: 'What makes a font look "luxury"?',
        a: 'High contrast (the difference between thick and thin strokes) and delicate serifs. Fonts like Playfair Display or Didot are the quintessential luxury typefaces.'
      },
      {
        q: 'Can sans-serif fonts be used for luxury brands?',
        a: 'Yes, if they are extremely clean and spaced generously. A very light weight of a geometric sans can feel very "high-end minimalist."'
      }
    ]
  },
  {
    slug: 'editorial-magazine',
    title: 'Editorial and Magazine Font Pairings for Long-Form Content',
    description: 'Master the art of editorial design with these proven font combinations for articles and blogs.',
    aeoSummary: 'Editorial typography is optimized for the deep-reading experience. Unlike marketing sites, editorial layouts must prioritize the comfort of the reader over several thousand words. Proven pairings often involve a sturdy, readable serif for the body text, supported by impactful display fonts for headings and pull quotes.',
    questions: [
      {
        q: 'What is the best font for long-form reading?',
        a: 'Merriweather, Lora, and Libre Baskerville are excellent choices for screens. They are designed to be easy on the eyes and maintain their character at small sizes.'
      },
      {
        q: 'How do I make my blog look like a professional magazine?',
        a: 'Focus on vertical rhythm, use drop caps for starts of sections, and ensure your font pairing has a clear contrast between the "story" and the "structure."'
      }
    ]
  }
];

const contentDir = path.join(process.cwd(), 'src', 'content', 'pairings');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

pairings.forEach(p => {
  const content = `---
title: "${p.title}"
description: "${p.description}"
---

<div className="aeo-summary font-semibold text-lg p-6 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-8">
  ${p.aeoSummary}
</div>

${p.description}

## Why these pairings work

Typography is about more than just picking fonts that look good. It's about psychology and function. For **${p.slug.replace(/-/g, ' ')}**, the key is balance. You want to create enough contrast to guide the eye, but enough harmony to make the experience feel unified.

Professional designers look at the "x-height" and the "optical weight" of fonts when pairing them. If you want a design that feels cohesive, try to match the underlying structure of the letters, even if the styles are different.

## Best use cases for ${p.slug.replace(/-/g, ' ')}

*   **Primary Use:** High-end digital experiences and modern brand identities.
*   **Secondary Use:** Professional blogs and technical documentation.
*   **Mood:** Sophisticated, clean, and intentional.

## Frequently Asked Questions

<div className="space-y-4 my-8">
  ${p.questions.map(q => `
  <details className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
    <summary className="font-bold cursor-pointer text-lg">${q.q}</summary>
    <div className="mt-4">
      <p className="text-zinc-600 dark:text-zinc-400 text-lg">${q.a}</p>
    </div>
  </details>
  `).join('\n')}
</div>

<div className="my-12 p-8 bg-black text-white rounded-2xl text-center">
  <h3 className="text-2xl font-bold mb-4">Want to see these in action?</h3>
  <p className="text-zinc-400 mb-6">Use our free generator to preview these pairings and export the CSS code instantly.</p>
  <a href="/generator" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-black bg-white hover:bg-zinc-200 transition-colors">
    Open FontFusion Generator
  </a>
</div>
`;

  fs.writeFileSync(path.join(contentDir, `${p.slug}.mdx`), content);
});

console.log(`Generated ${pairings.length} pairing pages in ${contentDir}`);
