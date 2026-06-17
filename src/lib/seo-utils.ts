import { SITE_URL } from "./config";

/**
 * Normalizes a route path to lowercase, kebab-case, no trailing slash.
 */
export function normalizeRoute(path: string): string {
  if (!path) return "";
  let normalized = path.toLowerCase().trim();

  // Remove trailing slashes (unless it's just "/")
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  // Remove multiple consecutive slashes
  normalized = normalized.replace(/\/+/g, "/");

  // Ensure it starts with a slash if it's a relative path and not empty
  if (normalized && !normalized.startsWith("/") && !normalized.startsWith("http")) {
    normalized = "/" + normalized;
  }

  return normalized;
}

/**
 * Generates a clean canonical URL for a given path.
 */
export function generateCanonicalUrl(path: string): string {
  const normalizedPath = normalizeRoute(path);
  // If it's the root path, just return the site URL
  if (normalizedPath === "/" || normalizedPath === "") {
    return SITE_URL;
  }
  return `${SITE_URL}${normalizedPath}`;
}

/**
 * Validates and normalizes an internal link.
 */
export function validateInternalLink(href: string): string {
  if (href.startsWith("http")) {
    // Check if it's actually an internal link using absolute URL
    if (href.startsWith(SITE_URL)) {
      const path = href.replace(SITE_URL, "");
      return normalizeRoute(path) || "/";
    }
    return href; // Return as-is if external
  }
  return normalizeRoute(href) || "/";
}

/**
 * Sanitizes a string into a clean URL slug.
 */
export function sanitizeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}
