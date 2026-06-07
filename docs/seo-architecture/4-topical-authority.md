# Section 4: Topical Authority Cluster Engine (FontPair)

## 4.1 Cluster Architecture Designer

### Cluster: Typography Tools

**Hub Page:** `/tools` (Title: "Free Typography Tools for Designers")

**Spoke Pages:**
- `/tools/contrast-checker` (Check WCAG contrast for fonts)
- `/tools/fluid-type-calculator` (Generate clamp() CSS)
- `/tools/line-height-calculator` (Golden ratio line heights)
- `/tools/px-to-rem-converter` (Utility)

**Internal Linking Graph:**
- All tools link to `/tools` via breadcrumbs.
- Contrast Checker links to Fluid Type Calculator ("Related Tools").
- Hub page lists all tools with brief descriptions.

---

## 4.2 Hub Page Brief Generator

**Title:** Free Typography Tools for Designers & Developers
**Intent:** User needs a quick utility to solve a specific CSS/design typography math problem.

**Structure:**
- H1: Free Typography Tools for UI Design
- H2: Calculators & Generators
  - H3: Font Contrast Checker
  - H3: Fluid Type Scale Generator
- H2: Conversion Utilities
  - H3: PX to REM Converter
- FAQ Section (FAQ Schema applied)

---

## 4.3 Inter-Cluster Semantic Linking

**Clusters:** `Tools` <-> `Guides` <-> `Pairs`
- **Example:** On the `Fluid Type Calculator` tool page, link to the `/guides/understanding-responsive-typography` guide.
- **Example:** On the `/pairs/inter-roboto` page, link to the `Contrast Checker` tool to let them test the colors of that pair.

---

## 4.4 EEAT Signal Audit for Utility Tools

For FontPair's tools, EEAT is demonstrated by:
1. **Expertise:** The tools are mathematically accurate (e.g., WCAG 2.1 formulas for contrast).
2. **Authoritativeness:** Clear explanations of *how* the math works below the tool.
3. **Trustworthiness:** No ads blocking the tool, clear privacy policy (no data saved).

**Checklist for each tool:**
- [ ] Does it solve the problem instantly above the fold?
- [ ] Is the methodology/formula explained below the fold?
- [ ] Is there a "Created by" or author signal?
- [ ] Is SoftwareApplication Schema applied?
