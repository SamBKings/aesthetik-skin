import Link from "next/link";

const WA = "https://wa.me/528134188472?text=" + encodeURIComponent("Hola, tuve un problema al realizar mi pago. ¿Me pueden ayudar?");

export default function ErrorPagoPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F4EDE4", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ maxWidth: "480px", width: "100%", background: "#fff", borderRadius: "24px", padding: "48px 40px", textAlign: "center", boxShadow: "0 8px 40px rgba(74,63,56,0.10)" }}>

        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(190,120,101,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BE7865" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
          </svg>
        </div>

        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#BE7865", marginBottom: "10px" }}>
          Pago no completado
        </p>

        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontStyle: "italic", fontWeight: 400, color: "#1A1A1A", marginBottom: "14px", lineHeight: 1.2 }}>
          Algo salió mal
        </h1>

        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "#7A6B60", lineHeight: 1.8, marginBottom: "32px" }}>
          Tu pago no pudo procesarse. No se realizó ningún cargo. Puedes intentarlo de nuevo o contactarnos por WhatsApp para ayudarte.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px 28px", borderRadius: "9999px", background: "#BE7865", color: "#fff", fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", boxShadow: "0 4px 16px rgba(190,120,101,0.28)" }}
          >
            Pedir ayuda por WhatsApp
          </a>
          <Link
            href="/productos"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9E9087", textDecoration: "none" }}
          >
            ← Volver al catálogo
          </Link>
        </div>

      </div>
    </div>
  );
}
