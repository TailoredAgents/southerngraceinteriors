import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productBySlug, products } from "@/app/data/site";
import { AddToCart } from "@/app/components/AddToCart";
import { JsonLd } from "@/app/components/JsonLd";
import { ProductCard } from "@/app/components/ProductCard";
import { absoluteUrl, breadcrumbSchema, createMetadata, siteName } from "@/app/lib/seo";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return createMetadata({ title: "Product", description: "Explore the Southern Grace Interiors collection.", path: `/products/${slug}`, noIndex: true });
  return createMetadata({ title: product.name, description: product.description, path: `/products/${product.slug}`, image: product.images[0], imageAlt: product.name });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  const related = product.related.map((id) => products.find((item) => item.id === id)).filter((item) => item !== undefined);
  return <>
    <JsonLd data={[
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.images.map(absoluteUrl),
        sku: product.id,
        category: product.category,
        material: product.materials,
        brand: { "@type": "Brand", name: siteName },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: product.collection.replace("-", " "), path: `/shop/${product.collection}` },
        { name: product.name, path: `/products/${product.slug}` },
      ]),
    ]} />
    <div className="product-page section-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/shop">Shop</Link><span>/</span><Link href={`/shop/${product.collection}`}>{product.collection.replace("-", " ")}</Link><span>/</span><span>{product.name}</span></nav>
      <div className="product-layout">
        <div className="product-gallery">{product.images.map((image, index) => <div key={image} className={index === 0 ? "gallery-main" : "gallery-secondary"}><Image src={image} alt={`${product.name}${index ? `, view ${index + 1}` : ""}`} fill priority={index === 0} sizes="(max-width: 850px) 100vw, 58vw" /></div>)}</div>
        <article className="product-info"><p className="eyebrow">{product.category}</p>{product.newArrival && <p className="new-kicker">New Arrival</p>}<h1>{product.name}</h1><p className="product-subtitle">{product.subtitle}</p><p className="product-price">${(product.price / 100).toLocaleString()}</p><p className="product-description">{product.description}</p><AddToCart product={product} /><details open><summary>Details & Materials <span>+</span></summary><p>{product.materials}</p></details><details><summary>Dimensions <span>+</span></summary><p>{product.dimensions}</p></details><details><summary>Delivery <span>+</span></summary><p>Delivery details and timing are confirmed based on destination and item size. Furniture is prepared for careful in-home placement where available.</p></details></article>
      </div>
    </div>
    <section className="related-section"><div className="section-shell"><div className="section-heading centered"><div><p className="eyebrow">Consider With</p><h2>A room, <em>beautifully layered.</em></h2></div></div><div className="product-grid related-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></div></section>
  </>;
}
