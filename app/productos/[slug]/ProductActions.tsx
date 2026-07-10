"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { waLink, type Product } from "@/lib/products";

function fmt(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

export default function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      {/* Price */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9E9087", marginBottom: "6px" }}>
          Precio por pieza
        </p>
        <p style={{ fontFamily: "var(--font-playfair)", fontSize: "2.2rem", fontStyle: "italic", color: "#BE7865", fontWeight: 400, lineHeight: 1 }}>
          {fmt(product.price)}
          <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "11px", fontStyle: "normal", color: "#9E9087", marginLeft: "6px" }}>MXN</span>
        </p>
      </div>

      {/* Wholesale note */}
      <div style={{ marginBottom: "24px", padding: "14px 18px", borderRadius: "12px", background: "rgba(190,120,101,0.06)", border: "1px solid rgba(190,120,101,0.2)", display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <span style={{ fontSize: "18px", flexShrink: 0 }}>📦</span>
        <div>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "11px", fontWeight: 500, color: "#4A3F38", marginBottom: "4px" }}>
            ¿Compras al mayoreo?
          </p>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "11px", color: "#7A6B60", lineHeight: 1.6 }}>
            Contamos con precios especiales por volumen. Escríbenos por WhatsApp y te damos una cotización personalizada.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <button
          onClick={handleAdd}
          style={{
            width: "100%", padding: "16px", borderRadius: "9999px", border: "none", cursor: "pointer",
            background: added ? "#A8614E" : "#BE7865", color: "#fff",
            fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.18em",
            textTransform: "uppercase", fontWeight: 500,
            transition: "background 0.25s",
            boxShadow: "0 4px 20px rgba(190,120,101,0.3)",
          }}
        >
          {added ? "✓ Agregado al carrito" : "Agregar al carrito"}
        </button>

        <a
          href={waLink(product.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block", width: "100%", padding: "15px", borderRadius: "9999px",
            border: "1px solid rgba(190,120,101,0.5)", textAlign: "center",
            color: "#BE7865", fontFamily: "var(--font-montserrat)", fontSize: "11px",
            letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Cotizar por WhatsApp
        </a>
      </div>

      <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", color: "#9E9087", textAlign: "center", marginTop: "14px" }}>
        Solo para profesionales · Importado directamente de Corea del Sur
      </p>
    </div>
  );
}
