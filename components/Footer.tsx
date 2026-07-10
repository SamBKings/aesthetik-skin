"use client";
import { useState } from "react";
import { products } from "@/lib/products";
import Image from "next/image";

const navSections = [
  {
    title: "Catálogo",
    links: products.map((p) => ({ label: p.name, href: "#products" })),
  },
  {
    title: "Empresa",
    links: [
      { label: "Quiénes Somos",   href: "#about" },
      { label: "Certificaciones", href: "#certifications" },
      { label: "¿Por qué Corea?", href: "#why" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Preguntas Frecuentes", href: "#faq" },
      { label: "Contacto",             href: "#contact" },
      { label: "WhatsApp",             href: "https://wa.me/528134188472" },
    ],
  },
];

function FooterLogo() {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, marginBottom: "20px" }}>
        <span style={{ fontFamily: "var(--font-montserrat), system-ui", fontSize: "14px", letterSpacing: "0.24em", fontWeight: 500, color: "#D9CEC3", textTransform: "uppercase" }}>
          Aesthetik
        </span>
        <span style={{ fontFamily: "var(--font-montserrat), system-ui", fontSize: "9px", letterSpacing: "0.36em", fontWeight: 300, color: "#9E9087", textTransform: "uppercase", marginTop: "2px" }}>
          Skin
        </span>
      </div>
    );
  }

  return (
    <a href="#" className="inline-block mb-5" aria-label="Aesthetik Skin">
      <Image
        src="/assets/logo.png"
        alt="Aesthetik Skin"
        width={130}
        height={48}
        onError={() => setImgError(true)}
        style={{ height: "46px", width: "auto", filter: "brightness(0) invert(1)", opacity: 0.75 }}
      />
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#1A1A1A", color: "#fff" }} className="pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Brand */}
          <div>
            <FooterLogo />

            <p
              style={{
                fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                fontSize: "12px",
                lineHeight: 1.8,
                maxWidth: "240px",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "24px",
              }}
            >
              Distribuidores autorizados de Voltena y Nabota en México. Productos coreanos de élite para profesionales de la estética.
            </p>

            <a
              href="https://wa.me/528134188472?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#25D366]/25 text-[#25D366] hover:border-[#25D366]/50 transition-colors"
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                fontFamily: "var(--font-montserrat), system-ui, sans-serif",
              }}
            >
              +52 961 251 3578
            </a>
          </div>

          {/* Nav sections */}
          {navSections.map((s) => (
            <div key={s.title}>
              <h4
                style={{
                  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "20px",
                }}
              >
                {s.title}
              </h4>
              <ul className="space-y-3">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="hover:text-white transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.60)",
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            style={{
              fontFamily: "var(--font-montserrat), system-ui, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.30)",
            }}
          >
            © 2026 Aesthetik Skin · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-6">
            <span
              style={{
                fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
              }}
            >
              Uso exclusivo profesional
            </span>
            <div className="flex items-center gap-3">
              {["MFDS", "FDA", "CE", "🇰🇷"].map((b) => (
                <span
                  key={b}
                  style={{
                    fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.30)",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
