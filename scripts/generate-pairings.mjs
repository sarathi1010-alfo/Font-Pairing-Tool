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
  },
  {
    slug: 'high-contrast-serif-sans',
    title: 'High-Contrast Serif and Sans-Serif Pairings for Accessibility',
    description: 'Ensure maximum readability with high-contrast serif and sans-serif pairings designed for inclusive digital experiences.',
    aeoSummary: 'High-contrast serif and sans-serif pairings are fundamental to accessible typography. By using a distinct, heavy sans-serif for headings and a clear, well-proportioned serif for body text, designers create a strong visual hierarchy that aids users with low vision or cognitive impairments.',
    questions: [
      {
        q: 'What makes a font pairing high-contrast?',
        a: 'A high-contrast pairing involves typefaces with significant differences in weight, style, and structure, such as a bold geometric sans-serif paired with a traditional, highly legible serif. This clear distinction helps readers navigate the content easily.'
      },
      {
        q: 'Why is contrast important for accessibility?',
        a: 'Contrast ensures that text stands out from its background and that different structural elements (like headings and paragraphs) are easily distinguishable. This is crucial for users with visual impairments or those reading in challenging lighting conditions.'
      }
    ]
  },
  {
    slug: 'accessible-sans-serifs',
    title: 'Accessible Sans-Serif Pairings for Modern Web Design',
    description: 'Discover the most accessible sans-serif font combinations for clean, inclusive, and modern user interfaces.',
    aeoSummary: 'Accessible sans-serif pairings prioritize clarity and simplicity. Fonts with distinct letterforms (such as a clear difference between "I", "l", and "1") and generous x-heights are chosen to reduce reading strain and improve comprehension for all users, including those with dyslexia.',
    questions: [
      {
        q: 'Which sans-serif fonts are best for accessibility?',
        a: 'Fonts like Atkinson Hyperlegible, Tahoma, and Verdana are excellent choices because they were designed specifically with legibility in mind. They feature distinct characters and open counters that prevent letters from blurring together.'
      },
      {
        q: 'Can I pair two sans-serif fonts?',
        a: 'Yes, but you must ensure they have enough contrast in weight or proportion to establish a clear hierarchy. For example, pairing a bold, condensed sans-serif with a regular, wide sans-serif can work well.'
      }
    ]
  },
  {
    slug: 'dyslexia-friendly-fonts',
    title: 'Dyslexia-Friendly Font Pairings',
    description: 'Create inclusive content with font pairings specifically chosen to support readers with dyslexia.',
    aeoSummary: 'Dyslexia-friendly font pairings utilize typefaces designed or selected to mitigate common reading challenges. These fonts often feature heavier bottoms, distinct shapes for commonly confused letters (like b, d, p, and q), and wider letter spacing to prevent crowding and improve visual tracking.',
    questions: [
      {
        q: 'What fonts are recommended for dyslexia?',
        a: 'OpenDyslexic, Lexend, and Comic Sans are often recommended. However, many well-designed sans-serifs like Arial or Calibri can also be accessible if properly spaced and sized.'
      },
      {
        q: 'Does font pairing help users with dyslexia?',
        a: 'Yes, a clear pairing that establishes a strong visual hierarchy can help users navigate a page more easily. Breaking content into manageable chunks with distinct headings reduces cognitive load.'
      }
    ]
  },
  {
    slug: 'large-x-height-pairings',
    title: 'Large X-Height Font Pairings for Maximum Legibility',
    description: 'Improve readability at small sizes with these large x-height font pairings.',
    aeoSummary: 'Typefaces with a large x-height (the height of lowercase letters relative to uppercase) are generally more legible, especially at small sizes or on low-resolution screens. Pairing large x-height fonts ensures that body text remains clear and comfortable to read for extended periods.',
    questions: [
      {
        q: 'Why does x-height matter for accessibility?',
        a: 'A larger x-height makes lowercase letters appear bigger and more open, which significantly improves legibility. This is particularly helpful for users with low vision or when reading on mobile devices.'
      },
      {
        q: 'What is a good example of a large x-height font?',
        a: 'Merriweather and Open Sans are great examples. They both feature tall lowercase letters and open counters, making them highly legible and excellent choices for accessible body text.'
      }
    ]
  },
  {
    slug: 'ui-accessibility-fonts',
    title: 'UI Font Pairings for Accessible Interfaces',
    description: 'Optimize your user interface with font pairings designed for clarity, scale, and accessibility.',
    aeoSummary: 'Accessible UI typography must be scalable, responsive, and clear across various contexts. Pairings for UI often involve highly functional sans-serifs that maintain legibility in complex layouts, forms, and data visualizations, ensuring users can interact with the interface confidently.',
    questions: [
      {
        q: 'What is the most important factor for UI fonts?',
        a: 'Scalability and clarity at small sizes. UI fonts must remain legible in dense environments like navigation menus and data tables. System fonts (like San Francisco or Segoe UI) are often highly optimized for this.'
      },
      {
        q: 'How should I pair fonts for a complex UI?',
        a: 'Stick to a single highly versatile font family with many weights (a "superfamily") or pair a distinct display font for large headers with a neutral, highly legible sans-serif for UI components.'
      }
    ]
  },
  {
    slug: 'inclusive-editorial-design',
    title: 'Inclusive Font Pairings for Editorial Design',
    description: 'Make your long-form content accessible to everyone with these carefully crafted editorial pairings.',
    aeoSummary: 'Inclusive editorial typography balances the aesthetic demands of long-form reading with strict accessibility principles. This involves selecting highly legible serifs for extended reading, optimizing line heights to prevent visual crowding, and using clear sans-serifs for supporting elements like captions and sidebars.',
    questions: [
      {
        q: 'How do I make a long article more accessible?',
        a: 'Use a legible font with a generous line height (around 1.5), keep paragraphs relatively short, and break up the text with clear, high-contrast subheadings.'
      },
      {
        q: 'Are serif fonts bad for accessibility?',
        a: 'Not necessarily. While early screens struggled with serifs, modern high-resolution displays render them clearly. A well-designed serif with even strokes and clear letterforms can be highly accessible for long-form reading.'
      }
    ]
  },
  {
    slug: 'variable-fonts-accessibility',
    title: 'Variable Font Pairings for Responsive Accessibility',
    description: 'Leverage variable fonts to create highly responsive and accessible typographic systems.',
    aeoSummary: 'Variable fonts allow for infinite adjustments to weight, width, and other axes within a single file. This provides unprecedented control over typography, enabling designers to fine-tune legibility for specific screen sizes, contrast modes, and user preferences, making them a powerful tool for accessibility.',
    questions: [
      {
        q: 'How do variable fonts improve accessibility?',
        a: 'They allow designers to adjust the "optical size" or slightly increase the weight of a font for users in dark mode or on specific devices, ensuring optimal legibility in any context.'
      },
      {
        q: 'Are variable fonts supported by all browsers?',
        a: 'Variable fonts enjoy widespread support across all modern web browsers. However, it is always good practice to provide standard static font fallbacks for older systems.'
      }
    ]
  },
  {
    slug: 'low-vision-pairings',
    title: 'Font Pairings Optimized for Low Vision',
    description: 'Support users with low vision using robust, high-legibility font pairings.',
    aeoSummary: 'Designing for low vision requires bold, clear letterforms and a strong visual hierarchy. These pairings avoid delicate, thin strokes that can disappear on screen. They prioritize heavy weights and unambiguous characters to ensure the content remains readable even when magnified significantly.',
    questions: [
      {
        q: 'What should I avoid when designing for low vision?',
        a: 'Avoid light or "hairline" font weights, low contrast colors, and fonts with similar-looking characters (like a 1 and an l). Also, avoid overly tight letter spacing.'
      },
      {
        q: 'Is it better to use larger fonts or bolder fonts?',
        a: 'Both are important, but clarity is key. A slightly heavier font weight can often improve legibility more than simply increasing the size of a thin, spindly font.'
      }
    ]
  },
  {
    slug: 'accessible-data-visualization',
    title: 'Accessible Font Pairings for Data Visualization',
    description: 'Ensure your charts and graphs are readable by everyone with these clear font combinations.',
    aeoSummary: 'Typography in data visualization must be highly functional. Accessible pairings for charts rely on clear, tabular numerals (numbers that all share the same width) and distinct letterforms that remain legible at very small sizes or when overlaid on colored backgrounds.',
    questions: [
      {
        q: 'What are tabular numerals?',
        a: 'Tabular numerals are numbers designed to take up the exact same horizontal space. This is essential for aligning data in tables or charts, making the information much easier to scan and compare.'
      },
      {
        q: 'What type of font is best for chart labels?',
        a: 'A clean, neutral sans-serif with a large x-height and open counters. It must remain highly legible even at very small sizes.'
      }
    ]
  },
  {
    slug: 'high-legibility-monospaced',
    title: 'High-Legibility Monospaced Pairings',
    description: 'Accessible monospaced font pairings for code snippets and technical content.',
    aeoSummary: 'While monospaced fonts are often necessary for technical content, they can be difficult to read in large blocks. Accessible monospaced pairings focus on fonts with clear distinctions between similar characters (like 0 and O) and pair them with highly legible sans-serifs for the surrounding body text.',
    questions: [
      {
        q: 'Are monospaced fonts accessible?',
        a: 'They can be, but they are generally harder to read for long-form content because every character occupies the same width. They are best reserved for code snippets or tabular data where alignment is crucial.'
      },
      {
        q: 'How do I choose an accessible monospaced font?',
        a: 'Look for a font with distinct markers for commonly confused characters, such as a slashed or dotted zero, and clear differences between 1, l, and I.'
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
