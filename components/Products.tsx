"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories, productsByCategory, waLink, type Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

function fmt(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* 3D tilt on mouse */
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x*10}deg) rotateX(${-y*8}deg) translateY(-6px) scale(1.01)`;
    card.style.boxShadow = `${-x*12}px ${-y*8}px 40px rgba(74,63,56,0.16), 0 20px 40px rgba(74,63,56,0.10)`;
  };
  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)";
    card.style.boxShadow = "";
    card.style.transition = "transform 0.5s var(--ease-spring), box-shadow 0.5s";
  };

  return (
    <div
      ref={cardRef}
      className="pcard card flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        borderTop: `2px solid ${product.accentColor}60`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Image */}
      <div className="relative h-52 flex items-center justify-center overflow-hidden" style={{ background:"#FDFAF7" }}>
        {/* Subtle accent line top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 opacity-70" style={{ background: product.accentColor }} />
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
      <div className="p-5 flex flex-col flex-1" style={{ borderTop:"1px solid rgba(187,167,150,0.15)" }}>
        <p className="font-body text-muted mb-1" style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase" }}>
          {product.tagline}
        </p>
        <h3 className="font-heading text-brand mb-2" style={{ fontSize:"1.3rem", fontWeight:400, fontStyle:"italic" }}>
          {product.name}
        </h3>
        <p className="font-body text-mid mb-4 flex-1" style={{ fontSize:"12px", lineHeight:1.7 }}>
          {product.body ?? product.description}
        </p>

        {product.tags && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.tags.slice(0,3).map(t => (
              <span key={t} className="px-2.5 py-0.5 rounded-full font-body text-mid"
                style={{ fontSize:"10px", background:"rgba(187,167,150,0.12)", border:"1px solid rgba(187,167,150,0.3)" }}>
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <p className="font-heading text-rose mb-3" style={{ fontSize:"1.15rem", fontWeight:400, fontStyle:"italic" }}>
          {fmt(product.price)}
          <span className="font-body text-muted" style={{ fontSize:"9px", letterSpacing:"0.1em", fontStyle:"normal", marginLeft:"4px" }}>MXN / pieza</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={() => {
              addItem(product);
              setAdded(true);
              setTimeout(() => setAdded(false), 1600);
            }}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-body font-medium transition-all duration-300"
            style={{ fontSize:"10px", letterSpacing:"0.14em", textTransform:"uppercase", background: added ? "var(--rose-dark)" : "var(--rose)", color:"#fff", boxShadow:"0 3px 12px rgba(190,120,101,0.25)", border:"none", cursor:"pointer" }}
          >
            {added ? "✓ Agregado" : "Agregar al carrito"}
          </button>
          <a
            href={waLink(product.waMessage)}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-full font-body transition-all duration-300"
            style={{ fontSize:"10px", letterSpacing:"0.14em", textTransform:"uppercase", background:"transparent", color:"var(--rose)", border:"1px solid rgba(190,120,101,0.4)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(190,120,101,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; }}
          >
            Cotizar por WhatsApp
          </a>
          <Link
            href={`/productos/${product.id}`}
            className="inline-flex items-center justify-center gap-1 font-body"
            style={{ fontSize:"9px", letterSpacing:"0.14em", textTransform:"uppercase", color:"#9E9087", textDecoration:"none", paddingTop:"4px" }}
          >
            Ver ficha completa →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [activeTab, setActiveTab] = useState("toxinas");
  const tabProducts = productsByCategory(activeTab);

  return (
    <section id="products" className="relative py-24 lg:py-32 overflow-hidden" style={{ background:"#FFFFFF" }}>
      {/* Subtle orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-rose"  style={{ width:"600px", height:"600px", top:"-25%", right:"-15%", animationDuration:"22s", opacity:0.5 }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">

        <div className="text-center mb-12 reveal vis">
          <p className="font-body text-rose mb-4" style={{ fontSize:"10px", letterSpacing:"0.28em", textTransform:"uppercase" }}>
            Catálogo
          </p>
          <h2 className="font-heading text-brand italic mb-4" style={{ fontSize:"clamp(2rem, 4vw, 3.2rem)", fontWeight:400, lineHeight:1.1 }}>
            Productos de excelencia coreana
          </h2>
          <p className="font-body text-mid max-w-lg mx-auto" style={{ fontSize:"14px", lineHeight:1.8 }}>
            100% originales · Certificados internacionalmente · Importados directamente desde Corea del Sur
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-12 overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex gap-0 border-b w-max md:w-full md:justify-center mx-auto" style={{ borderColor:"rgba(187,167,150,0.4)" }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`tab-btn${activeTab === cat.id ? " active" : ""}`}
                style={{ fontSize:"11px", padding:"10px 16px" }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tabProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 70} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="font-body text-mid mb-5" style={{ fontSize:"13px" }}>
            ¿Buscas algo específico? Nuestro equipo te asesora sin compromiso.
          </p>
          <a
            href={"https://wa.me/528134188472?text=" + encodeURIComponent("Hola, me gustaría recibir asesoría personalizada.")}
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost"
          >
            Consultar con un especialista
          </a>
        </div>
      </div>
    </section>
  );
}
