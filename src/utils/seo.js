// src/utils/seo.js
import { SITE_NAME } from "@/lib/siteConfig";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.localkokani.com";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

/**
 * Builds a complete, consistent metadata object for any page.
 * Always includes og:site_name, og:locale, og:type, og:url, and canonical —
 * so no individual page can accidentally drop these by defining its own openGraph object.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
  keywords = [],
}) {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
