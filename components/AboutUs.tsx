"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "+5",  label: "Años en el mercado" },
  { value: "14",  label: "Productos certificados" },
  { value: "24h", label: "Respuesta garantizada" },
  { value: "MX",  label: "& Latinoamérica" },
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
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 lg:py-32" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {/* Left */}
          <div>
            <p className="font-body text-rose mb-6" style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
              Quiénes Somos
            </p>
            <h2 className="font-heading text-brand italic mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, lineHeight: 1.15 }}>
              Tu aliado en dermocosmética de vanguardia
            </h2>

            <div className="space-y-5 font-body text-mid mb-8" style={{ fontSize: "14px", lineHeight: 1.85 }}>
              <p>
                En <span className="text-brand font-medium">Aesthetik Skin</span> somos distribuidores oficiales y autorizados de{" "}
                <span className="text-rose font-medium">Voltena</span> en México — la marca de dermocosmética coreana líder en contorno corporal, rellenos y rejuvenecimiento facial no invasivo.
              </p>
              <p>
                Acercamos a médicos estéticos, dermatólogos, cirujanos plásticos y profesionales de la cosmiatría los productos más avanzados del mercado, con trazabilidad completa e importados directamente desde Corea del Sur.
              </p>
            </div>

            <ul className="space-y-3.5">
              {pillars.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(190,120,101,0.12)", minWidth: "16px" }}>
                    <span style={{ color: "#BE7865", fontSize: "8px" }}>✓</span>
                  </span>
                  <span className="font-body text-mid" style={{ fontSize: "13px" }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="card p-6 text-center" style={{ borderTop: "2px solid rgba(190,120,101,0.25)" }}>
                  <p className="font-heading text-rose italic" style={{ fontSize: "2.6rem", fontWeight: 400, lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p className="font-body text-mid mt-2" style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote card */}
            <div className="card p-8" style={{ borderTop: "2px solid rgba(187,167,150,0.5)", background: "#FDFAF7" }}>
              <p className="font-body text-muted mb-3" style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Nuestra promesa
              </p>
              <p className="font-heading text-brand italic" style={{ fontSize: "1.2rem", lineHeight: 1.5, fontWeight: 400 }}>
                &ldquo;Cada producto que distribuimos está respaldado por nuestra firma y reputación.&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-6" style={{ background: "#BBA796", display: "block" }} />
                <span className="font-body text-taupe" style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
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
