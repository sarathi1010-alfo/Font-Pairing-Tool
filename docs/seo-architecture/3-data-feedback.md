# Section 3: Data Feedback Loops (FontPair)

## 3.1 Weekly SEO Review Framework

### Purpose
To systematically identify breakout tools, diagnose indexing issues, and find content gaps using GSC and GA4.

### The 5 Strategic Questions
1. **Which tools are breaking out?** (High Impressions, High Clicks) -> *Action: Add more internal links to them.*
2. **Which pages have high impressions but low CTR?** -> *Action: Optimize Title/Meta Descriptions in `seo.ts`.*
3. **Which keywords have latent potential?** (High Impressions, Pos 15-50) -> *Action: Expand content on the page, add an FAQ section.*
4. **Which pages have zero clicks?** (Intent mismatch) -> *Action: Review SERP intent. Are they looking for a tool but we gave them a guide?*
5. **What new tools should be built?** -> *Action: Extract queries containing "generator", "checker", "converter".*

### SOP
- **When:** Every Monday at 9 AM.
- **Tools:** GSC (Performance Report), GA4 (Pages and Screens).

---

## 3.2 Dashboard Spec (GSC + GA4)

**Sections:**
1. **Breakout Tools:** Top 10 pages by MoM click growth.
2. **Opportunity Queue:** Pages with >1000 impressions and <2% CTR.
3. **Content Decay:** Pages losing >20% impressions MoM.
4. **New Tool Ideas:** Regex filter GSC queries for `* generator`, `* tool`, `* checker` where we rank >50.

---

## 3.3 Content Pruning Framework

**Inputs:**
- Page Age > 6 months
- Monthly Impressions < 50
- Organic Clicks = 0

**Decision Matrix:**
- **Optimize:** If it's a core utility tool, update the UI and metadata.
- **Consolidate:** Merge thin informational pages into a single large Hub Page (e.g., merge 5 short font history articles into one "History of Typefaces" guide).
- **Prune (404/Deindex):** If it's a completely irrelevant or broken page.

---

## 3.4 Keyword Expansion Loop

**Example Input Queries:**
- "check color contrast between two fonts"
- "how to scale font sizes for mobile"
- "best serif fonts for resumes"

**Generated Tool Ideas:**
1. Font Contrast Checker (Priority: High)
2. Fluid Typography Scaler Calculator (Priority: High)
3. Resume Font Pairing Generator (Priority: Medium)
