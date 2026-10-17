export type FulfillmentType =
  | "PARCEL"
  | "FREIGHT"
  | "LOCAL_DELIVERY"
  | "QUOTE_REQUIRED";

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  color?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  category: string;
  collection: string;
  tags: string[];
  images: string[];
  dimensions: string;
  materials: string;
  fulfillment: FulfillmentType;
  variants: ProductVariant[];
  featured?: boolean;
  newArrival?: boolean;
  related: string[];
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
  accent: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface DesignService {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  includes: string[];
}

export interface PortfolioProject {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gallery: string[];
  palette: string[];
}

export interface JournalEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
  paragraphs: string[];
}

export interface DesignInquiry {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  timeframe: string;
  budget: string;
  description: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  email?: string;
  commerceProvider: "demo" | "shopify";
  contentProvider: "demo" | "sanity";
  inquiryProvider: "disabled" | "email";
  checkoutProvider: "disabled" | "shopify";
}
