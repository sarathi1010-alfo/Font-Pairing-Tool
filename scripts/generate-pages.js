#!/usr/bin/env node

/**
 * Programmatic SEO Engine Generator (Phase 4)
 * Reads data/seo-tools-data.json and generates MDX pages.
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(process.cwd(), 'data', 'seo-tools-data.json');
const contentDir = path.join(process.cwd(), 'src', 'content');

if (!fs.existsSync(dataPath)) {
  console.error("No SEO data found at", dataPath);
  process.exit(1);
}

const seoData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Ensure content directories exist
const pagesDir = path.join(contentDir, 'seo');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

function generateMdxTemplate(title, keyword, intro, type) {
  return `---
title: "${title}"
description: "${intro}"
keyword: "${keyword}"
type: "${type}"
---

# ${title}

${intro}

Finding the right typography is hard. When searching for **${keyword}**, you need fonts that are reliable, readable, and look premium.

## Why this matters

The typography you choose dictates how users perceive your brand.

<div className="my-8">
  <a href="/generator" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-zinc-800">
    Try FontPair Generator
  </a>
</div>

## Frequently Asked Questions

<details>
  <summary>What makes a good font pairing?</summary>
  <p>Contrast is key. Mixing a serif with a sans-serif, or varying weights significantly, creates visual interest.</p>
</details>

<details>
  <summary>Are these fonts free for commercial use?</summary>
  <p>Yes, FontPair exclusively features open-source fonts from Google Fonts.</p>
</details>
`;
}

let generatedCount = 0;

seoData.forEach((toolData) => {
  // Generate Use Cases
  if (toolData.useCases) {
    toolData.useCases.forEach((useCase) => {
      const filePath = path.join(pagesDir, `${useCase.slug}.mdx`);
      const content = generateMdxTemplate(useCase.title, useCase.keyword, useCase.intro, 'use-case');
      fs.writeFileSync(filePath, content);
      console.log(`Generated Use Case: ${useCase.slug}`);
      generatedCount++;
    });
  }

  // Generate Comparisons
  if (toolData.comparisons) {
    toolData.comparisons.forEach((comp) => {
      const filePath = path.join(pagesDir, `vs-${comp.competitor}.mdx`);
      const content = generateMdxTemplate(comp.title, comp.keyword, comp.intro, 'comparison');
      fs.writeFileSync(filePath, content);
      console.log(`Generated Comparison: vs-${comp.competitor}`);
      generatedCount++;
    });
  }

  // Generate Templates
  if (toolData.templates) {
    toolData.templates.forEach((tpl) => {
      const filePath = path.join(pagesDir, `templates-${tpl.category}.mdx`);
      const content = generateMdxTemplate(tpl.title, tpl.keyword, tpl.intro, 'template');
      fs.writeFileSync(filePath, content);
      console.log(`Generated Template: ${tpl.category}`);
      generatedCount++;
    });
  }
});

console.log(`\n🎉 Programmatic SEO Engine complete! Generated ${generatedCount} pages.`);
