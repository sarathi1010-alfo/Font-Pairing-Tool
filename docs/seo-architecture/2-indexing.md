# Section 2: Indexing Domination (FontFusion)

## 2.1 Indexing Audit Checklist

Before considering a batch of micro-tools (e.g., Font Contrast Checker, Font Scaler) "done", run this indexing audit.

| Check | How to Test | Pass Criteria | What to Fix If Failing |
|-------|-------------|---------------|------------------------|
| **Noindex Tag Check** | Inspect source code `<meta name="robots">` | Should be missing or set to `index, follow` | Remove errant `noIndex: true` from `constructMetadata` calls. |
| **JS Blocking** | Turn off JS in browser / use Google Mobile-Friendly Test | Page content (especially the tool output) must be visible. | If purely client-side, rewrite the tool to use SSR or inject critical state in initial HTML. |
| **Canonical Tags** | Inspect `<link rel="canonical">` | Must exactly match the clean URL without parameters. | Check the `path` prop passed to `constructMetadata` in `seo.ts`. |
| **Server Errors (5xx)** | Test heavy tools via Vercel logs during build/SSR. | Tools must load in < 2 seconds without timing out. | Optimize calculation logic; cache heavy external API calls. |
| **Internal Link Reachability** | Crawl site with Screaming Frog / Sitebulb. | Page must be max 3 clicks from homepage. | Add the tool link to the `/tools` hub and sibling tool sidebars. |
| **Duplicate Content** | Check for URL parameters (e.g., `?fg=000`) | Parameters should canonicalize to the base URL. | Ensure SSR logic handles default states and canonical points to base. |

---

## 2.2 Crawl Budget Optimization Plan

### 10 Crawl Budget Optimizations for FontFusion
1. **Flat URL Structure:** Keep all tools at `/tools/[name]`. No deep nesting.
2. **Aggressive `robots.txt` Blocking:** Block `/api/`, `/_next/`, and user-state paths like `/favorites`.
3. **Dynamic XML Sitemap:** Ensure sitemap updates automatically on deploy (already implemented in `sitemap.ts`).
4. **Hub Page Authority:** Ensure the `/tools` and `/browse` pages link heavily to individual children.
5. **Vercel Edge Caching:** Utilize `stale-while-revalidate` (ISR) where appropriate to keep TTFB low.
6. **Eliminate 404/301 Chains:** Fix any broken links in markdown guides immediately.
7. **Canonicalize Parameter States:** Ensure `?font=inter&size=16` canonicalizes back to the base tool URL.
8. **Compress Fonts:** Preload only the subset of characters needed for previews.
9. **Remove Orphan Pages:** Ensure every page is linked from at least 2 other pages.
10. **Monitor GSC Crawl Stats:** Watch "Host Issues" in Search Console weekly.

### Monitoring Plan
- **Weekly Check:** Google Search Console > Settings > Crawl Stats.
- **Target:** Maintain > 95% "OK" status for all crawl requests. Watch for spikes in "Server Error (5xx)".

---

## 2.3 Indexing Failure Debugger

| GSC Status Code | Likely Cause in Next.js | Diagnosis & Fix |
|-----------------|-------------------------|-----------------|
| **Crawled - currently not indexed** | Google thinks the tool page is thin or lacks unique value. | **Fix:** Add a "How to use this tool" section, FAQ schema, and unique text content below the interactive tool. |
| **Discovered - currently not indexed** | Crawl budget issue or server response was too slow during Googlebot's visit. | **Fix:** Check Vercel function execution times. Increase internal linking to the page. |
| **Duplicate, Google chose different canonical** | URL parameter variants are being indexed. | **Fix:** Ensure `<link rel="canonical">` points to the base URL without query parameters. |
| **Server error (5xx)** | Vercel Serverless Function timed out or crashed. | **Fix:** Check Vercel error logs. Optimize heavy calculations or external data fetches. |
| **Blocked by robots.txt** | Path matches a rule in `robots.ts`. | **Fix:** Review `robots.ts` allow/disallow arrays. |