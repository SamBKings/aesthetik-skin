"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { waLink } from "@/lib/products";

function fmt(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

function buildWaMessage(items: ReturnType<typeof useCart>["items"], subtotal: number) {
  const lines = items.map(i => `• ${i.product.name} × ${i.qty} = ${fmt(i.lineTotal)}`);
  lines.push("", `*Total aproximado: ${fmt(subtotal)}*`);
  return "Hola, me interesa cotizar los siguientes productos:\n\n" + lines.join("\n");
}

export default function Cart() {
  const { items, count, subtotal, isOpen, closeCart, removeItem, updateQty, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const waMsg = buildWaMessage(items, subtotal);
  const waHref = waLink(waMsg);

  const handleMPCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mp-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({
            id: i.product.id,
            title: i.product.name,
            quantity: i.qty,
            unitPrice: i.product.price,
            image: i.product.image,
          })),
        }),
      });
      if (!res.ok) throw new Error();
      const { initPoint } = await res.json();
      if (initPoint) window.location.href = initPoint;
    } catch {
      alert("Error al conectar con Mercado Pago. Intenta de nuevo o contáctanos por WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(26,26,26,0.35)", backdropFilter: "blur(3px)",
          opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <aside style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 201,
        width: "min(420px, 100vw)", background: "#FDFAF7",
        boxShadow: "-4px 0 40px rgba(74,63,56,0.14)",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.38s cubic-bezier(0.16,1,0.3,1)",
        display: "flex", flexDirection: "column", overflowY: "auto",
      }}>
        {/* Header */}
        <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid rgba(187,167,150,0.25)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A" }}>Tu carrito</p>
            <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.16em", color: "#9E9087", textTransform: "uppercase", marginTop: "2px" }}>
              {count} {count === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button onClick={closeCart} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(187,167,150,0.4)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#7A6B60" }} aria-label="Cerrar">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Mayoreo note */}
        <div style={{ padding: "10px 24px", background: "rgba(190,120,101,0.07)", borderBottom: "1px solid rgba(190,120,101,0.15)" }}>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", color: "#BE7865", letterSpacing: "0.1em" }}>
            📦 ¿Compras al mayoreo? Escríbenos por WhatsApp y te damos precio especial.
          </p>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: "60px" }}>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontStyle: "italic", color: "#BBA796", marginBottom: "8px" }}>Tu carrito está vacío</p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "12px", color: "#9E9087", marginBottom: "20px" }}>Agrega productos desde el catálogo</p>
              <button onClick={closeCart} style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#BE7865", background: "transparent", border: "1px solid rgba(190,120,101,0.4)", borderRadius: "9999px", padding: "10px 22px", cursor: "pointer" }}>
                Ver catálogo
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {items.map(item => (
                <div key={item.product.id} style={{ display: "flex", gap: "14px", padding: "14px", background: "#fff", borderRadius: "12px", border: "1px solid rgba(187,167,150,0.2)", boxShadow: "0 1px 6px rgba(74,63,56,0.04)" }}>
                  <div style={{ position: "relative", width: 64, height: 64, borderRadius: "8px", overflow: "hidden", background: "#FDFAF7", flexShrink: 0 }}>
                    <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-1" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontStyle: "italic", color: "#1A1A1A", marginBottom: "6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.product.name}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(187,167,150,0.35)", borderRadius: "9999px", overflow: "hidden" }}>
                        <button onClick={() => updateQty(item.product.id, item.qty - 1)} style={{ width: 28, height: 28, background: "transparent", border: "none", cursor: "pointer", color: "#7A6B60", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                        <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "12px", fontWeight: 500, color: "#1A1A1A", minWidth: "24px", textAlign: "center" }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.product.id, item.qty + 1)} style={{ width: 28, height: 28, background: "transparent", border: "none", cursor: "pointer", color: "#7A6B60", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      </div>
                      <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", fontWeight: 500, color: "#1A1A1A", marginLeft: "auto" }}>{fmt(item.lineTotal)}</p>
                      <button onClick={() => removeItem(item.product.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#9E9087", padding: "4px" }} aria-label="Eliminar">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "16px 24px 32px", borderTop: "1px solid rgba(187,167,150,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid rgba(187,167,150,0.2)" }}>
              <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A6B60" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "16px", fontWeight: 600, color: "#1A1A1A" }}>{fmt(subtotal)}</span>
            </div>
            <button
              onClick={handleMPCheckout}
              disabled={loading}
              style={{ width: "100%", padding: "14px", marginBottom: "10px", borderRadius: "9999px", border: "none", cursor: loading ? "not-allowed" : "pointer", background: loading ? "#9E9087" : "#009EE3", color: "#fff", fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "background 0.2s" }}
            >
              {loading ? "Procesando…" : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.38 2C6.24 2 2 6.24 2 11.38s4.24 9.38 9.38 9.38c2.07 0 3.97-.67 5.52-1.8l3.26 3.26 1.42-1.42-3.26-3.26A9.34 9.34 0 0 0 20.76 11.38C20.76 6.24 16.52 2 11.38 2zm0 2c4.07 0 7.38 3.31 7.38 7.38s-3.31 7.38-7.38 7.38S4 15.45 4 11.38 7.31 4 11.38 4z"/></svg>
                  Pagar con Mercado Pago
                </>
              )}
            </button>
            <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", padding: "13px", borderRadius: "9999px", border: "1px solid rgba(190,120,101,0.5)", textAlign: "center", color: "#BE7865", fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none" }}>
              Cotizar por WhatsApp
            </a>
            <button onClick={clearCart} style={{ display: "block", margin: "12px auto 0", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9E9087" }}>
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
