import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, products, waLink } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

/* ── Category descriptions for SEO ─────────────────────────── */
const catMeta: Record<string, { headline: string; description: string; keywords: string }> = {
  toxinas: {
    headline: "Toxinas Botulínicas Coreanas",
    description: "Toxinas botulínicas tipo A importadas directamente de Corea del Sur. Nabota de Daewoong Pharma e Innotox, aprobadas FDA, MFDS y CE. Pureza superior y resultados visibles en 2–3 días para médicos estéticos y dermatólogos en México.",
    keywords: "nabota precio México, innotox comprar, toxina botulínica coreana, botox coreano médicos, daewoong pharma, toxina tipo A purificada",
  },
  voltena: {
    headline: "Voltena — Contorno Corporal",
    description: "Voltena, el tratamiento coreano de referencia para lipolisis y contorno corporal. Distribuidor autorizado en México. Resultados clínicamente probados para reducción de grasa localizada.",
    keywords: "voltena México, voltena precio, lipolisis inyectable, contorno corporal coreano, voltena distribuidor, reducción grasa inyectable",
  },
  rellenos: {
    headline: "Rellenos Dérmicos Coreanos",
    description: "Rellenos dérmicos de ácido hialurónico premium: Dermalax, Juvéderm y más. Importados directamente de Corea del Sur. Alta duración, biocompatibles y certificados internacionalmente para uso en clínicas estéticas.",
    keywords: "rellenos dérmicos coreanos, dermalax precio, ácido hialurónico inyectable, fillers coreanos México, juvederm, relleno labios mentón",
  },
  meso: {
    headline: "Mesoterapia y Skinboosters",
    description: "Skinboosters y mesocócteles coreanos para revitalización cutánea profunda. Hyaron, Profhilo y formulaciones premium de ácido hialurónico no reticulado para hidratación intradérmica. Distribuidor autorizado México.",
    keywords: "skinbooster México, hyaron precio, mesoterapia coreana, ácido hialurónico facial, biorevitalización, mesocóctel vitaminas",
  },
};

function fmt(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

export function generateStaticParams() {
  return categories.map(c => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const cat = categories.find(c => c.id === params.id);
  if (!cat) return {};
  const meta = catMeta[params.id];
  const catProducts = products.filter(p => p.categoryId === params.id);
  const url = `https://aesthetikskin.com/productos/categoria/${params.id}`;
  return {
    title: `${cat.label} — ${meta?.headline ?? cat.label} | Aesthetik Skin`,
    description: meta?.description ?? `Catálogo de ${cat.label} coreanos. Distribuidor autorizado en México. ${catProducts.map(p => p.name).join(", ")}.`,
    keywords: meta?.keywords ?? catProducts.map(p => p.name.toLowerCase()).join(", "),
    openGraph: {
      title: `${cat.label} | Aesthetik Skin`,
      description: meta?.description ?? `${cat.label} importados de Corea del Sur.`,
      url,
      type: "website",
    },
    alternates: { canonical: url },
  };
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const cat = categories.find(c => c.id === params.id);
  if (!cat) notFound();

  const meta = catMeta[params.id];
  const catProducts = products.filter(p => p.categoryId === params.id);
  const otherCats = categories.filter(c => c.id !== params.id);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: meta?.headline ?? cat.label,
    description: meta?.description,
    url: `https://aesthetikskin.com/productos/categoria/${params.id}`,
    numberOfItems: catProducts.length,
    itemListElement: catProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      description: p.description,
      url: `https://aesthetikskin.com/productos/${p.id}`,
      image: `https://aesthetikskin.com${p.image}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ background: "#F4EDE4", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ paddingTop: "80px" }}>

          {/* Hero */}
          <section style={{ background: "linear-gradient(155deg, #F4EDE4 0%, #EDE5DC 100%)", padding: "48px 24px 56px" }}>
            <div style={{ maxWidth: "1152px", margin: "0 auto" }}>

              {/* Breadcrumb */}
              <nav style={{ marginBottom: "32px" }}>
                <ol style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", listStyle: "none", padding: 0, margin: 0 }}>
                  {[{ label: "Inicio", href: "/" }, { label: "Catálogo", href: "/productos" }, { label: cat.label }].map((crumb, i, arr) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {crumb.href ? (
                        <><Link href={crumb.href} style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9E9087", textDecoration: "none" }}>{crumb.label}</Link><span style={{ color: "#BBA796", fontSize: "10px" }}>›</span></>
                      ) : (
                        <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A3F38" }}>{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#BE7865", marginBottom: "12px" }}>
                    Distribuidor autorizado · {catProducts.length} productos
                  </p>
                  <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", lineHeight: 1.1, marginBottom: "20px" }}>
                    {meta?.headline ?? cat.label}
                  </h1>
                  <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "14px", lineHeight: 1.85, color: "#7A6B60", marginBottom: "28px", maxWidth: "520px" }}>
                    {meta?.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {["100% Originales", "Importado Corea del Sur", "Envío a toda la República"].map(b => (
                      <span key={b} style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "9999px", border: "1px solid rgba(187,167,150,0.45)", background: "rgba(255,255,255,0.7)", color: "#4A3F38" }}>{b}</span>
                    ))}
                  </div>
                </div>

                {/* Product image mosaic */}
                {catProducts.length >= 2 && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {catProducts.slice(0, 4).map(p => (
                      <Link key={p.id} href={`/productos/${p.id}`} style={{ textDecoration: "none", borderRadius: "16px", overflow: "hidden", background: "#fff", border: "1px solid rgba(187,167,150,0.2)", boxShadow: "0 4px 16px rgba(74,63,56,0.06)", display: "block" }}>
                        <div style={{ position: "relative", height: "100px", borderTop: `3px solid ${p.accentColor}` }}>
                          <Image src={p.image} alt={p.name} fill className="object-contain p-4" sizes="200px" />
                        </div>
                        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A3F38", textAlign: "center", padding: "8px", borderTop: "1px solid rgba(187,167,150,0.15)" }}>{p.name}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Product grid */}
          <section style={{ padding: "64px 24px 80px" }}>
            <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
                {catProducts.map(product => (
                  <Link key={product.id} href={`/productos/${product.id}`} style={{ textDecoration: "none" }}>
                    <article style={{ borderRadius: "20px", overflow: "hidden", background: "#FFFFFF", border: "1px solid rgba(187,167,150,0.2)", boxShadow: "0 4px 20px rgba(74,63,56,0.07)", height: "100%", display: "flex", flexDirection: "column", borderTop: `3px solid ${product.accentColor}` }}>
                      <div style={{ position: "relative", height: "200px", background: "#FDFAF7" }}>
                        <Image src={product.image} alt={product.name} fill className="object-contain p-10" sizes="350px" loading="lazy" />
                      </div>
                      <div style={{ padding: "22px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9E9087", marginBottom: "6px" }}>
                          {product.tagline}
                        </p>
                        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", fontStyle: "italic", color: "#1A1A1A", marginBottom: "10px", fontWeight: 400 }}>
                          {product.name}
                        </h2>
                        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "#7A6B60", lineHeight: 1.7, flex: 1, marginBottom: "16px" }}>
                          {product.description}
                        </p>

                        {product.tags && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                            {product.tags.slice(0, 3).map(t => (
                              <span key={t} style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", padding: "3px 10px", borderRadius: "9999px", background: "rgba(187,167,150,0.12)", border: "1px solid rgba(187,167,150,0.3)", color: "#7A6B60" }}>{t}</span>
                            ))}
                          </div>
                        )}

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid rgba(187,167,150,0.15)" }}>
                          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", fontStyle: "italic", color: "#BE7865", fontWeight: 400 }}>
                            {fmt(product.price)}
                          </p>
                          <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#BE7865", padding: "6px 14px", borderRadius: "9999px", border: "1px solid rgba(190,120,101,0.3)", background: "rgba(190,120,101,0.05)" }}>
                            Ver producto →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Other categories */}
          <section style={{ padding: "48px 24px 64px", background: "#FFFFFF" }}>
            <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#9E9087", marginBottom: "24px", textAlign: "center" }}>
                Otras categorías
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                {otherCats.map(c => (
                  <Link key={c.id} href={`/productos/categoria/${c.id}`} style={{ textDecoration: "none", padding: "12px 24px", borderRadius: "9999px", border: "1px solid rgba(187,167,150,0.4)", background: "rgba(255,255,255,0.8)", fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#4A3F38" }}>
                    {c.label}
                  </Link>
                ))}
                <Link href="/productos" style={{ textDecoration: "none", padding: "12px 24px", borderRadius: "9999px", border: "1px solid rgba(190,120,101,0.35)", background: "rgba(190,120,101,0.06)", fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#BE7865" }}>
                  Ver catálogo completo
                </Link>
              </div>
            </div>
          </section>

          {/* WA CTA */}
          <section style={{ padding: "60px 24px", background: "linear-gradient(135deg, #F4EDE4, #EDE5DC)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#BE7865", marginBottom: "12px" }}>
              ¿Necesitas asesoría?
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", marginBottom: "14px" }}>
              Cotiza {cat.label} con nuestro equipo
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "#7A6B60", maxWidth: "440px", margin: "0 auto 28px", lineHeight: 1.8 }}>
              Respuesta inmediata. Precios especiales para clínicas y pedidos de volumen.
            </p>
            <a
              href={waLink(`Hola, me interesa cotizar ${cat.label}. ¿Me pueden ayudar?`)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "9999px", background: "#BE7865", color: "#fff", fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", boxShadow: "0 6px 24px rgba(190,120,101,0.3)" }}
            >
              Consultar por WhatsApp
            </a>
          </section>

        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
