"use client";
import { CartProvider } from "@/context/CartContext";
import Cart from "@/components/Cart";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Cart />
    </CartProvider>
  );
}
