import fs from 'fs';
import path from 'path';

/**
 * FontFusion Content Generator
 * Automates MDX page generation from CSV data using standard templates.
 */

const TEMPLATES = {
  comparison: (data) => `---
title: "${data.entity_a} vs ${data.entity_b}: Which Font Pairing Tool is Better for ${data.use_case}?"
description: "${data.verdict}"
---

# ${data.entity_a} vs ${data.entity_b}: Which Font Pairing Tool is Better for ${data.use_case}?

<div className="aeo-snapshot p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-8 font-semibold">
  **Quick Verdict:** ${data.verdict}
</div>

## Comparison Table

| Feature | ${data.entity_a} | ${data.entity_b} | Winner |
| :--- | :--- | :--- | :--- |
${data.features ? data.features.split('|').map(f => `| ${f} | ✅ | ❌ | ${data.entity_a} |`).join('\n') : ''}

## Deep Dive: ${data.entity_a}

### Pros
${data.entity_a_pros ? data.entity_a_pros.split('|').map(p => `- ${p}`).join('\n') : ''}

### Cons
${data.entity_a_cons ? data.entity_a_cons.split('|').map(c => `- ${c}`).join('\n') : ''}

## Deep Dive: ${data.entity_b}

### Pros
${data.entity_b_pros ? data.entity_b_pros.split('|').map(p => `- ${p}`).join('\n') : ''}

### Cons
${data.entity_b_cons ? data.entity_b_cons.split('|').map(c => `- ${c}`).join('\n') : ''}

## When to choose each?

If you are looking for ${data.use_case}, **${data.entity_a}** is generally the superior choice due to its modern interface and seamless Google Fonts integration. However, if you need ${data.entity_b}'s specific legacy features, it might still be worth considering.

<div className="aeo-box p-6 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl my-12">
  ### Best Pick for ${data.use_case}
  **${data.entity_a}** is the recommended tool for designers who want speed and reliability.
</div>

[Try the FontFusion Generator](/)
`,

  collection: (data) => {
    let pairingsContent = '';
    for (let i = 1; i <= 5; i++) {
      const fontA = data[`pairing_${i}_font_a`];
      const fontB = data[`pairing_${i}_font_b`];
      const why = data[`pairing_${i}_why`];
      const css = data[`pairing_${i}_css`];

      if (fontA && fontB) {
        pairingsContent += `
## ${i}. ${fontA} + ${fontB}
- **Mood:** ${data.mood}
- **Why it works:** ${why || 'These fonts complement each other through contrast and balanced proportions.'}

\`\`\`css
/* ${fontA} & ${fontB} */
h1 { font-family: '${fontA}', serif; }
body { font-family: '${fontB}', sans-serif; }
\`\`\`
`;
      }
    }

    return `---
title: "5 ${data.mood} Font Pairings for ${data.industry} in 2026"
description: "${data.intro}"
---

# 5 ${data.mood} Font Pairings for ${data.industry} in 2026

${data.intro}

## Why ${data.mood} typography works for ${data.industry}

Typography sets the emotional tone for any ${data.industry} project. By using ${data.mood.toLowerCase()} pairings, you establish immediate trust and professional authority with your audience.
${pairingsContent}

## How to apply these pairings

To implement these in your project, simply import them from Google Fonts and apply the CSS styles provided. Ensure you maintain a clear hierarchy between the heading and body copy.

<div className="aeo-table my-8">
| Pairing | Fonts | Mood | Best For |
| :--- | :--- | :--- | :--- |
| ${data.pairing_1_font_a} | ${data.pairing_1_font_a} / ${data.pairing_1_font_b} | ${data.mood} | ${data.industry} |
</div>

[Discover more pairings in our generator](/)
`;
  },

  micro: (data) => `---
title: "What is ${data.term}?"
description: "${data.definition}"
---

# What is ${data.term}?

<div className="aeo-snapshot p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-8 font-semibold">
  **Definition:** ${data.definition}
</div>

## How Does ${data.term} Work?

${data.how_it_works}

## Real-World Example of ${data.term} in ${data.industry}

In ${data.industry} design, ${data.term} is used to ${data.example}. This ensures that the message is conveyed with the right level of impact.

## Why is ${data.term} Important?

${data.importance}

## ${data.term} vs ${data.related_term}

| Aspect | ${data.term} | ${data.related_term} |
| :--- | :--- | :--- |
| Primary Goal | Communication | Style |
| Usage | Essential | Decorative |

<div className="aeo-box p-6 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl my-12">
  ### Core Principles of ${data.term}
  ${data.principles ? data.principles.split('|').map(p => `- ${p}`).join('\n') : ''}
</div>

[Improve your design with the FontFusion Generator](/)
`
};

function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    // Basic CSV parser that handles quoted values with commas
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] ? values[i].replace(/^"|"$/g, '') : '';
    });
    return obj;
  });
}

function generatePages(type, csvPath) {
  if (!fs.existsSync(csvPath)) {
    console.error(\`CSV file not found: \${csvPath}\`);
    return;
  }

  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const data = parseCSV(csvContent);
  const template = TEMPLATES[type];

  if (!template) {
    console.error(\`No template found for type: \${type}\`);
    return;
  }

  const outputDir = path.join(process.cwd(), 'src/content', type === 'comparison' ? 'seo' : (type === 'collection' ? 'pairings' : 'blog'));

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  data.forEach(item => {
    if (!item.slug) return;
    const content = template(item);
    const filePath = path.join(outputDir, \`\${item.slug}.mdx\`);
    fs.writeFileSync(filePath, content);
    console.log(\`Generated \${filePath}\`);
  });
}

// Example usage: node scripts/generate-content.mjs comparison data/comparisons.csv
const [type, csvPath] = process.argv.slice(2);
if (type && csvPath) {
  generatePages(type, csvPath);
} else {
  console.log('Usage: node scripts/generate-content.mjs <type> <csvPath>');
  console.log('Types: comparison, collection, micro');
}
