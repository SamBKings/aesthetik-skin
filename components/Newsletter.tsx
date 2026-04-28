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
    <section className="py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">

        <p className="font-body text-xs tracking-[0.22em] uppercase mb-4" style={{ color: "#00d4e8" }}>
          Newsletter
        </p>
        <h2 className="font-heading text-white italic mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 300, lineHeight: 1.15 }}>
          Mantente al día
        </h2>
        <p className="font-body text-white/40 mb-8" style={{ fontSize: "14px", lineHeight: 1.8 }}>
          Recibe novedades de productos, promociones y contenido exclusivo para profesionales de la estética.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@clinica.com"
            required
            className="flex-1 bg-transparent border border-white/10 px-5 py-3 rounded-full font-body text-white placeholder:text-white/25 focus:outline-none focus:border-aq1/50 transition-colors duration-300 text-sm"
            style={{ minHeight: "52px" }}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full font-body text-sm tracking-widest uppercase font-medium transition-all duration-300"
            style={{
              background: sent ? "rgba(37,211,102,0.15)" : "rgba(0,212,232,0.15)",
              border: `1px solid ${sent ? "rgba(37,211,102,0.4)" : "rgba(0,212,232,0.4)"}`,
              color: sent ? "#25D366" : "#00d4e8",
              minHeight: "52px",
              whiteSpace: "nowrap",
            }}
          >
            {sent ? "¡Listo! ✓" : "Suscribirme"}
          </button>
        </form>

        <p className="font-body text-white/20 mt-4" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
          Sin spam. Solo contenido relevante para tu práctica.
        </p>
      </div>
    </section>
  );
}
