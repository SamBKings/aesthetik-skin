"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { categories, productsByCategory, waLink, type Product } from "@/lib/products";

const ThreeBg = dynamic(() => import("./ThreeBg"), { ssr: false });

/* ── 3D tilt card ──────────────────────────────────────────── */
function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  };
  const onMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) translateY(0)";
  };

  return (
    <div
      ref={cardRef}
      className="pcard lgs rounded-2xl overflow-hidden flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        borderTop: `2px solid ${product.accentColor}30`,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Image */}
      <div className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="absolute top-0 inset-x-0 h-0.5 opacity-60" style={{ background: product.accentColor }} />
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="prod-img object-contain p-8"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="font-body text-white/35 mb-1" style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
          {product.tagline}
        </p>
        <h3 className="font-heading text-white italic mb-2" style={{ fontSize: "1.45rem", fontWeight: 300 }}>
          {product.name}
        </h3>
        <p className="font-body text-white/45 mb-4 flex-1" style={{ fontSize: "12px", lineHeight: 1.7 }}>
          {product.body ?? product.description}
        </p>

        {/* Tags */}
        {product.tags && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded-full font-body text-white/50 border border-white/[0.08]"
                style={{ fontSize: "10px" }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <a
          href={waLink(product.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-body text-xs tracking-widest uppercase font-medium transition-all duration-300 border"
          style={{ borderColor: `${product.accentColor}40`, color: product.accentColor, background: `${product.accentColor}10` }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${product.accentColor}20`; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${product.accentColor}10`; }}
        >
          Cotizar
        </a>
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────── */
export default function Products() {
  const [activeTab, setActiveTab] = useState("toxinas");

  const tabProducts = productsByCategory(activeTab);

  return (
    <section id="products" className="relative py-24 lg:py-32 overflow-hidden">
      <ThreeBg scene="dna" className="opacity-20" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.85) 50%, #000 100%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-12 reveal vis">
          <p className="font-body text-xs tracking-[0.22em] uppercase mb-4" style={{ color: "#00d4e8" }}>
            Catálogo
          </p>
          <h2 className="font-heading text-white italic mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.1 }}>
            Productos de excelencia coreana
          </h2>
          <p className="font-body text-white/40 max-w-lg mx-auto" style={{ fontSize: "14px", lineHeight: 1.8 }}>
            100% originales · Certificados internacionalmente · Importados directamente desde Corea del Sur
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto no-scrollbar">
          <div className="flex gap-0 border-b border-white/[0.08]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`tab-btn${activeTab === cat.id ? " active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tabProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="font-body text-white/25 mb-4" style={{ fontSize: "12px", letterSpacing: "0.06em" }}>
            ¿Buscas algo específico? Nuestro equipo te asesora sin compromiso.
          </p>
          <a
            href={"https://wa.me/529612513578?text=" + encodeURIComponent("Hola, me gustaría recibir asesoría personalizada sobre sus productos.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-xs tracking-widest uppercase text-white/50 border border-white/[0.12] hover:text-white hover:border-white/25 transition-all duration-300"
          >
            Consultar con un especialista
          </a>
        </div>
      </div>
    </section>
  );
}
