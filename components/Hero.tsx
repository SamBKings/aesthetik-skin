"use client";
import { useEffect, useRef } from "react";

const WA = "https://wa.me/529612513578?text=" + encodeURIComponent("Hola, me interesa cotizar productos Voltena.");

const stats = [
  { value: "14",   label: "Productos" },
  { value: "98.7%", label: "Pureza Nabota" },
  { value: "3×",   label: "Certificaciones" },
  { value: "24h",  label: "Respuesta" },
];

const trust = ["MFDS", "FDA", "CE", "🇰🇷 Made in Korea", "Dist. Autorizado Voltena"];

export default function Hero() {
  const subRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const badRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [subRef.current, ctaRef.current, statRef.current, badRef.current];
    items.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      setTimeout(() => {
        el.style.transition = "opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "none";
      }, 600 + i * 140);
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F4EDE4 0%, #EDE5DC 60%, #E8DDD4 100%)" }}
    >
      {/* Decorative circle */}
      <div
        className="absolute right-0 top-0 w-[50vw] h-[100vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 80% at 80% 40%, rgba(187,167,150,0.18) 0%, transparent 70%)",
        }}
      />
      {/* Subtle line decoration */}
      <div
        className="absolute left-0 bottom-0 w-full h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(187,167,150,0.4), transparent)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-20">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 fu go">
            <span className="h-px w-8 bg-rose" />
            <span className="font-body text-rose" style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
              Dermocosmética Coreana Premium
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-heading text-brand mb-6"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.01em" }}
          >
            <span style={{ fontStyle: "italic" }}>Productos</span> de calidad.<br />
            <span style={{ fontStyle: "italic" }}>Resultados</span> que inspiran.
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="font-body text-mid mb-10"
            style={{ fontSize: "clamp(0.9rem, 2.2vw, 1rem)", lineHeight: 1.8, maxWidth: "480px" }}
          >
            Distribuidores oficiales de{" "}
            <strong className="text-brand-mid font-medium">Voltena</strong> para médicos estéticos,
            dermatólogos y clínicas de alta exigencia en México y Latinoamérica.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-14">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ minHeight: "52px" }}
            >
              Cotizar por WhatsApp
            </a>
            <a
              href="#products"
              className="btn-ghost"
              style={{ minHeight: "52px" }}
            >
              Ver Catálogo ↓
            </a>
          </div>

          {/* Stats row */}
          <div
            ref={statRef}
            className="flex flex-wrap gap-8 mb-10 pb-10"
            style={{ borderBottom: "1px solid rgba(187,167,150,0.35)" }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-brand" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1 }}>
                  {s.value}
                </p>
                <p className="font-body text-mid mt-1" style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div ref={badRef} className="flex flex-wrap gap-2">
            {trust.map((b) => (
              <span
                key={b}
                className="font-body text-brand-mid"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(187,167,150,0.5)",
                  background: "rgba(255,255,255,0.5)",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
        <span className="block w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(187,167,150,0.6), transparent)" }} />
      </div>
    </section>
  );
}
