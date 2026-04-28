"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ThreeBg = dynamic(() => import("./ThreeBg"), { ssr: false });

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
  { label: "País innovador en skincare", display: "#1",    end: 1, prefix: "#", suffix: "" },
  { label: "Pureza de Nabota",           display: "98.7%", end: 98.7, prefix: "", suffix: "%" },
  { label: "Certificaciones por producto", display: "3×",  end: 3, prefix: "", suffix: "×" },
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
        transform: vis ? "none" : "translateY(28px)",
        transition: `opacity 0.7s ease ${i * 130}ms, transform 0.7s var(--ease-spring) ${i * 130}ms`,
        borderTop: `2px solid ${r.color}70`,
      }}
    >
      <span
        className="font-heading italic"
        style={{ fontSize:"2.8rem", fontWeight:400, color:r.color, lineHeight:1, opacity:0.55 }}
      >
        {r.num}
      </span>
      <h3 className="font-heading text-brand italic" style={{ fontSize:"1.2rem", fontWeight:400, lineHeight:1.35 }}>
        {r.title}
      </h3>
      <p className="font-body text-mid" style={{ fontSize:"13px", lineHeight:1.8 }}>
        {r.text}
      </p>
    </div>
  );
}

export default function WhyKorean() {
  const statBandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = statBandRef.current?.querySelectorAll("[data-end]") ?? [];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const end    = parseFloat(el.dataset.end   ?? "0");
        const suffix = el.dataset.suffix  ?? "";
        const prefix = el.dataset.prefix  ?? "";
        const isFloat = !Number.isInteger(end);
        let start = 0;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1400, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const val = end * ease;
          el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.6 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="why" className="relative py-24 lg:py-32 overflow-hidden section-alt">
      {/* 3D floating shapes background */}
      <ThreeBg scene="shapes" className="opacity-60" />

      {/* CSS orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-rose"  style={{ width:"450px", height:"450px", top:"-20%", left:"-10%", animationDuration:"16s" }} />
        <div className="orb orb-cream" style={{ width:"350px", height:"350px", bottom:"-15%", right:"-8%", animationDuration:"13s", animationDelay:"-7s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">

        <div className="text-center mb-14 reveal vis">
          <p className="font-body text-rose mb-4" style={{ fontSize:"10px", letterSpacing:"0.28em", textTransform:"uppercase" }}>
            ¿Por qué elegir productos coreanos?
          </p>
          <h2 className="font-heading text-brand italic" style={{ fontSize:"clamp(2rem, 4vw, 3.2rem)", fontWeight:400, lineHeight:1.1 }}>
            La ciencia que transforma resultados
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {reasons.map((r, i) => <ReasonCard key={i} r={r} i={i} />)}
        </div>

        {/* Animated stats band */}
        <div ref={statBandRef} className="card grid sm:grid-cols-3" style={{ overflow:"hidden" }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="px-10 py-10 text-center"
              style={{ borderRight: i < 2 ? "1px solid rgba(187,167,150,0.2)" : "none" }}
            >
              <p
                className="font-heading text-rose italic"
                data-end={s.end}
                data-suffix={s.suffix}
                data-prefix={s.prefix}
                style={{ fontSize:"2.8rem", fontWeight:400, lineHeight:1 }}
              >
                {s.display}
              </p>
              <p className="font-body text-mid mt-3" style={{ fontSize:"10px", letterSpacing:"0.16em", textTransform:"uppercase" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
