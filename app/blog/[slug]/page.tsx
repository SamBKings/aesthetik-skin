import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/blog";
import { waLink } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  const url = `https://aesthetikskin.com/blog/${post.slug}`;
  return {
    title: `${post.title} | Aesthetik Skin`,
    description: post.excerpt,
    keywords: post.tags.join(", ") + ", dermocosmética, aesthetik skin",
    openGraph: { title: post.title, description: post.excerpt, url, type: "article", images: [`https://aesthetikskin.com${post.image}`] },
    alternates: { canonical: url },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(params.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Aesthetik Skin" },
    publisher: { "@type": "Organization", name: "Aesthetik Skin", url: "https://aesthetikskin.com" },
    image: `https://aesthetikskin.com${post.image}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ background: "#F4EDE4", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ paddingTop: "80px" }}>

          {/* Hero */}
          <section style={{ background: "linear-gradient(155deg, #F4EDE4, #EDE5DC)", padding: "48px 24px 0" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              {/* Breadcrumb */}
              <nav style={{ marginBottom: "28px" }}>
                <ol style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", listStyle: "none", padding: 0, margin: 0 }}>
                  {[{ label: "Inicio", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }].map((crumb, i, arr) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {crumb.href ? (
                        <><Link href={crumb.href} style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9E9087", textDecoration: "none" }}>{crumb.label}</Link><span style={{ color: "#BBA796", fontSize: "10px" }}>›</span></>
                      ) : (
                        <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A3F38", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "4px 12px", borderRadius: "9999px", background: "rgba(190,120,101,0.1)", color: "#BE7865", border: "1px solid rgba(190,120,101,0.2)" }}>{post.category}</span>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", color: "#9E9087" }}>{post.readTime} min de lectura</span>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", color: "#9E9087" }}>{new Date(post.date).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>

              <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 4.5vw, 3rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", lineHeight: 1.15, marginBottom: "20px" }}>
                {post.title}
              </h1>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "15px", color: "#7A6B60", lineHeight: 1.8, marginBottom: "40px" }}>
                {post.excerpt}
              </p>

              {/* Hero image */}
              <div style={{ position: "relative", borderRadius: "16px 16px 0 0", overflow: "hidden", height: "280px", background: "#FFFFFF" }}>
                <Image src={post.image} alt={post.title} fill className="object-contain p-10" sizes="800px" priority />
              </div>
            </div>
          </section>

          {/* Article body */}
          <section style={{ background: "#FFFFFF", padding: "56px 24px 64px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "48px" }}>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(187,167,150,0.25)" }}>
                <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9E9087", marginBottom: "10px" }}>Temas</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", padding: "5px 14px", borderRadius: "9999px", border: "1px solid rgba(187,167,150,0.4)", background: "#FDFAF7", color: "#4A3F38" }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ padding: "32px", borderRadius: "16px", background: "rgba(190,120,101,0.06)", border: "1px solid rgba(190,120,101,0.18)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontStyle: "italic", color: "#1A1A1A", marginBottom: "10px" }}>
                  ¿Quieres saber más sobre nuestros productos?
                </p>
                <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "12px", color: "#7A6B60", marginBottom: "20px" }}>
                  Somos distribuidores oficiales de los productos mencionados en este artículo. Escríbenos y te asesoramos sin compromiso.
                </p>
                <a
                  href={waLink(`Hola, leí el artículo "${post.title}" y me gustaría más información.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", padding: "12px 28px", borderRadius: "9999px", background: "#BE7865", color: "#fff", fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none" }}
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </section>

          {/* Related posts */}
          {related.length > 0 && (
            <section style={{ padding: "64px 24px", background: "#F4EDE4" }}>
              <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", marginBottom: "32px", textAlign: "center" }}>
                  Artículos relacionados
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                  {related.map(p => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                      <article style={{ borderRadius: "14px", overflow: "hidden", background: "#FFFFFF", border: "1px solid rgba(187,167,150,0.2)", boxShadow: "0 2px 12px rgba(74,63,56,0.06)" }}>
                        <div style={{ position: "relative", height: "140px", background: "#FDFAF7" }}>
                          <Image src={p.image} alt={p.title} fill className="object-contain p-6" sizes="350px" loading="lazy" />
                        </div>
                        <div style={{ padding: "16px 18px" }}>
                          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#BE7865", marginBottom: "6px" }}>{p.category}</p>
                          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontStyle: "italic", color: "#1A1A1A", lineHeight: 1.3, fontWeight: 400 }}>{p.title}</p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
                <div style={{ textAlign: "center", marginTop: "32px" }}>
                  <Link href="/blog" style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#9E9087", textDecoration: "none" }}>
                    ← Ver todos los artículos
                  </Link>
                </div>
              </div>
            </section>
          )}

        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
