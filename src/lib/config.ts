/**
 * Global Configuration for the Application
 * Handles environment-specific variables and standardizes the domain setup.
 */

// If a custom NEXT_PUBLIC_SITE_URL is provided, use it.
// If running on Vercel preview, use NEXT_PUBLIC_VERCEL_URL.
// Otherwise, default to localhost.
export const getBaseUrl = () => {
 fix-sitemap-domain-10105491013897075260
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (
    process.env.VERCEL_ENV === "production" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
  ) {
    if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
    }
    return "https://fontfusion.alfo.online";
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://fontfusion.alfo.online"; // Fallback production URL
  return "https://fontpair.alfo.online";
jules-1134815465466981712-097bc9f0
};

export const SITE_URL = getBaseUrl();

export const siteConfig = {
  name: "FontFusion | alfo.online",
  description: "Find font pairs that look premium, readable, and ready to ship.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og-image.jpg`,
  creator: "alfo.online",
};
