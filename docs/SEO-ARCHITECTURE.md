# SEO Architecture & URL Management (App Router)

This document outlines the production-grade SEO architecture for the Next.js tool ecosystem.

## Why this Fix Matters
Previously, Google was crawling default `*.vercel.app` URLs due to missing indexing protection and hardcoded fallback domains. This caused duplicate content penalties and dilution of domain authority.

By centralizing the `SITE_URL` logic based on environments, and using middleware to inject `X-Robots-Tag: noindex`, we ensure:
1. Only your custom production subdomain (e.g. `fontpair.alfo.online`) is indexed.
2. Canonical tags accurately report the primary domain.
3. Open Graph & Twitter Cards resolve images using absolute URLs correctly.
4. The `sitemap.xml` generated uses the correct hostname.

## Before vs After

### 1. Sitemap Generation (`src/app/sitemap.ts`)
**Before:** Hardcoded domain string (`https://fontpairing.com`).
**After:** Uses dynamic `SITE_URL` from environment config.

### 2. Layout Metadata (`src/app/layout.tsx`)
**Before:** Hardcoded title/description and no canonical setup.
**After:** Uses a reusable `constructMetadata` function from `src/lib/seo.ts` which automatically binds `metadataBase`, structured schema, and absolute canonical tags.

### 3. Vercel Indexing Protection (`src/middleware.ts`)
**Before:** No header interception.
**After:** Intercepts `host` and injects `X-Robots-Tag: noindex, nofollow` if the domain includes `.vercel.app`.

## Deployment Checklist
- [ ] Ensure `NEXT_PUBLIC_SITE_URL` is set in the Vercel Production Environment Variables (e.g., `NEXT_PUBLIC_SITE_URL=https://paletteflow.alfo.online`).
- [ ] Run a local build (`pnpm build`) to verify `sitemap.xml` and `robots.txt` compile correctly.
- [ ] Push to main branch to trigger a Vercel deployment.

## Search Console Validation Steps
1. Navigate to Google Search Console -> URL Inspection.
2. Enter your custom domain (e.g., `https://fontpair.alfo.online`).
3. Ensure "User-declared canonical" matches the URL.
4. Open the "Sitemaps" tab, add `sitemap.xml`, and hit "Submit".
5. Wait for the success status and verify "Discovered pages" count matches.

## Testing Verification Command
You can test the robots tag on the preview environment using cURL:
```bash
curl -I https://your-preview-deployment.vercel.app
```
Look for `x-robots-tag: noindex, nofollow` in the response headers.
