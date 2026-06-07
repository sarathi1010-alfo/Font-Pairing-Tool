# Section 1: Programmatic SEO Architecture (FontPair)

## 1.1 Full Architecture Blueprint

### Requirements
- **Goal:** Scale the FontPair ecosystem to 1,000+ indexed pages in 12 months.
- **Tech Stack:** Next.js (App Router), deployed on Vercel.
- **Rendering:** Hybrid rendering strategy (SSR/SSG/ISR).
- **URL Structure:** Flat hierarchy under tools, browse, compare, and guides.
- **Sitemap:** Dynamic sitemap index segmented by section to manage < 50k URLs efficiently.
- **Canonical & Schema:** Dynamic injection via `seo.ts` using unified helper.
- **Robots.txt:** Optimized.

### Recommended Folder Structure
```text
src/
├── app/
│   ├── layout.tsx                # Global HTML structure, JSON-LD context
│   ├── page.tsx                  # Hub/Home page (SSG)
│   ├── robots.ts                 # Programmatic robots.txt
│   ├── sitemap.ts                # Sitemap Index and core static routes
│   ├── [sitemap-id]/route.ts     # Dynamic sitemap segmented routes (e.g., /sitemap-tools.xml)
│   ├── tools/                    # Scalable micro-tools cluster
│   │   └── [tool-name]/page.tsx  # Dynamic Tool Spoke Pages (SSR/ISR)
│   ├── browse/
│   │   └── page.tsx              # Browse cluster hub (SSG)
│   ├── compare/
│   │   └── page.tsx              # Comparison cluster hub (SSG)
│   └── guides/                   # Informational guides cluster
│       └── [slug]/page.tsx       # SSG Markdown guides
├── components/
│   └── tools/
│       └── ToolTemplate.tsx      # Reusable UI component for all tools
├── lib/
│   ├── seo.ts                    # Metadata construction pipeline & canonicalization
│   └── config.ts                 # SITE_URL and env config
```

---

## 1.2 Rendering Strategy Selector

For the FontPair ecosystem, different page types require different rendering mechanisms based on user interactivity, data freshness, and SEO requirements.

| Tool / Page Type | Recommended Strategy | Rationale |
|------------------|----------------------|-----------|
| **Font Contrast Checker** | **SSR** | Output heavily depends on real-time user input (hex codes). High interactivity and low caching necessity for the dynamic states. |
| **List of Best Font Pairs** | **SSG** | Content is static, changes rarely (only on deployments). Ideal for extremely fast LCP and maximum crawlability. |
| **Dynamic Font Generator** | **ISR** | Can be semi-dynamic where the initial load is static but updates based on new font data or trending pairs every few hours. |
| **Typography Guides** | **SSG** | MDX guides are entirely static and should be heavily cached at the edge. |
| **"What is Kerning?" Glossary** | **SSG** | Educational guide, purely informational and unchanging. |

### Implementation Pattern Example (SSG - Guides)
```typescript
// app/guides/[slug]/page.tsx
export const dynamic = "force-static"; // Forces Static Site Generation
export function generateStaticParams() {
  return [{ slug: 'what-is-kerning' }];
}
export default function Page({ params }) { ... }
```

### Implementation Pattern Example (SSR - Tool)
```typescript
// app/tools/contrast/page.tsx
export const dynamic = "force-dynamic"; // Forces Server-Side Rendering
export default async function Page({ searchParams }) {
  // Access request-time searchParams (e.g., ?fg=000&bg=fff)
}
```

---

## 1.3 URL & Internal Link Architecture

### Clusters
1. **Browse Cluster:** `/browse`, `/fonts/[slug]`
2. **Pairs Cluster:** `/pairs/[slug]`
3. **Tools Cluster:** `/tools/[tool-name]`
4. **Guides Cluster:** `/guides/[slug]`

### Sample URLs
- `https://fontpair.alfo.online/tools/contrast-checker`
- `https://fontpair.alfo.online/tools/font-scaler`
- `https://fontpair.alfo.online/fonts/inter`
- `https://fontpair.alfo.online/pairs/inter-roboto`
- `https://fontpair.alfo.online/guides/pairing-sans-with-serif`

### Why Subfolders Beat Subdomains
Using subfolders (e.g., `/tools/...`) consolidates all domain authority into a single entity. Subdomains (e.g., `tools.fontpair.com`) are often treated as separate websites by Googlebot, diluting link equity and making it harder for new tools to rank based on the main site's existing authority.

### Internal Linking Logic (Pseudocode)
```typescript
function getInternalLinks(currentTool: ToolMetadata) {
  return {
    hub: '/tools',
    siblings: getToolsByCluster(currentTool.cluster)
      .filter(t => t.slug !== currentTool.slug)
      .slice(0, 3)
  };
}
```