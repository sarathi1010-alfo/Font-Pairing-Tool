/**
 * Global Configuration for the Application
 * Handles environment-specific variables and standardizes the domain setup.
 */

// We strictly enforce the production domain for all builds (including Vercel previews)
// to ensure canonical sitemaps and robots.txt are consistent and pass validation.
export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Always use the primary production domain for static exports and SEO consistency
  return "https://fontfusion.alfo.online";
};

export const SITE_URL = getBaseUrl();

export const siteConfig = {
  name: "FontFusion | alfo.online",
  description: "Find font pairs that look premium, readable, and ready to ship.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og-image.jpg`,
  creator: "alfo.online",
};
