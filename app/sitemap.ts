import type { MetadataRoute } from "next";
import { collections, journal, products, projects } from "./data/site";
import { absoluteUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1, changeFrequency: "weekly" },
    { url: absoluteUrl("/shop"), priority: 0.9, changeFrequency: "weekly" },
    { url: absoluteUrl("/design-services"), priority: 0.9, changeFrequency: "monthly" },
    { url: absoluteUrl("/portfolio"), priority: 0.8, changeFrequency: "monthly" },
    { url: absoluteUrl("/journal"), priority: 0.8, changeFrequency: "weekly" },
    { url: absoluteUrl("/about"), priority: 0.7, changeFrequency: "monthly" },
    { url: absoluteUrl("/contact"), priority: 0.7, changeFrequency: "yearly" },
    { url: absoluteUrl("/policies/shipping-returns"), priority: 0.3, changeFrequency: "yearly" },
    { url: absoluteUrl("/policies/privacy-terms"), priority: 0.2, changeFrequency: "yearly" },
  ];

  const collectionPages: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: absoluteUrl(`/shop/${collection.slug}`),
    changeFrequency: "weekly",
    priority: 0.8,
    images: [absoluteUrl(collection.image)],
  }));
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    changeFrequency: "weekly",
    priority: 0.7,
    images: product.images.map(absoluteUrl),
  }));
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/portfolio/${project.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [project.image, ...project.gallery].map(absoluteUrl),
  }));
  const journalPages: MetadataRoute.Sitemap = journal.map((entry) => ({
    url: absoluteUrl(`/journal/${entry.slug}`),
    lastModified: new Date(entry.date),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [absoluteUrl(entry.image)],
  }));

  return [...corePages, ...collectionPages, ...productPages, ...projectPages, ...journalPages];
}
