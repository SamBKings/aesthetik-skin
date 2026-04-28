"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const msg = `Hola, me gustaría suscribirme al newsletter de Aesthetik Skin.\n\nMi correo es: ${email}`;
    window.open("https://wa.me/529612513578?text=" + encodeURIComponent(msg), "_blank");
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section className="py-20 section-alt" style={{ borderTop: "1px solid rgba(187,167,150,0.2)" }}>
      <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">

        <p className="font-body text-rose mb-4" style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
          Newsletter
        </p>
        <h2 className="font-heading text-brand italic mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 400, lineHeight: 1.15 }}>
          Mantente al día
        </h2>
        <p className="font-body text-mid mb-8" style={{ fontSize: "14px", lineHeight: 1.8 }}>
          Recibe novedades de productos, promociones y contenido exclusivo para profesionales de la estética.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@clinica.com"
            required
            className="flex-1 bg-white border border-taupe-light/60 px-5 py-3 rounded-full font-body text-brand placeholder:text-muted focus:outline-none focus:border-rose/50 transition-colors duration-300 text-sm"
            style={{ minHeight: "50px" }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{
              minHeight: "50px",
              whiteSpace: "nowrap",
              background: sent ? "rgba(37,211,102,0.15)" : "var(--rose)",
              border: sent ? "1px solid rgba(37,211,102,0.4)" : "none",
              color: sent ? "#22c55e" : "#fff",
              boxShadow: sent ? "none" : "0 4px 16px rgba(190,120,101,0.30)",
              padding: "12px 24px",
            }}
          >
            {sent ? "¡Listo! ✓" : "Suscribirme"}
          </button>
        </form>

        <p className="font-body text-muted mt-4" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
          Sin spam. Solo contenido relevante para tu práctica.
        </p>
      </div>
    </section>
  );
}
