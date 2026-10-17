"use client";

import { Fragment, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/types/domain";
import { ProductCard } from "./ProductCard";

export function ShopCatalog({ products, initialCollection }: { products: Product[]; initialCollection?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("featured");
  const categories = ["all", ...Array.from(new Set(products.map((product) => product.category)))];
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery = !q || [product.name, product.subtitle, product.category, ...product.tags].join(" ").toLowerCase().includes(q);
      const matchesCategory = category === "all" || product.category === category;
      const matchesPrice = price === "all" || (price === "under-500" && product.price < 50000) || (price === "500-1500" && product.price >= 50000 && product.price <= 150000) || (price === "over-1500" && product.price > 150000);
      return matchesQuery && matchesCategory && matchesPrice;
    });
    return [...filtered].sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "name" ? a.name.localeCompare(b.name) : Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [products, query, category, price, sort]);

  return (
    <div className="catalog-shell section-shell">
      <div className="catalog-toolbar">
        <label className="catalog-search"><span className="sr-only">Search collection</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search${initialCollection ? ` ${initialCollection}` : " the collection"}`} /><i aria-hidden="true">⌕</i></label>
        <div className="catalog-selects">
          <label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option value={item} key={item}>{item === "all" ? "All categories" : item}</option>)}</select></label>
          <label><span>Price</span><select value={price} onChange={(event) => setPrice(event.target.value)}><option value="all">All prices</option><option value="under-500">Under $500</option><option value="500-1500">$500–$1,500</option><option value="over-1500">Over $1,500</option></select></label>
          <label><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price, low to high</option><option value="price-high">Price, high to low</option><option value="name">Name</option></select></label>
        </div>
      </div>
      <div className="catalog-count"><span>{visible.length} pieces</span><i /></div>
      {visible.length ? <div className="product-grid catalog-grid">{visible.map((product, index) => <Fragment key={product.id}><ProductCard product={product} />{index === 8 && visible.length > 12 && <aside className="catalog-editorial"><div><Image src="/images/reading-room-v2.webp" alt="A quiet reading room layered in warm natural materials" fill sizes="(max-width: 800px) 100vw, 52vw" /></div><article><p className="eyebrow">The Southern Grace Edit</p><h2>Made to be<br /><em>lived with.</em></h2><p>Begin with pieces that carry the room, then layer in texture, light, and objects with a little soul.</p><Link className="text-link light" href="/journal/rooms-that-feel-collected">Our guide to a collected room <span>→</span></Link></article></aside>}</Fragment>)}</div> : <div className="catalog-empty"><h2>Nothing quite matches.</h2><p>Try widening your search or clearing a filter.</p><button className="text-link" onClick={() => { setQuery(""); setCategory("all"); setPrice("all"); }}>Clear filters <span>→</span></button></div>}
    </div>
  );
}
