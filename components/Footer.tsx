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
    <footer style={{ background: "#050504", borderTop: "1px solid rgba(255,255,255,0.05)" }} className="pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/[0.05]">

          {/* Brand */}
          <div>
            <a href="#" className="font-heading italic text-3xl tracking-widest text-white mb-4 block">as</a>
            <p className="font-body text-white/65 mb-6" style={{ fontSize: "12px", lineHeight: 1.8, maxWidth: "240px" }}>
              Distribuidores autorizados de Voltena y Nabota en México. Productos coreanos de élite para profesionales de la estética.
            </p>
            <a
              href="https://wa.me/529612513578?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#25D366]/20 text-[#25D366] hover:border-[#25D366]/40 transition-colors"
              style={{ fontSize: "10px", letterSpacing: "0.12em" }}
            >
              +52 961 251 3578
            </a>
          </div>

          {navSections.map((s) => (
            <div key={s.title}>
              <h4 className="font-body text-white/65 mb-5" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {s.title}
              </h4>
              <ul className="space-y-3">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-body text-white/70 hover:text-white transition-colors duration-300"
                      style={{ fontSize: "12px" }}
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
          <p className="font-body text-white/55" style={{ fontSize: "10px", letterSpacing: "0.08em" }}>
            © 2026 Aesthetik Skin · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-6">
            <span className="font-body text-white/50" style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Uso exclusivo profesional
            </span>
            <div className="flex items-center gap-3">
              {["MFDS", "FDA", "CE", "🇰🇷"].map((b) => (
                <span key={b} className="font-body text-white/55" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
