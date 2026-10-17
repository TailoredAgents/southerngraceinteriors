import Image from "next/image";
import Link from "next/link";
import { collections, products } from "@/app/data/site";
import { ShopCatalog } from "@/app/components/ShopCatalog";
import { createMetadata } from "@/app/lib/seo";

export const metadata = createMetadata({ title: "Shop Timeless Furniture & Decor", description: "Explore a considered collection of furniture, lighting, textiles, art, and finishing touches.", path: "/shop", image: "/images/room-living-v2.webp", imageAlt: "Layered neutral furnishings in a warm living room" });

export default function ShopPage() {
  return <>
    <section className="page-hero shop-hero"><Image src="/images/room-living-v2.webp" alt="Layered neutral furnishings in a warm living room" fill priority sizes="100vw" /><div /><article><p className="eyebrow">The Collection</p><h1>Objects of<br /><em>lasting beauty.</em></h1><p>Furnishings with graceful proportions, natural texture, and an easy sense of permanence.</p></article></section>
    <nav className="collection-nav section-shell" aria-label="Shop by collection">{collections.map((collection) => <Link href={`/shop/${collection.slug}`} key={collection.slug}>{collection.name}<span>View</span></Link>)}</nav>
    <ShopCatalog products={products} />
  </>;
}
