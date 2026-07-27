"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const WA = "https://wa.me/528134188472?text=" + encodeURIComponent("Hola, acabo de realizar un pago. ¿Me pueden confirmar mi pedido?");

function ExitoContent() {
  const { clearCart } = useCart();
  const params = useSearchParams();
  const pending = params.get("status") === "pending";

  useEffect(() => {
    if (!pending) clearCart();
  }, [pending, clearCart]);

  return (
    <div style={{ minHeight: "100vh", background: "#F4EDE4", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ maxWidth: "480px", width: "100%", background: "#fff", borderRadius: "24px", padding: "48px 40px", textAlign: "center", boxShadow: "0 8px 40px rgba(74,63,56,0.10)" }}>

        <div style={{ width: 64, height: 64, borderRadius: "50%", background: pending ? "rgba(190,120,101,0.1)" : "rgba(90,158,120,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          {pending ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BE7865" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5a9e78" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          )}
        </div>

        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: pending ? "#BE7865" : "#5a9e78", marginBottom: "10px" }}>
          {pending ? "Pago en proceso" : "¡Pago exitoso!"}
        </p>

        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontStyle: "italic", fontWeight: 400, color: "#1A1A1A", marginBottom: "14px", lineHeight: 1.2 }}>
          {pending ? "Estamos verificando tu pago" : "Gracias por tu compra"}
        </h1>

        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "#7A6B60", lineHeight: 1.8, marginBottom: "32px" }}>
          {pending
            ? "Tu pago está siendo procesado. Te contactaremos por WhatsApp en cuanto se confirme para coordinar el envío."
            : "Nuestro equipo coordinará tu envío a la brevedad. Recibirás confirmación y número de rastreo por WhatsApp."}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px 28px", borderRadius: "9999px", background: "#BE7865", color: "#fff", fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", boxShadow: "0 4px 16px rgba(190,120,101,0.28)" }}
          >
            Confirmar por WhatsApp
          </a>
          <Link
            href="/productos"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9E9087", textDecoration: "none" }}
          >
            Seguir comprando →
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function ExitoPage() {
  return (
    <Suspense>
      <ExitoContent />
    </Suspense>
  );
}
