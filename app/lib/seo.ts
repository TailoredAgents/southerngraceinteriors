import type { Metadata } from "next";

export const siteName = "Southern Grace Interiors";
export const siteDescription =
  "Timeless furnishings and thoughtful interior design for a home that feels entirely yours.";
export const siteUrl = (process.env.SITE_URL ?? "https://southern-grace-interiors.onrender.com").replace(/\/$/, "");
export const siteIndexable = process.env.SITE_INDEXABLE === "true";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}

export function createMetadata({
  title,
  description,
  path,
  image = "/og.png",
  imageAlt = `${siteName} — Beautiful spaces. A life well lived.`,
  type = "website",
  publishedTime,
  noIndex = false,
}: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);
  const openGraph: Metadata["openGraph"] = {
    title,
    description,
    url: canonical,
    siteName,
    locale: "en_US",
    type,
    images: [{ url: image, alt: imageAlt }],
    ...(type === "article" && publishedTime ? { publishedTime } : {}),
  };

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: siteIndexable, follow: siteIndexable },
    openGraph,
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
