"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { type Product, getVolumeDiscount, calcDiscountedPrice } from "@/lib/products";

export interface CartItem {
  product: Product;
  qty: number;
  unitPrice: number;   // after volume discount
  lineTotal: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function buildItem(product: Product, qty: number): CartItem {
  const unitPrice = calcDiscountedPrice(product.price, qty);
  return { product, qty, unitPrice, lineTotal: unitPrice * qty };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart  = useCallback(() => setIsOpen(true),  []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        const newQty = existing.qty + 1;
        return prev.map(i =>
          i.product.id === product.id ? buildItem(product, newQty) : i
        );
      }
      return [...prev, buildItem(product, 1)];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== productId));
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId ? buildItem(i.product, qty) : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  // Recalculate all items when quantities change (volume discount is per-item qty)
  const count    = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);

  return (
    <CartContext.Provider value={{ items, count, subtotal, isOpen, openCart, closeCart, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
