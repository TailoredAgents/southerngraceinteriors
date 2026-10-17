import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { collectionBySlug, collections, products } from "@/app/data/site";
import { ShopCatalog } from "@/app/components/ShopCatalog";

export function generateStaticParams() { return collections.map((collection) => ({ collection: collection.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> { const { collection } = await params; const found = collectionBySlug(collection); return { title: found?.name ?? "Collection", description: found?.description }; }

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const found = collectionBySlug(collection);
  if (!found) notFound();
  const items = products.filter((product) => product.collection === found.slug);
  return <>
    <section className="collection-hero" style={{ backgroundColor: found.accent }}><div><p className="eyebrow">The Collection</p><h1>{found.name}</h1><p>{found.description}</p></div><div className="collection-hero-image"><Image src={found.image} alt={`${found.name} collection`} fill priority sizes="(max-width: 800px) 100vw, 58vw" /></div></section>
    <ShopCatalog products={items} initialCollection={found.name} />
  </>;
}
