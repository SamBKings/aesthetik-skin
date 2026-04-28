"use client";
import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    num: "01",
    title: "Innovación Científica de Clase Mundial",
    text: "Corea del Sur lidera el mundo en investigación dermocosmética, invirtiendo más del 4% del PIB en I+D. Sus laboratorios producen avances que el resto del mundo adopta décadas después.",
    color: "#BE7865",
  },
  {
    num: "02",
    title: "Regulación MFDS — El Estándar Más Exigente de Asia",
    text: "El Ministry of Food and Drug Safety opera con protocolos equivalentes o superiores a la FDA. Cada producto aprobado ha superado pruebas clínicas de múltiples fases.",
    color: "#BBA796",
  },
  {
    num: "03",
    title: "Ingredientes de Máxima Pureza Biotecnológica",
    text: "Las materias primas se obtienen mediante procesos de fermentación y biotecnología avanzada, garantizando activos de la más alta pureza y biocompatibilidad.",
    color: "#4A3F38",
  },
];

const stats = [
  { value: "#1",    label: "País innovador en skincare" },
  { value: "98.7%", label: "Pureza de Nabota" },
  { value: "3×",    label: "Certificaciones por producto" },
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
      className="card p-8 flex flex-col gap-4"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(24px)",
        transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
        borderTop: `2px solid ${r.color}70`,
      }}
    >
      <span className="font-heading italic" style={{ fontSize: "2.8rem", fontWeight: 400, color: r.color, lineHeight: 1, opacity: 0.6 }}>
        {r.num}
      </span>
      <h3 className="font-heading text-brand italic" style={{ fontSize: "1.2rem", fontWeight: 400, lineHeight: 1.35 }}>
        {r.title}
      </h3>
      <p className="font-body text-mid" style={{ fontSize: "13px", lineHeight: 1.8 }}>
        {r.text}
      </p>
    </div>
  );
}

export default function WhyKorean() {
  return (
    <section id="why" className="py-24 lg:py-32 section-alt">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-14 reveal vis">
          <p className="font-body text-rose mb-4" style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
            ¿Por qué elegir productos coreanos?
          </p>
          <h2 className="font-heading text-brand italic" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400, lineHeight: 1.1 }}>
            La ciencia que transforma resultados
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {reasons.map((r, i) => <ReasonCard key={i} r={r} i={i} />)}
        </div>

        {/* Stats band */}
        <div className="card grid sm:grid-cols-3" style={{ overflow: "hidden" }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="px-10 py-10 text-center"
              style={{ borderRight: i < 2 ? "1px solid rgba(187,167,150,0.2)" : "none" }}
            >
              <p className="font-heading text-rose italic" style={{ fontSize: "2.8rem", fontWeight: 400, lineHeight: 1 }}>
                {s.value}
              </p>
              <p className="font-body text-mid mt-3" style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
