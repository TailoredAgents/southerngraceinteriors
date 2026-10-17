"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { products } from "@/app/data/site";
import { useCart } from "./CartProvider";

const nav = [
  ["Shop", "/shop"],
  ["Design Services", "/design-services"],
  ["Inspiration", "/portfolio"],
  ["Journal", "/journal"],
  ["About", "/about"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const overlayHeader = pathname === "/" || pathname === "/shop" || pathname.startsWith("/shop/") || /^\/portfolio\/[^/]+$/.test(pathname);
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      setMenuOpen(false);
      setSearchOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen || searchOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen, searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 4);
    return products.filter((product) => [product.name, product.category, product.collection, ...product.tags].join(" ").toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  return (
    <>
      <header className={`site-header ${overlayHeader ? "" : "site-header-dark"}`}>
        <Link className="wordmark" href="/" aria-label="Southern Grace Interiors home">
          <span>SOUTHERN GRACE</span><small>INTERIORS</small>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link key={href} className={pathname.startsWith(href) ? "active" : ""} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <button className="text-button" onClick={() => setSearchOpen(true)} aria-label="Open product search">Search</button>
          <Link className="cart-link" href="/cart" aria-label={`Cart with ${count} items`}>Cart <span>{count}</span></Link>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu">
            <span /><span /><span className="sr-only">Menu</span>
          </button>
        </div>
      </header>
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {nav.map(([label, href], index) => <Link key={href} href={href}><small>0{index + 1}</small>{label}</Link>)}
          <Link href="/contact"><small>06</small>Begin a Project</Link>
        </nav>
        <div className="mobile-menu-note">Timeless furnishings and thoughtful design for a home that feels entirely yours.</div>
      </div>
      <div className={`search-drawer ${searchOpen ? "open" : ""}`} aria-hidden={!searchOpen}>
        <div className="search-topline">
          <span>Search the collection</span>
          <button onClick={() => setSearchOpen(false)} aria-label="Close search">Close</button>
        </div>
        <label className="search-field">
          <span className="sr-only">Search products</span>
          <input autoFocus={searchOpen} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What are you looking for?" />
          <span aria-hidden="true">→</span>
        </label>
        <div className="search-results">
          <p>{query ? `${results.length} pieces found` : "A few favorites"}</p>
          {results.length ? results.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.id}>
              <span>{product.name}</span><small>{product.category} · ${(product.price / 100).toLocaleString()}</small>
            </Link>
          )) : <div className="search-empty">No pieces found. Try “chair,” “lighting,” or “linen.”</div>}
        </div>
      </div>
      {(menuOpen || searchOpen) && <button className="page-scrim" aria-label="Close overlay" onClick={() => { setMenuOpen(false); setSearchOpen(false); }} />}
    </>
  );
}
