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

/**
 * Automated Metadata Generation Pipeline for programmatic tools.
 * Helps rapidly create optimized metadata for dynamically generated clusters.
 */
interface ToolData {
  tool_name: string;
  cluster: string;
  primary_action?: string;
  input_type?: string;
  output_type?: string;
  key_benefit?: string;
}

export function generateToolMetadata(toolData: ToolData, path: string): Metadata {
  const { tool_name, primary_action, key_benefit = "Free Online Tool" } = toolData;

  const titleTemplates = [
    `${tool_name} - ${key_benefit} | FontPair`,
    `${tool_name} | Free Typography ${toolData.cluster} | FontPair`,
    `${primary_action ? primary_action + ' with ' : ''}${tool_name} | FontPair`
  ];

  // Select the shortest title that makes sense, or the primary one
  const title = titleTemplates[0];

  const description = `Use our free online ${tool_name.toLowerCase()} to ${primary_action ? primary_action : 'improve your typography and design workflow'}. No signup required.`;

  return constructMetadata({
    title,
    description,
    path,
  });
}
