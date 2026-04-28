import { products } from "@/lib/products";

const navSections = [
  {
    title: "Catálogo",
    links: products.map((p) => ({ label: p.name, href: "#products" })),
  },
  {
    title: "Empresa",
    links: [
      { label: "Quiénes Somos", href: "#about" },
      { label: "Certificaciones", href: "#certifications" },
      { label: "¿Por qué Corea?", href: "#why" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Preguntas Frecuentes", href: "#faq" },
      { label: "Contacto", href: "#contact" },
      { label: "WhatsApp", href: "https://wa.me/529612513578" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1A1A1A", color: "#fff" }} className="pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Brand */}
          <div>
            {/* Mini logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <svg width="20" height="24" viewBox="0 0 72 84" fill="none" aria-hidden="true">
                <path d="M35 7 C17 14 10 36 15 62 C22 50 31 27 35 7Z" fill="#BBA796" opacity="0.9"/>
                <path d="M37 7 C55 14 62 36 56 62 C50 50 42 27 37 7Z" fill="#D9CEC3" opacity="0.75"/>
                <path d="M35 7 C33 22 33 44 36 62 C39 44 40 22 37 7Z" fill="#EDE5DC" opacity="0.5"/>
                <path d="M36 5 C40 16 32 32 36 48 C38 57 42 64 40 72" stroke="#BBA796" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                <circle cx="40" cy="72" r="2.2" fill="#BBA796"/>
              </svg>
              <div>
                <div style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "12px", letterSpacing: "0.22em", fontWeight: 400, color: "#D9CEC3", textTransform: "uppercase", lineHeight: 1 }}>
                  Aesthetik
                </div>
                <div style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.32em", fontWeight: 300, color: "#9E9087", textTransform: "uppercase", lineHeight: 1.3 }}>
                  Skin
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "12px", lineHeight: 1.8, maxWidth: "240px", color: "rgba(255,255,255,0.55)" }} className="mb-6">
              Distribuidores autorizados de Voltena y Nabota en México. Productos coreanos de élite para profesionales de la estética.
            </p>
            <a
              href="https://wa.me/529612513578?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#25D366]/25 text-[#25D366] hover:border-[#25D366]/50 transition-colors"
              style={{ fontSize: "10px", letterSpacing: "0.12em", fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
            >
              +52 961 251 3578
            </a>
          </div>

          {navSections.map((s) => (
            <div key={s.title}>
              <h4
                style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "20px" }}
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
                      style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.60)" }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)" }}>
            © 2026 Aesthetik Skin · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-6">
            <span style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)" }}>
              Uso exclusivo profesional
            </span>
            <div className="flex items-center gap-3">
              {["MFDS", "FDA", "CE", "🇰🇷"].map((b) => (
                <span key={b} style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
