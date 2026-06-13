/**
 * Global Configuration for the Application
 * Handles environment-specific variables and standardizes the domain setup.
 */

// If a custom NEXT_PUBLIC_SITE_URL is provided, use it.
// If running on Vercel preview, use NEXT_PUBLIC_VERCEL_URL.
// Otherwise, default to localhost.
export const getBaseUrl = () => {
  return "https://fontpair.alfo.online";
};

export const SITE_URL = getBaseUrl();

export const siteConfig = {
  name: "FontPair | alfo.online",
  description: "Find font pairs that look premium, readable, and ready to ship.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og-image.jpg`,
  creator: "alfo.online",
};
