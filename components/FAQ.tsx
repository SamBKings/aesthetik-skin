"use client";
import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    q: "¿Los productos son originales y autorizados?",
    a: "Sí. Somos distribuidores oficiales y autorizados de Voltena en México. Cada producto llega con documentación completa de origen, certificados de análisis y trazabilidad total importada directamente desde Corea del Sur.",
  },
  {
    q: "¿Hacen envíos a toda la República Mexicana?",
    a: "Sí, a toda la República. Trabajamos con paqueterías certificadas y garantizamos la cadena de frío para productos que lo requieren, como Nabota. Entrega en 1 a 3 días hábiles según ubicación.",
  },
  {
    q: "¿Atienden solo a profesionales de la salud?",
    a: "Sí. Nuestros productos son de uso exclusivo para médicos estéticos, dermatólogos, cirujanos plásticos, cosmetólogas certificadas y clínicas de estética. Solicitamos cédula profesional o registro de clínica en el primer pedido.",
  },
  {
    q: "¿Cómo realizo un pedido?",
    a: "Es sencillo: (1) Contáctanos por WhatsApp o el formulario de esta página. (2) Un asesor te envía la cotización. (3) Confirmas y realizas el pago. (4) Enviamos en 24–48 horas hábiles con número de rastreo.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Aceptamos transferencia bancaria (SPEI), depósito y tarjeta de crédito/débito vía terminal virtual. Para clientes frecuentes podemos establecer esquemas de crédito. Facturación disponible para personas morales.",
  },
  {
    q: "¿Ofrecen capacitación o soporte técnico?",
    a: "Sí — es uno de nuestros diferenciadores principales. Brindamos asesoría técnica sobre protocolos, dosis y combinaciones de tratamiento. También organizamos sesiones de capacitación para equipos de clínicas.",
  },
  {
    q: "¿Tienen precios de mayoreo o para clínicas?",
    a: "Sí. Ofrecemos condiciones especiales para clínicas, cadenas de spa médico y profesionales con pedidos frecuentes o de volumen. Contáctanos directamente para conocer nuestro esquema por volumen.",
  },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="border-b border-white/[0.06]"
      style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: `opacity 0.6s ease ${index * 50}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 50}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-body text-white/70 group-hover:text-white transition-colors" style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.4 }}>
          {faq.q}
        </span>
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300"
          style={{
            borderColor: open ? "rgba(0,212,232,0.5)" : "rgba(255,255,255,0.1)",
            color: open ? "#00d4e8" : "rgba(255,255,255,0.75)",
            background: open ? "rgba(0,212,232,0.08)" : "transparent",
          }}
        >
          <span style={{ fontSize: "16px", lineHeight: 1, transform: open ? "rotate(45deg)" : "none", display: "block", transition: "transform 0.3s" }}>+</span>
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? "200px" : "0", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <p className="font-body text-white/75 pb-6 pr-12" style={{ fontSize: "13px", lineHeight: 1.8 }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

          {/* Left sticky label */}
          <div>
            <div className="lg:sticky lg:top-28">
              <p className="font-body text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "#00d4e8" }}>
                Preguntas Frecuentes
              </p>
              <h2 className="font-heading text-white italic mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 300, lineHeight: 1.15 }}>
                Resolvemos tus dudas
              </h2>
              <p className="font-body text-white/70 mb-8" style={{ fontSize: "13px", lineHeight: 1.8 }}>
                ¿No encuentras lo que buscas? Contáctanos directamente por WhatsApp.
              </p>
              <a
                href={"https://wa.me/529612513578?text=" + encodeURIComponent("Hola, tengo una pregunta sobre sus productos.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs tracking-widest uppercase border border-white/15 text-white/75 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                Preguntar por WhatsApp
              </a>
            </div>
          </div>

          {/* Right accordion */}
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
