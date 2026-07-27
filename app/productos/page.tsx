import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products, categories, waLink } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Catálogo de Productos | Aesthetik Skin — Dermocosmética Coreana",
  description: "Catálogo completo de productos coreanos: toxinas botulínicas Nabota e Innotox, rellenos dérmicos Dermalax y Juvéderm, Voltena para contorno corporal, skinboosters y más. Distribuidor autorizado en México.",
  keywords: "catálogo dermocosmética, nabota precio, innotox precio, dermalax, juvederm, voltena, skinbooster hyaron, comprar toxina botulínica México",
  openGraph: {
    title: "Catálogo Completo | Aesthetik Skin",
    description: "Productos coreanos premium para médicos estéticos y dermatólogos. Certificados internacionalmente, importados directamente de Corea del Sur.",
    url: "https://aesthetikskin.com/productos",
    type: "website",
  },
  alternates: { canonical: "https://aesthetikskin.com/productos" },
};

/* Schema.org for catalog page */
const catalogSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Catálogo de Productos | Aesthetik Skin",
  description: "Catálogo completo de dermocosmética coreana: toxinas botulínicas, rellenos dérmicos, Voltena y mesoterapia.",
  url: "https://aesthetikskin.com/productos",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `https://aesthetikskin.com/productos/${p.id}`,
    })),
  },
};

function fmt(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

export default function ProductosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }} />
      <div style={{ background: "#F4EDE4", minHeight: "100vh" }}>
        <Navbar />

        <main style={{ paddingTop: "80px" }}>

          {/* Hero */}
          <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "linear-gradient(155deg, #F4EDE4 0%, #EDE5DC 100%)" }}>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: "24px" }}>
              <ol style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", justifyContent: "center", listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Link href="/" style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9E9087", textDecoration: "none" }}>Inicio</Link>
                  <span style={{ color: "#BBA796", fontSize: "10px" }}>›</span>
                </li>
                <li>
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A3F38" }}>Catálogo</span>
                </li>
              </ol>
            </nav>

            <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#BE7865", marginBottom: "12px" }}>
              Distribuidor autorizado
            </p>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", lineHeight: 1.1, marginBottom: "16px" }}>
              Catálogo completo
            </h1>
            <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "14px", lineHeight: 1.8, color: "#7A6B60", maxWidth: "560px", margin: "0 auto 28px" }}>
              {products.length} productos coreanos certificados · 100% originales · Importados directamente de Corea del Sur
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
              {["MFDS", "FDA", "CE", "🇰🇷 Made in Korea"].map(b => (
                <span key={b} style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "9999px", border: "1px solid rgba(187,167,150,0.45)", background: "rgba(255,255,255,0.7)", color: "#4A3F38" }}>{b}</span>
              ))}
            </div>
          </section>

          {/* Sticky category nav */}
          <div style={{ position: "sticky", top: "80px", zIndex: 40, background: "rgba(244,237,228,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(187,167,150,0.25)", padding: "0 24px" }}>
            <div style={{ maxWidth: "1152px", margin: "0 auto", display: "flex", gap: "0", overflowX: "auto" }}>
              {categories.map(cat => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="cat-nav-link"
                >
                  {cat.label}
                </a>
              ))}
            </div>
          </div>

          {/* Categories + products */}
          <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "48px 24px 80px" }}>
            {categories.map(cat => {
              const catProducts = products.filter(p => p.categoryId === cat.id);
              return (
                <section key={cat.id} id={cat.id} style={{ marginBottom: "80px", scrollMarginTop: "140px" }}>
                  {/* Category header */}
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", marginBottom: "32px", paddingBottom: "16px", borderBottom: "1px solid rgba(187,167,150,0.3)" }}>
                    <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A" }}>
                      {cat.label}
                    </h2>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.14em", padding: "4px 12px", borderRadius: "9999px", background: "rgba(190,120,101,0.1)", color: "#BE7865", border: "1px solid rgba(190,120,101,0.2)" }}>
                      {catProducts.length} productos
                    </span>
                    <Link
                      href={`/productos/categoria/${cat.id}`}
                      style={{ marginLeft: "auto", fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9E9087", textDecoration: "none" }}
                    >
                      Ver página de categoría →
                    </Link>
                  </div>

                  {/* Product grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
                    {catProducts.map(product => (
                      <Link key={product.id} href={`/productos/${product.id}`} style={{ textDecoration: "none" }}>
                        <article style={{ borderRadius: "16px", overflow: "hidden", background: "#FFFFFF", border: "1px solid rgba(187,167,150,0.2)", boxShadow: "0 4px 16px rgba(74,63,56,0.06)", height: "100%", display: "flex", flexDirection: "column", borderTop: `3px solid ${product.accentColor}` }}>
                          {/* Image */}
                          <div style={{ position: "relative", height: "180px", background: "#FDFAF7" }}>
                            <Image src={product.image} alt={product.name} fill className="object-contain p-8" sizes="300px" loading="lazy" />
                          </div>

                          {/* Info */}
                          <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                            <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9E9087", marginBottom: "4px" }}>
                              {product.tagline}
                            </p>
                            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", fontStyle: "italic", color: "#1A1A1A", marginBottom: "8px", fontWeight: 400 }}>
                              {product.name}
                            </h3>
                            <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "12px", color: "#7A6B60", lineHeight: 1.65, marginBottom: "12px", flex: 1 }}>
                              {product.description}
                            </p>

                            {product.tags && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                                {product.tags.slice(0, 2).map(t => (
                                  <span key={t} style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", padding: "3px 10px", borderRadius: "9999px", background: "rgba(187,167,150,0.12)", border: "1px solid rgba(187,167,150,0.3)", color: "#7A6B60" }}>{t}</span>
                                ))}
                              </div>
                            )}

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(187,167,150,0.15)" }}>
                              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontStyle: "italic", color: "#BE7865", fontWeight: 400 }}>
                                {fmt(product.price)}
                              </p>
                              <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#BE7865" }}>
                                Ver más →
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* CTA mayoreo */}
            <div style={{ textAlign: "center", padding: "40px", borderRadius: "20px", background: "linear-gradient(135deg, #fff, #FDFAF7)", border: "1px solid rgba(187,167,150,0.25)", boxShadow: "0 8px 32px rgba(74,63,56,0.07)" }}>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontStyle: "italic", color: "#1A1A1A", marginBottom: "10px" }}>
                ¿Buscas precios de mayoreo?
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "#7A6B60", marginBottom: "24px" }}>
                Contamos con precios especiales por volumen para clínicas y distribuidores. Escríbenos y te cotizamos.
              </p>
              <a
                href={waLink("Hola, me interesa conocer sus precios de mayoreo.")}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", padding: "13px 30px", borderRadius: "9999px", background: "#BE7865", color: "#fff", fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", boxShadow: "0 4px 20px rgba(190,120,101,0.3)" }}
              >
                Consultar precios de mayoreo
              </a>
            </div>
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
