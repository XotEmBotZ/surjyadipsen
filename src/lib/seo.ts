const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Ensures a path is an absolute URL using the configured SITE_URL.
 */
export function getAbsoluteUrl(path?: string | null) {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  const baseUrl = SITE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Generates the author array in compliance with Google Article guidelines.
 */
export function getAuthorSchema(name: string) {
  return [
    {
      "@type": "Person",
      name: name,
      url: SITE_URL,
    },
  ];
}

/**
 * Generates the image array in compliance with Google Article guidelines.
 */
export function getImageSchema(image?: string | null) {
  const url = getAbsoluteUrl(image);
  return url ? [url] : undefined;
}

/**
 * Generates the publisher object.
 */
export function getPublisherSchema(siteName: string, favicon?: string | null) {
  return {
    "@type": "Organization",
    name: siteName,
    url: SITE_URL,
    logo: favicon
      ? {
          "@type": "ImageObject",
          url: getAbsoluteUrl(favicon),
        }
      : undefined,
  };
}

/**
 * Generates a BreadcrumbList schema.
 */
export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.item),
    })),
  };
}

/**
 * Generates an ItemList schema for summary pages.
 */
export function getItemListSchema(items: { url: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      url: getAbsoluteUrl(item.url),
    })),
  };
}
