"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ThreeBg = dynamic(() => import("./ThreeBg"), { ssr: false });

const reasons = [
  {
    num: "01",
    title: "Innovación Científica de Clase Mundial",
    text: "Corea del Sur lidera el mundo en investigación dermocosmética, invirtiendo más del 4% del PIB en I+D. Sus laboratorios producen avances que el resto del mundo adopta décadas después.",
    color: "#00d4e8",
  },
  {
    num: "02",
    title: "Regulación MFDS — El Estándar Más Exigente de Asia",
    text: "El Ministry of Food and Drug Safety opera con protocolos equivalentes o superiores a la FDA. Cada producto aprobado ha superado pruebas clínicas de múltiples fases.",
    color: "#4ecdc4",
  },
  {
    num: "03",
    title: "Ingredientes de Máxima Pureza Biotecnológica",
    text: "Las materias primas se obtienen mediante procesos de fermentación y biotecnología avanzada, garantizando activos de la más alta pureza y biocompatibilidad.",
    color: "#c4a96a",
  },
];

const stats = [
  { value: "#1", label: "País innovador en skincare" },
  { value: "98.7%", label: "Pureza de Nabota" },
  { value: "3×", label: "Certificaciones por producto" },
];

function ReasonCard({ r, i }: { r: typeof reasons[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="lgs rounded-2xl p-8 flex flex-col gap-4"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(28px)",
        transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
        borderTop: `2px solid ${r.color}40`,
      }}
    >
      <span className="font-heading italic" style={{ fontSize: "3rem", fontWeight: 300, color: r.color, lineHeight: 1 }}>
        {r.num}
      </span>
      <h3 className="font-heading text-white italic" style={{ fontSize: "1.3rem", fontWeight: 300, lineHeight: 1.3 }}>
        {r.title}
      </h3>
      <p className="font-body text-white/45" style={{ fontSize: "13px", lineHeight: 1.8 }}>
        {r.text}
      </p>
    </div>
  );
}

export default function WhyKorean() {
  return (
    <section id="why" className="relative py-24 lg:py-32 overflow-hidden">
      <ThreeBg scene="crystals" className="opacity-25" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.8) 50%, #000 100%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-14 reveal vis">
          <p className="font-body text-xs tracking-[0.22em] uppercase mb-4" style={{ color: "#4ecdc4" }}>
            ¿Por qué elegir productos coreanos?
          </p>
          <h2 className="font-heading text-white italic" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.1 }}>
            La ciencia que transforma resultados
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {reasons.map((r, i) => <ReasonCard key={i} r={r} i={i} />)}
        </div>

        {/* Stats band */}
        <div className="lgs rounded-2xl grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
          {stats.map((s, i) => (
            <div key={i} className="px-10 py-10 text-center">
              <p className="font-heading text-white italic" style={{ fontSize: "3rem", fontWeight: 300, lineHeight: 1, color: "#00d4e8" }}>
                {s.value}
              </p>
              <p className="font-body text-white/35 mt-3" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
