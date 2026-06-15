# Section 5: High-Leverage Execution Systems (FontPair)

## 5.1 Component-Driven Tool Template System

To scale tools rapidly, we need a unified React component architecture.

**ToolTemplate Props Interface:**
```typescript
interface ToolTemplateProps {
  title: string;
  description: string;
  toolComponent: React.ReactNode; // The actual interactive part
  howItWorks: React.ReactNode;    // Markdown/HTML explaining the math
  faqs: { question: string; answer: string }[];
  relatedTools: { title: string; href: string }[];
}
```

---

## 5.2 AI-Assisted Tool Page Generator Prompt

*Use this prompt to generate new tools via AI quickly:*

```text
You are a Next.js App Router expert. Create a new page at `src/app/tools/px-to-rem/page.tsx`.
Use the `ToolTemplate` component.
The tool should convert PX to REM based on a base pixel size (default 16).
Implement the logic entirely client-side using React useState, but keep the page SSR-friendly.
Provide SEO metadata using the `generateMetadata` function from `@/lib/seo`.
Include an FAQ array with 3 questions about REM vs PX.
```

---

## 5.3 Automated Metadata Generation Pipeline

Our `seo.ts` needs to be able to dynamically construct highly clickable titles.

**Pipeline Logic:**
- If it's a Tool: `{Tool Name} - Free Online Calculator | FontPair`
- If it's a Pair: `{Heading Font} & {Body Font} Pairing | FontPair`
- If it's a Guide: `{Guide Title} | FontPair Typography Guides`

---

## 5.4 Deployment Pipeline & CI/CD Spec

**File:** `.github/workflows/seo-ci.yml`

**Steps:**
1. **Linting:** `eslint`
2. **Typecheck:** `tsc --noEmit`
3. **Build:** `next build`
4. **Deploy:** Vercel (Handled by Vercel GitHub App)
5. **Post-Deploy SEO Trigger:** Run `scripts/submit-sitemap.js` (Optional, could be a separate cron job).
