"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { waLink, volumeTiers, type Product } from "@/lib/products";

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

      {/* Volume discount table */}
      <div style={{ marginBottom: "24px", padding: "16px", borderRadius: "12px", background: "rgba(190,120,101,0.05)", border: "1px solid rgba(190,120,101,0.15)" }}>
        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#BE7865", marginBottom: "10px" }}>
          Descuentos por volumen
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {volumeTiers.filter(t => t.discount > 0).map(t => (
            <div key={t.min} style={{ flex: 1, minWidth: "80px", padding: "8px 10px", background: "#fff", borderRadius: "8px", border: "1px solid rgba(187,167,150,0.3)", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "11px", fontWeight: 600, color: "#BE7865" }}>
                {t.discount * 100}% off
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", color: "#9E9087", marginTop: "2px" }}>
                {t.max === Infinity ? `${t.min}+` : `${t.min}–${t.max}`} pzas
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", color: "#4A3F38", marginTop: "4px", fontWeight: 500 }}>
                {fmt(Math.round(product.price * (1 - t.discount)))} c/u
              </p>
            </div>
          ))}
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
            transition: "background 0.25s, transform 0.2s",
            transform: added ? "scale(0.98)" : "scale(1)",
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
            textDecoration: "none", transition: "background 0.25s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(190,120,101,0.07)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
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
