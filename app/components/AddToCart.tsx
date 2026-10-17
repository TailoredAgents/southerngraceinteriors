"use client";

import { useState } from "react";
import type { Product } from "@/app/types/domain";
import { useCart } from "./CartProvider";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "default");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function add() {
    addItem({ productId: product.id, variantId, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="buy-box">
      {product.variants.length > 0 && <fieldset className="variant-picker">
        <legend>Finish <span>{product.variants.find((variant) => variant.id === variantId)?.value}</span></legend>
        <div>{product.variants.map((variant) => <button key={variant.id} type="button" className={variant.id === variantId ? "selected" : ""} onClick={() => setVariantId(variant.id)} aria-label={variant.value} title={variant.value}><i style={{ background: variant.color }} /></button>)}</div>
      </fieldset>}
      <div className="quantity-row">
        <label htmlFor="quantity">Quantity</label>
        <div><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button><input id="quantity" readOnly value={quantity} /><button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">+</button></div>
      </div>
      <button className="button button-dark button-wide" type="button" onClick={add}>{added ? "Added to Cart" : "Add to Cart"}</button>
      <p className="fulfillment-note">{product.fulfillment === "PARCEL" ? "Ships by parcel." : product.fulfillment === "QUOTE_REQUIRED" ? "Delivery arranged by quote." : "White-glove delivery will be arranged."} Delivery timing is confirmed after purchase.</p>
    </div>
  );
}
