import type { Collection, DesignInquiry, JournalEntry, PortfolioProject, Product, SiteSettings } from "@/app/types/domain";
import { collections, journal, products, projects, settings } from "@/app/data/site";

export interface CommerceProvider {
  getProducts(): Promise<Product[]>;
  getCollections(): Promise<Collection[]>;
  getProduct(slug: string): Promise<Product | undefined>;
}

export interface ContentProvider {
  getProjects(): Promise<PortfolioProject[]>;
  getJournal(): Promise<JournalEntry[]>;
  getSettings(): Promise<SiteSettings>;
}

export interface InquiryProvider {
  submit(inquiry: DesignInquiry): Promise<{ delivered: boolean; message: string }>;
}

export const demoCommerce: CommerceProvider = {
  async getProducts() { return products; },
  async getCollections() { return collections; },
  async getProduct(slug) { return products.find((product) => product.slug === slug); },
};

export const demoContent: ContentProvider = {
  async getProjects() { return projects; },
  async getJournal() { return journal; },
  async getSettings() { return settings; },
};

export const disabledInquiries: InquiryProvider = {
  async submit() {
    return { delivered: false, message: "Thanks for sharing your project. Online delivery is being prepared; please return when inquiries open." };
  },
};

export function getCommerceProvider(): CommerceProvider {
  if (process.env.COMMERCE_PROVIDER && process.env.COMMERCE_PROVIDER !== "demo") {
    throw new Error("A live commerce provider was selected but has not been configured.");
  }
  return demoCommerce;
}

export function getContentProvider(): ContentProvider {
  if (process.env.CONTENT_PROVIDER && process.env.CONTENT_PROVIDER !== "demo") {
    throw new Error("A live content provider was selected but has not been configured.");
  }
  return demoContent;
}
