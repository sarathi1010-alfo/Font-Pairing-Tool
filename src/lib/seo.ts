import { Metadata } from "next";
import { siteConfig } from "./config";

/**
 * Centralized Metadata constructor for Next.js App Router.
 * Ensures consistent canonical URLs, OpenGraph tags, and Twitter cards across all pages.
 */
interface ConstructMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  path?: string;
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  path = "",
}: ConstructMetadataProps = {}): Metadata {

  // Calculate canonical URL securely
  const canonicalUrl = path ? `${siteConfig.url}${path}` : siteConfig.url;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@alfo_online",
    },
    icons,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
