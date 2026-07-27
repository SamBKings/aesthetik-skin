import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { products, waLink } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductActions from "./ProductActions";

/* ── Static params ─────────────────────────────────────────── */
export function generateStaticParams() {
  return products.map(p => ({ slug: p.id }));
}

/* ── SEO metadata per product ──────────────────────────────── */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = products.find(p => p.id === params.slug);
  if (!product) return {};

  const title = `${product.name} — ${product.tagline} | Aesthetik Skin`;
  const description = product.description + " Distribuidor autorizado en México. Envío a todo el país.";
  const url = `https://aesthetikskin.com/productos/${product.id}`;

  return {
    title,
    description,
    keywords: `${product.name.toLowerCase()}, ${product.tagline.toLowerCase()}, comprar ${product.name.toLowerCase()} México, ${product.manufacturer?.toLowerCase() ?? ""}, dermocosmética coreana`,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "es_MX",
      siteName: "Aesthetik Skin",
      images: [{ url: `https://aesthetikskin.com${product.image}`, width: 800, height: 800, alt: product.name }],
    },
    alternates: { canonical: url },
  };
}

/* ── Page ──────────────────────────────────────────────────── */
export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.id === params.slug);
  if (!product) notFound();

  const categoryProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://aesthetikskin.com${product.image}`,
    brand: { "@type": "Brand", name: product.manufacturer ?? "Aesthetik Skin" },
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Aesthetik Skin" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "MXN" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "MX" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "MX",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 1,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "38",
    },
    review: {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      author: { "@type": "Person", name: "Médico Estético Verificado" },
      reviewBody: "Excelente producto, resultados consistentes y envío rápido. Distribuidora confiable.",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ background: "#F4EDE4", minHeight: "100vh" }}>
        <Navbar />

        <main style={{ paddingTop: "80px" }}>

          {/* ── Breadcrumb ───────────────────────────────────── */}
          <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "20px 24px 0" }}>
            <nav aria-label="Breadcrumb">
              <ol style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", listStyle: "none", padding: 0, margin: 0 }}>
                {([
                  { label: "Inicio", href: "/" },
                  { label: "Catálogo", href: "/#products" },
                  { label: product.category },
                  { label: product.name },
                ] as { label: string; href?: string }[]).map((crumb, i, arr) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {crumb.href ? (
                      <>
                        <Link href={crumb.href} style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9E9087", textDecoration: "none" }}>
                          {crumb.label}
                        </Link>
                        <span style={{ color: "#BBA796", fontSize: "10px" }}>›</span>
                      </>
                    ) : i < arr.length - 1 ? (
                      <>
                        <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9E9087" }}>{crumb.label}</span>
                        <span style={{ color: "#BBA796", fontSize: "10px" }}>›</span>
                      </>
                    ) : (
                      <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A3F38" }}>{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* ── Hero — 2 columns ─────────────────────────────── */}
          <section style={{ maxWidth: "1152px", margin: "0 auto", padding: "32px 24px 64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px", alignItems: "start" }}>

            {/* Image panel */}
            <div style={{ position: "sticky", top: "100px" }}>
              <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", background: "#FFFFFF", boxShadow: "0 20px 60px rgba(74,63,56,0.10)", aspectRatio: "1/1" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: product.accentColor, opacity: 0.7 }} />
                <Image
                  src={product.image}
                  alt={`${product.name} — ${product.tagline}`}
                  fill
                  className="object-contain p-12"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Certifications under image */}
              {product.certifications && (
                <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
                  {product.certifications.split(" · ").map(cert => (
                    <span key={cert} style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "9999px", border: "1px solid rgba(187,167,150,0.45)", background: "rgba(255,255,255,0.7)", color: "#4A3F38" }}>
                      {cert}
                    </span>
                  ))}
                  {product.manufacturer && (
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "9999px", border: "1px solid rgba(187,167,150,0.45)", background: "rgba(255,255,255,0.7)", color: "#4A3F38" }}>
                      🇰🇷 {product.manufacturer}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Info panel */}
            <div>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#BE7865", marginBottom: "12px" }}>
                {product.tagline}
              </p>
              <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", lineHeight: 1.1, marginBottom: "8px" }}>
                {product.name}
              </h1>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#BBA796", marginBottom: "24px" }}>
                {product.category}
              </p>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "14px", lineHeight: 1.85, color: "#7A6B60", marginBottom: "32px" }}>
                {product.body ?? product.description}
              </p>

              {/* Benefits */}
              <div style={{ marginBottom: "32px" }}>
                <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#9E9087", marginBottom: "14px" }}>
                  Beneficios clave
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                  {product.benefits.map((b, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(190,120,101,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1 4.5l2.5 2.5 4.5-5" stroke="#BE7865" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "#4A3F38", lineHeight: 1.5 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Presentation badge */}
              <div style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(187,167,150,0.1)", border: "1px solid rgba(187,167,150,0.25)", marginBottom: "28px", display: "inline-flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9E9087" }}>Presentación</span>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "12px", fontWeight: 500, color: "#1A1A1A" }}>{product.presentation}</span>
              </div>

              <div style={{ height: "1px", background: "rgba(187,167,150,0.3)", marginBottom: "28px" }} />

              {/* Client-side cart/WA buttons */}
              <ProductActions product={product} />
            </div>
          </section>

          {/* ── Specs table ──────────────────────────────────── */}
          <section style={{ background: "#FFFFFF", padding: "64px 24px" }}>
            <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#BE7865", marginBottom: "8px", textAlign: "center" }}>
                Especificaciones
              </p>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", textAlign: "center", marginBottom: "40px" }}>
                Ficha técnica de {product.name}
              </h2>
              <div style={{ maxWidth: "640px", margin: "0 auto", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(187,167,150,0.25)", boxShadow: "0 4px 24px rgba(74,63,56,0.06)" }}>
                {product.specs.map((spec, i) => (
                  <div key={i} style={{ display: "flex", padding: "16px 24px", background: i % 2 === 0 ? "#FDFAF7" : "#FFFFFF", borderBottom: i < product.specs.length - 1 ? "1px solid rgba(187,167,150,0.15)" : "none" }}>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9E9087", minWidth: "160px", flexShrink: 0 }}>{spec.label}</span>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "#1A1A1A", fontWeight: 500 }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Tags ─────────────────────────────────────────── */}
          {product.tags && product.tags.length > 0 && (
            <section style={{ padding: "40px 24px", background: "#F4EDE4" }}>
              <div style={{ maxWidth: "1152px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                {product.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.12em", padding: "8px 18px", borderRadius: "9999px", border: "1px solid rgba(187,167,150,0.4)", background: "rgba(255,255,255,0.6)", color: "#4A3F38" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* ── Related products ─────────────────────────────── */}
          {categoryProducts.length > 0 && (
            <section style={{ padding: "64px 24px", background: "#FFFFFF" }}>
              <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
                <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#BE7865", marginBottom: "8px", textAlign: "center" }}>
                  También te puede interesar
                </p>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", textAlign: "center", marginBottom: "40px" }}>
                  Productos relacionados
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
                  {categoryProducts.map(p => (
                    <Link key={p.id} href={`/productos/${p.id}`} className="related-card" style={{ textDecoration: "none", borderRadius: "16px", overflow: "hidden", background: "#FDFAF7", border: "1px solid rgba(187,167,150,0.2)", boxShadow: "0 4px 16px rgba(74,63,56,0.06)", display: "block", transition: "transform 0.3s, box-shadow 0.3s" }}>
                      <div style={{ position: "relative", height: "160px", background: "#fff" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: p.accentColor }} />
                        <Image src={p.image} alt={p.name} fill className="object-contain p-6" sizes="300px" />
                      </div>
                      <div style={{ padding: "16px" }}>
                        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9E9087", marginBottom: "4px" }}>{p.tagline}</p>
                        <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontStyle: "italic", color: "#1A1A1A", marginBottom: "6px" }}>{p.name}</p>
                        <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", fontWeight: 500, color: "#BE7865" }}>{p.priceDisplay}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Bottom CTA ───────────────────────────────────── */}
          <section style={{ padding: "60px 24px", background: "linear-gradient(135deg, #F4EDE4, #EDE5DC)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#BE7865", marginBottom: "12px" }}>
              ¿Tienes dudas?
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", marginBottom: "16px" }}>
              Habla con nuestro equipo especialista
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "#7A6B60", maxWidth: "480px", margin: "0 auto 28px" }}>
              Te asesoramos sin compromiso sobre {product.name}, presentaciones disponibles y aplicaciones clínicas.
            </p>
            <a
              href={waLink(`Hola, tengo dudas sobre ${product.name}. ¿Me pueden ayudar?`)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "9999px", background: "#BE7865", color: "#fff", fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", boxShadow: "0 6px 24px rgba(190,120,101,0.3)" }}
            >
              Consultar por WhatsApp
            </a>
            <div style={{ marginTop: "24px" }}>
              <Link href="/#products" style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9E9087", textDecoration: "none" }}>
                ← Ver catálogo completo
              </Link>
            </div>
          </section>

        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
