"use client";
import { useEffect, useRef, useState } from "react";

const certs = [
  {
    acronym: "MFDS",
    full: "Ministry of Food & Drug Safety",
    country: "República de Corea",
    flag: "🇰🇷",
    color: "#00d4e8",
    description: "El organismo regulador de Corea del Sur — reconocido como el más riguroso de Asia. Equivalente en exigencia a la FDA estadounidense.",
  },
  {
    acronym: "FDA",
    full: "Food & Drug Administration",
    country: "Estados Unidos",
    flag: "🇺🇸",
    color: "#4ecdc4",
    description: "Aprobación de la agencia reguladora más reconocida del mundo, que garantiza estándares de seguridad y eficacia para uso clínico internacional.",
  },
  {
    acronym: "CE",
    full: "Conformité Européenne",
    country: "Unión Europea",
    flag: "🇪🇺",
    color: "#c4a96a",
    description: "Marcado CE que certifica el cumplimiento de directivas europeas de seguridad y calidad para dispositivos médicos y cosméticos.",
  },
  {
    acronym: "Auth.",
    full: "Distribuidor Autorizado Voltena",
    country: "México · Latinoamérica",
    flag: "🇲🇽",
    color: "#78b896",
    description: "Certificación directa de Voltena como distribuidor exclusivo autorizado para México y Latinoamérica, con acceso a productos originales y soporte.",
  },
];

function CertCard({ c, i }: { c: typeof certs[0]; i: number }) {
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
        borderTop: `2px solid ${c.color}40`,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(28px)",
        transition: `opacity 0.7s ease ${i * 100}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
      }}
    >
      <div className="flex items-start justify-between">
        <span className="font-heading italic" style={{ fontSize: "2.2rem", fontWeight: 300, color: c.color, lineHeight: 1 }}>
          {c.acronym}
        </span>
        <span style={{ fontSize: "22px" }}>{c.flag}</span>
      </div>
      <div>
        <p className="font-body text-white/70 font-medium mb-0.5" style={{ fontSize: "12px", letterSpacing: "0.06em" }}>
          {c.full}
        </p>
        <p className="font-body text-white/65" style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {c.country}
        </p>
      </div>
      <p className="font-body text-white/75" style={{ fontSize: "13px", lineHeight: 1.7 }}>
        {c.description}
      </p>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <div className="text-center mb-14 reveal vis">
          <p className="font-body text-xs tracking-[0.22em] uppercase mb-4" style={{ color: "#c4a96a" }}>
            Garantías & Certificaciones
          </p>
          <h2 className="font-heading text-white italic mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.1 }}>
            Respaldados por los estándares más altos
          </h2>
          <p className="font-body text-white/70 max-w-lg mx-auto" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            Cada producto que distribuimos cuenta con las certificaciones internacionales más exigentes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certs.map((c, i) => <CertCard key={c.acronym} c={c} i={i} />)}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/[0.06] pt-10">
          {["Uso exclusivo profesional", "Trazabilidad completa", "Cadena de frío certificada", "Facturación disponible"].map((t, i) => (
            <span key={i} className="font-body text-white/60" style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
