"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    text: "Desde que incorporé Voltena No.1 a mis protocolos de lipólisis, los resultados de mis pacientes han mejorado notablemente. La consistencia del producto y el soporte de Aesthetik Skin son impecables.",
    author: "Dra. María Fernández",
    role: "Médico Estético · Clínica Aesthetics Premium, CDMX",
    initials: "MF",
    product: "Voltena No.1",
    color: "#c4822a",
  },
  {
    text: "Nabota ha superado todas mis expectativas. La pureza del 98.7% se refleja en la precisión clínica — menos unidades necesarias, efectos más predecibles. Llevo 8 meses usándola exclusivamente.",
    author: "Dr. Alejandro Ríos",
    role: "Dermatólogo Certificado · Guadalajara",
    initials: "AR",
    product: "Nabota",
    color: "#5a9e78",
  },
  {
    text: "Voltena No.2 transformó mi protocolo de aumento de glúteos. La densidad del ácido hialurónico es perfecta para la zona, y los resultados duran significativamente más que otros productos.",
    author: "Dra. Carolina Vega",
    role: "Cirujana Plástica · Monterrey",
    initials: "CV",
    product: "Voltena No.2",
    color: "#7c6bbd",
  },
  {
    text: "La logística y atención son de primer nivel. Pedido, pago, entrega — todo en menos de 48 horas. Pero lo que más valoro es la asesoría técnica: siempre disponibles con conocimiento real.",
    author: "Lic. Patricia Moreno",
    role: "Cosmetóloga Certificada · Puebla",
    initials: "PM",
    product: "Voltena No.3",
    color: "#4a90b8",
  },
];

function TestCard({ t, i }: { t: typeof testimonials[0]; i: number }) {
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
      className="lgs rounded-2xl p-7 flex flex-col"
      style={{
        borderTop: `2px solid ${t.color}35`,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(28px)",
        transition: `opacity 0.7s ease ${i * 100}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
      }}
    >
      <div className="mb-5">
        <span
          className="font-body px-2.5 py-1 rounded-full border"
          style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: t.color, borderColor: `${t.color}40` }}
        >
          {t.product}
        </span>
      </div>

      <p className="font-heading text-white/80 italic flex-1 mb-6" style={{ fontSize: "1rem", lineHeight: 1.65, fontWeight: 400 }}>
        &ldquo;{t.text}&rdquo;
      </p>

      <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.06)" }} />

      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border"
          style={{ background: `${t.color}15`, borderColor: `${t.color}35` }}
        >
          <span className="font-heading italic text-white/70" style={{ fontSize: "12px" }}>{t.initials}</span>
        </div>
        <div>
          <p className="font-body text-white/70 font-medium" style={{ fontSize: "12px" }}>{t.author}</p>
          <p className="font-body text-white/30" style={{ fontSize: "10px", letterSpacing: "0.06em" }}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <div className="text-center mb-14 reveal vis">
          <p className="font-body text-xs tracking-[0.22em] uppercase mb-4" style={{ color: "#4ecdc4" }}>
            Testimonios
          </p>
          <h2 className="font-heading text-white italic" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.1 }}>
            Lo que dicen los profesionales
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => <TestCard key={i} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}
