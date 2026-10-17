import type { MetadataRoute } from "next";
import { siteIndexable, siteUrl } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteIndexable
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
