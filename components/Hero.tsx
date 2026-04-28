"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import BlurText from "./BlurText";

const ThreeBg = dynamic(() => import("./ThreeBg"), { ssr: false });

const WA = "https://wa.me/529612513578?text=" + encodeURIComponent("Hola, me interesa cotizar productos Voltena.");

const stats = [
  { value: "14",    label: "Productos" },
  { value: "98.7%", label: "Pureza Nabota" },
  { value: "3×",    label: "Certificaciones" },
  { value: "24h",   label: "Respuesta" },
];

const badges = ["MFDS", "FDA", "CE", "🇰🇷 Made in Korea", "Dist. Autorizado Voltena"];

export default function Hero() {
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [subRef.current, ctaRef.current, statsRef.current, badgesRef.current];
    items.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      setTimeout(() => {
        el.style.transition = "opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "none";
      }, 700 + i * 150);
    });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <ThreeBg scene="molecular" className="opacity-60" />

      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,232,0.04) 0%, transparent 70%), linear-gradient(to bottom, transparent 60%, #000 100%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-28 pb-20 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 fu go">
          <span className="h-px w-8" style={{ background: "#00d4e8" }} />
          <span className="font-body text-xs tracking-[0.22em] uppercase" style={{ color: "#00d4e8" }}>
            Dermocosmética Coreana Premium
          </span>
          <span className="h-px w-8" style={{ background: "#00d4e8" }} />
        </div>

        {/* Headline */}
        <h1
          className="font-heading text-white italic mb-6"
          style={{ fontSize: "clamp(2.2rem, 6vw, 6rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          <BlurText text="Dermocosmética Coreana de Élite en México" delay={80} />
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="font-body text-white/50 mb-10 max-w-xl"
          style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)", lineHeight: 1.75 }}
        >
          Distribuidores oficiales de{" "}
          <span style={{ color: "#c4a96a" }}>Voltena</span> para médicos estéticos,
          dermatólogos y clínicas de alta exigencia en México y Latinoamérica.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-12 w-full sm:w-auto">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="lg inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase font-medium transition-all duration-300"
            style={{ color: "#00d4e8", border: "1px solid rgba(0,212,232,0.4)", minHeight: "52px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,232,0.15)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.015)"; }}
          >
            Cotizar por WhatsApp
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase font-medium text-white/60 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20"
            style={{ minHeight: "52px" }}
          >
            Ver Catálogo
          </a>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-px mb-10 rounded-full overflow-hidden lgs w-full max-w-2xl">
          {stats.map((s, i) => (
            <div key={i} className="flex-1 px-4 py-4 text-center min-w-[70px]">
              <p className="font-heading text-white italic" style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 300, lineHeight: 1 }}>
                {s.value}
              </p>
              <p className="font-body text-white/50 mt-1" style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div ref={badgesRef} className="flex flex-wrap justify-center gap-2">
          {badges.map((b, i) => (
            <span
              key={i}
              className="font-body px-3 py-1.5 rounded-full text-white/55 border border-white/[0.15]"
              style={{ fontSize: "10px", letterSpacing: "0.14em" }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
        <span className="font-body" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>EXPLORAR</span>
        <span className="block w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
      </div>
    </section>
  );
}
