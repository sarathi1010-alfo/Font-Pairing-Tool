# SEO Maintenance & Google Search Console Fix Plan

## Property: https://fontfusion.alfo.online

### 1. Identified Potential Issues (Pre-emptive)
Based on recent architectural changes and content expansion, the following GSC issues are likely to appear:

*   **Excluded by 'noindex' tag:** Expected for `/favorites` and any temporary preview URLs.
*   **Discovered - currently not indexed:** High risk for the 5,000+ programmatic SEO pages and 11 new URLs published today (2025-05-15).
*   **Crawled - currently not indexed:** Common for new content clusters before they gain internal link authority.
*   **404 (Not Found):** Potential issues if old `/fonts/[name]` URLs were not properly redirected after slug normalization (e.g., underscores to hyphens).

### 2. Fix Plan

#### Phase 1: Rapid Indexing (Immediate)
*   **Sitemap Update:** Ensure `sitemap.xml` and `sitemap-articles.xml` are refreshed and submitted. (Status: Completed 2025-05-15)
*   **IndexNow Trigger:** Ping IndexNow API for all 11 new URLs to notify Bing/Yandex/DuckDuckGo immediately. (Status: Completed 2025-05-15)
*   **Manual URL Inspection:** Manually request indexing for the Tier 1 article (`/blog/professional-font-pairing-guide`) in GSC to accelerate its appearance in SERPs. (Next Step)

#### Phase 2: Technical Hygiene (Next 7 Days)
*   **Redirect Audit:** Run a script to identify any incoming 404s from external backlinks and set up 301 redirects in `next.config.ts`.
*   **Internal Link Strengthening:** Increase the number of internal links pointing to "Discovered - currently not indexed" pages from high-authority pages like the homepage.
*   **Canonical Audit:** Verify all pages have the absolute HTTPS canonical tag to prevent duplicate content issues between `www` and non-`www` or Vercel preview branches.

#### Phase 3: Content Quality (Ongoing)
*   **Pillar Content Refresh:** Regularly update `lastModified` dates for Tier 1 articles (like today's professional pairing guide) to signal freshness to crawlers.
*   **AEO Validation:** Ensure FAQ schema is valid and appearing in GSC "Enhancements" report.

### 3. Monitoring Schedule
*   **Daily:** Check GSC for "Security & Manual Actions."
*   **Weekly:** Review "Indexing" coverage report and "Core Web Vitals."
*   **Monthly:** Audit "Search Results" for keyword cannibalization between programmatic pages.
