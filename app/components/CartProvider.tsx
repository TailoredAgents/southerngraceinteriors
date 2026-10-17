"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/app/types/domain";

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "southern-grace-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) queueMicrotask(() => setItems(JSON.parse(stored) as CartItem[]));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems((current) => {
      const match = current.find((entry) => entry.productId === item.productId && entry.variantId === item.variantId);
      const next = match
        ? current.map((entry) => entry === match ? { ...entry, quantity: entry.quantity + item.quantity } : entry)
        : [...current, item];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, variantId: string, quantity: number) => {
    persist(items.map((item) => item.productId === productId && item.variantId === variantId ? { ...item, quantity: Math.max(1, quantity) } : item));
  }, [items, persist]);

  const removeItem = useCallback((productId: string, variantId: string) => {
    persist(items.filter((item) => item.productId !== productId || item.variantId !== variantId));
  }, [items, persist]);

  const clear = useCallback(() => persist([]), [persist]);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const value = useMemo(() => ({ items, count, addItem, updateQuantity, removeItem, clear }), [items, count, addItem, updateQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
