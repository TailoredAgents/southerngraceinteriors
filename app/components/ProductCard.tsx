import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/types/domain";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-image-wrap">
        <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw" priority={priority} />
        {product.newArrival && <span className="product-flag">New Arrival</span>}
        <span className="product-view">View piece</span>
      </Link>
      <div className="product-meta">
        <div><small>{product.category}</small><Link href={`/products/${product.slug}`}>{product.name}</Link><p>{product.subtitle}</p></div>
        <span>${(product.price / 100).toLocaleString()}</span>
      </div>
    </article>
  );
}
