import type { MetadataRoute } from "next";
import { journal, products, projects } from "./data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://southern-grace-interiors.onrender.com";
  return ["", "/shop", "/design-services", "/portfolio", "/about", "/journal", "/contact", ...products.map((p) => `/products/${p.slug}`), ...projects.map((p) => `/portfolio/${p.slug}`), ...journal.map((p) => `/journal/${p.slug}`)].map((url) => ({ url: `${base}${url}`, lastModified: new Date() }));
}
