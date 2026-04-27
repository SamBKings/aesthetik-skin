"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "+5", label: "Años en el mercado" },
  { value: "14", label: "Productos certificados" },
  { value: "24h", label: "Respuesta garantizada" },
  { value: "MX", label: "& Latinoamérica" },
];

const pillars = [
  "Productos 100% originales con trazabilidad completa",
  "Certificaciones internacionales: MFDS · FDA · CE",
  "Cadena de frío certificada en toda la logística",
  "Asesoría técnica continua para tu práctica",
];

export default function AboutUs() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 lg:py-32" style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {/* Left */}
          <div>
            <p className="font-body text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "#00d4e8" }}>
              Quiénes Somos
            </p>
            <h2 className="font-heading text-white italic mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300, lineHeight: 1.15 }}>
              Tu aliado en dermocosmética de vanguardia
            </h2>

            <div className="space-y-5 font-body text-white/45 mb-8" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              <p>
                En <span className="text-white font-medium">Aesthetik Skin</span> somos distribuidores oficiales y autorizados de{" "}
                <span style={{ color: "#c4a96a" }}>Voltena</span> en México — la marca de dermocosmética coreana líder en contorno corporal, rellenos y rejuvenecimiento facial no invasivo.
              </p>
              <p>
                Acercamos a médicos estéticos, dermatólogos, cirujanos plásticos y profesionales de la cosmiatría los productos más avanzados del mercado, con trazabilidad completa e importados directamente desde Corea del Sur.
              </p>
            </div>

            <ul className="space-y-3">
              {pillars.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5" style={{ color: "#00d4e8", fontSize: "10px" }}>◆</span>
                  <span className="font-body text-white/50" style={{ fontSize: "13px" }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="lgs rounded-2xl p-6 text-center">
                  <p className="font-heading text-white italic" style={{ fontSize: "2.8rem", fontWeight: 300, lineHeight: 1, color: "#00d4e8" }}>
                    {s.value}
                  </p>
                  <p className="font-body text-white/35 mt-2" style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote card */}
            <div className="lgs rounded-2xl p-8" style={{ borderTop: "2px solid rgba(196,169,106,0.35)" }}>
              <p className="font-heading text-white/40 italic mb-3" style={{ fontSize: "0.85rem" }}>
                Nuestra promesa
              </p>
              <p className="font-heading text-white italic" style={{ fontSize: "1.3rem", lineHeight: 1.4, fontWeight: 300 }}>
                &ldquo;Cada producto que distribuimos está respaldado por nuestra firma y reputación.&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-6" style={{ background: "#c4a96a" }} />
                <span className="font-body text-xs tracking-[0.18em] uppercase" style={{ color: "#c4a96a" }}>
                  Equipo Aesthetik Skin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
