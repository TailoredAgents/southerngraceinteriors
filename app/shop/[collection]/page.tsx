import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { collectionBySlug, collections, products } from "@/app/data/site";
import { JsonLd } from "@/app/components/JsonLd";
import { ShopCatalog } from "@/app/components/ShopCatalog";
import { breadcrumbSchema, createMetadata } from "@/app/lib/seo";

export function generateStaticParams() { return collections.map((collection) => ({ collection: collection.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const { collection } = await params;
  const found = collectionBySlug(collection);
  if (!found) return createMetadata({ title: "Collection", description: "Explore the Southern Grace Interiors collection.", path: `/shop/${collection}`, noIndex: true });
  return createMetadata({ title: `${found.name} Furniture & Decor`, description: found.description, path: `/shop/${found.slug}`, image: found.image, imageAlt: `${found.name} collection` });
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const found = collectionBySlug(collection);
  if (!found) notFound();
  const items = products.filter((product) => product.collection === found.slug);
  return <>
    <JsonLd data={breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
      { name: found.name, path: `/shop/${found.slug}` },
    ])} />
    <section className="collection-hero" style={{ backgroundColor: found.accent }}><div><p className="eyebrow">The Collection</p><h1>{found.name}</h1><p>{found.description}</p></div><div className="collection-hero-image"><Image src={found.image} alt={`${found.name} collection`} fill priority sizes="(max-width: 800px) 100vw, 58vw" /></div></section>
    <ShopCatalog products={items} initialCollection={found.name} />
  </>;
}
