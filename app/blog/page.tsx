import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Blog — Dermocosmética Coreana | Aesthetik Skin",
  description: "Artículos especializados sobre toxinas botulínicas, rellenos dérmicos, contorno corporal, skinboosters y dermocosmética coreana. Recursos para médicos estéticos y dermatólogos.",
  keywords: "blog dermocosmética, toxina botulínica, rellenos dérmicos, skinboosters, medicina estética, productos coreanos",
  openGraph: {
    title: "Blog | Aesthetik Skin",
    description: "Recursos especializados en dermocosmética coreana para profesionales de la salud.",
    url: "https://aesthetikskin.com/blog",
    type: "website",
  },
  alternates: { canonical: "https://aesthetikskin.com/blog" },
};

const categories = Array.from(new Set(blogPosts.map(p => p.category)));

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div style={{ background: "#F4EDE4", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>

        {/* Hero */}
        <section style={{ padding: "60px 24px 48px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#BE7865", marginBottom: "12px" }}>
            Recursos para profesionales
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", lineHeight: 1.1, marginBottom: "14px" }}>
            Blog de dermocosmética
          </h1>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "14px", color: "#7A6B60", maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>
            Artículos especializados en toxinas, rellenos, contorno corporal y las últimas tendencias de la dermocosmética coreana.
          </p>
        </section>

        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px 80px" }}>

          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block", marginBottom: "48px" }}>
            <article style={{ borderRadius: "20px", overflow: "hidden", background: "#FFFFFF", boxShadow: "0 8px 40px rgba(74,63,56,0.10)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              <div style={{ position: "relative", minHeight: "260px", background: "#FDFAF7" }}>
                <Image src={featured.image} alt={featured.title} fill className="object-contain p-10" sizes="600px" />
              </div>
              <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "4px 12px", borderRadius: "9999px", background: "rgba(190,120,101,0.1)", color: "#BE7865", border: "1px solid rgba(190,120,101,0.2)" }}>
                    {featured.category}
                  </span>
                  <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", color: "#9E9087" }}>
                    {featured.readTime} min de lectura
                  </span>
                </div>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", lineHeight: 1.25, marginBottom: "14px" }}>
                  {featured.title}
                </h2>
                <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "#7A6B60", lineHeight: 1.75, marginBottom: "20px" }}>
                  {featured.excerpt}
                </p>
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#BE7865" }}>
                  Leer artículo →
                </span>
              </div>
            </article>
          </Link>

          {/* Rest of posts */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <article style={{ borderRadius: "16px", overflow: "hidden", background: "#FFFFFF", border: "1px solid rgba(187,167,150,0.2)", boxShadow: "0 4px 16px rgba(74,63,56,0.06)", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "relative", height: "180px", background: "#FDFAF7" }}>
                    <Image src={post.image} alt={post.title} fill className="object-contain p-8" sizes="400px" loading="lazy" />
                  </div>
                  <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "12px", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "9999px", background: "rgba(187,167,150,0.15)", color: "#7A6B60" }}>
                        {post.category}
                      </span>
                      <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", color: "#9E9087" }}>
                        {post.readTime} min
                      </span>
                    </div>
                    <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontStyle: "italic", color: "#1A1A1A", lineHeight: 1.35, marginBottom: "10px", fontWeight: 400 }}>
                      {post.title}
                    </h2>
                    <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "12px", color: "#7A6B60", lineHeight: 1.7, flex: 1, marginBottom: "16px" }}>
                      {post.excerpt.slice(0, 120)}…
                    </p>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#BE7865" }}>
                      Leer más →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
