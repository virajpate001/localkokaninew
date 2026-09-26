// src/utils/seo.js
import { SITE_NAME } from "@/lib/siteConfig";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.localkokani.com";

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
}) {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
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
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
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