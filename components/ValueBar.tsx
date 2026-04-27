const values = [
  { flag: "🇰🇷", title: "Origen Corea del Sur",       desc: "Importación directa certificada" },
  { flag: "✦",   title: "Distribuidor Autorizado",    desc: "Voltena & Daewoong certificados" },
  { flag: "→",   title: "Envíos Nacionales",          desc: "Toda la República Mexicana" },
  { flag: "◎",   title: "Asesoría Profesional",       desc: "Soporte técnico personalizado" },
];

export default function ValueBar() {
  return (
    <section
      id="value-bar"
      style={{ background: "var(--parchment)", borderTop: "1px solid var(--sand)", borderBottom: "1px solid var(--sand)" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-sand">
          {values.map((v, i) => (
            <div key={i} className="px-6 lg:px-10 py-8 first:pl-0 last:pr-0">
              <span
                className="font-sans text-gold block mb-3"
                style={{ fontSize: "18px" }}
              >
                {v.flag}
              </span>
              <p
                className="font-sans text-carbon font-medium mb-1"
                style={{ fontSize: "12px", letterSpacing: "0.06em" }}
              >
                {v.title}
              </p>
              <p
                className="font-sans text-warm-gray"
                style={{ fontSize: "11px", letterSpacing: "0.03em" }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
