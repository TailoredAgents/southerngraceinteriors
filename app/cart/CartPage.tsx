"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/app/data/site";
import { useCart } from "@/app/components/CartProvider";

export function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const [notice, setNotice] = useState(false);
  const detailed = items.map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) })).filter((item) => item.product);
  const subtotal = detailed.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);
  return <div className="cart-page section-shell"><div className="page-title-row"><div><p className="eyebrow">Your Selection</p><h1>Shopping Cart</h1></div><Link className="text-link" href="/shop">Continue shopping <span>→</span></Link></div>
    {!detailed.length ? <div className="empty-cart"><p className="eyebrow">A beautiful beginning</p><h2>Your cart is waiting.</h2><p>Discover timeless furnishings and considered details for every room.</p><Link className="button button-dark" href="/shop">Explore the Collection</Link></div> : <div className="cart-layout"><div className="cart-items">{detailed.map((item) => { const variant = item.product?.variants.find((entry) => entry.id === item.variantId); return <article className="cart-item" key={`${item.productId}-${item.variantId}`}><div className="cart-image"><Image src={item.product!.images[0]} alt={item.product!.name} fill sizes="160px" /></div><div className="cart-item-info"><p>{item.product!.category}</p><Link href={`/products/${item.product!.slug}`}>{item.product!.name}</Link><span>{variant?.value}</span><button onClick={() => removeItem(item.productId, item.variantId)}>Remove</button></div><div className="cart-quantity"><button onClick={() => item.quantity === 1 ? removeItem(item.productId, item.variantId) : updateQuantity(item.productId, item.variantId, item.quantity - 1)}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}>+</button></div><b>${((item.product!.price * item.quantity) / 100).toLocaleString()}</b></article>; })}</div><aside className="cart-summary"><p className="eyebrow">Order Summary</p><div><span>Subtotal</span><b>${(subtotal / 100).toLocaleString()}</b></div><p>Delivery and applicable taxes are calculated when ordering opens.</p><button className="button button-dark button-wide" onClick={() => setNotice(true)}>Proceed to Checkout</button>{notice && <div className="checkout-notice" role="status"><b>Online ordering is coming soon.</b><p>Your selections are saved. Checkout will open when the collection is available for purchase.</p></div>}<Link href="/contact">Need help with a piece? Get in touch →</Link></aside></div>}
  </div>;
}
