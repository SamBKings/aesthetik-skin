"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ThreeBg = dynamic(() => import("./ThreeBg"), { ssr: false });

const WA = "https://wa.me/529612513578?text=" + encodeURIComponent("Hola, me interesa cotizar productos Voltena.");

const stats = [
  { value: "14",   label: "Productos", end: 14, prefix: "", suffix: "" },
  { value: "98.7%", label: "Pureza Nabota", end: 98.7, prefix: "", suffix: "%" },
  { value: "3×",   label: "Certificaciones", end: 3, prefix: "", suffix: "×" },
  { value: "24h",  label: "Respuesta", end: 24, prefix: "", suffix: "h" },
];

const trust = ["MFDS", "FDA", "CE", "🇰🇷 Made in Korea", "Dist. Autorizado Voltena"];

export default function Hero() {
  const subRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const badRef  = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Staggered entrance animations
    const items = [titleRef.current, subRef.current, ctaRef.current, statRef.current, badRef.current];
    items.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      setTimeout(() => {
        el.style.transition = `opacity 850ms cubic-bezier(0.16,1,0.3,1), transform 850ms cubic-bezier(0.16,1,0.3,1)`;
        el.style.opacity = "1";
        el.style.transform = "none";
      }, 300 + i * 160);
    });

    // Parallax on scroll
    const onScroll = () => {
      const y = window.scrollY;
      if (titleRef.current) titleRef.current.style.transform = `translateY(${y * 0.18}px)`;
      if (subRef.current)   subRef.current.style.transform   = `translateY(${y * 0.10}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Animated stat counters
    const statEls = statRef.current?.querySelectorAll("[data-end]") ?? [];
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const end     = parseFloat(el.dataset.end   ?? "0");
        const suffix  = el.dataset.suffix  ?? "";
        const prefix  = el.dataset.prefix  ?? "";
        const isFloat = !Number.isInteger(end);
        let start = 0;
        const duration = 1400;
        const step = (ts: number) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const val = end * ease;
          el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => counterObs.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      counterObs.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(155deg, #F4EDE4 0%, #EDE5DC 55%, #E8DDD4 100%)" }}
    >
      {/* 3D particle background */}
      <ThreeBg scene="petals" className="opacity-70" />

      {/* CSS floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-rose"  style={{ width:"520px", height:"520px", top:"-15%", right:"-8%", animationDuration:"14s" }} />
        <div className="orb orb-taupe" style={{ width:"380px", height:"380px", bottom:"-10%", left:"-5%", animationDuration:"18s", animationDelay:"-6s" }} />
        <div className="orb orb-cream" style={{ width:"280px", height:"280px", top:"35%", left:"55%", animationDuration:"11s", animationDelay:"-3s" }} />
      </div>

      {/* Decorative line top */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background:"linear-gradient(to right, transparent, rgba(187,167,150,0.45), transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20">
        <div className="max-w-2xl" style={{ paddingTop: "8px" }}>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 fu go" style={{ animationDelay:"100ms" }}>
            <span className="h-px w-8 bg-rose line-grow" />
            <span className="font-body text-rose" style={{ fontSize:"10px", letterSpacing:"0.28em", textTransform:"uppercase" }}>
              Dermocosmética Coreana Premium
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="font-heading text-brand mb-6"
            style={{ fontSize:"clamp(2.4rem, 5.5vw, 5.2rem)", fontWeight:400, lineHeight:1.1, letterSpacing:"-0.01em" }}
          >
            <span style={{ fontStyle:"italic" }}>Productos</span> de calidad.<br />
            <span style={{ fontStyle:"italic" }}>Resultados</span> que inspiran.
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="font-body text-mid mb-10"
            style={{ fontSize:"clamp(0.9rem, 2.2vw, 1rem)", lineHeight:1.85, maxWidth:"460px" }}
          >
            Distribuidores oficiales de{" "}
            <strong className="text-brand-mid font-medium">Voltena</strong> para médicos estéticos,
            dermatólogos y clínicas de alta exigencia en México y Latinoamérica.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-14">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ minHeight:"52px" }}>
              Cotizar por WhatsApp
            </a>
            <a href="#products" className="btn-ghost" style={{ minHeight:"52px" }}>
              Ver Catálogo ↓
            </a>
          </div>

          {/* Animated stats */}
          <div
            ref={statRef}
            className="flex flex-wrap gap-8 mb-10 pb-10"
            style={{ borderBottom:"1px solid rgba(187,167,150,0.35)" }}
          >
            {stats.map((s, i) => (
              <div key={s.label} style={{ animationDelay: `${i*80}ms` }}>
                <p
                  className="font-heading text-brand"
                  data-end={s.end}
                  data-suffix={s.suffix}
                  data-prefix={s.prefix}
                  style={{ fontSize:"clamp(1.5rem, 3vw, 2rem)", fontWeight:400, fontStyle:"italic", lineHeight:1 }}
                >
                  {s.value}
                </p>
                <p className="font-body text-mid mt-1" style={{ fontSize:"10px", letterSpacing:"0.14em", textTransform:"uppercase" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div ref={badRef} className="flex flex-wrap gap-2">
            {trust.map((b, i) => (
              <span
                key={b}
                className="font-body text-brand-mid"
                style={{
                  fontSize:"10px", letterSpacing:"0.1em",
                  padding:"6px 14px", borderRadius:"9999px",
                  border:"1px solid rgba(187,167,150,0.5)",
                  background:"rgba(255,255,255,0.55)",
                  backdropFilter:"blur(4px)",
                  animation:"fadeUp 0.5s var(--ease-spring) both",
                  animationDelay: `${800 + i * 80}ms`,
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
        <span className="block w-px h-10" style={{ background:"linear-gradient(to bottom, rgba(187,167,150,0.7), transparent)", animation:"fadeIn 1s ease 2s both" }} />
      </div>
    </section>
  );
}
