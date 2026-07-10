"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const links = [
  { label: "Productos",     href: "#products" },
  { label: "Por qué Corea", href: "#why" },
  { label: "Nosotros",      href: "#about" },
  { label: "FAQ",           href: "#faq" },
];

const WA = "https://wa.me/528134188472?text=" + encodeURIComponent("Hola, quisiera más información sobre sus productos.");

function LogoMark() {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontFamily: "var(--font-montserrat), system-ui", fontSize: "14px", letterSpacing: "0.24em", fontWeight: 500, color: "#1A1A1A", textTransform: "uppercase" }}>
          Aesthetik
        </span>
        <span style={{ fontFamily: "var(--font-montserrat), system-ui", fontSize: "9px", letterSpacing: "0.36em", fontWeight: 300, color: "#7A6B60", textTransform: "uppercase" }}>
          Skin
        </span>
      </div>
    );
  }

  return (
    <Image
      src="/assets/logo.png"
      alt="Aesthetik Skin"
      width={200}
      height={74}
      priority
      onError={() => setImgError(true)}
      style={{
        height: "62px",
        width: "auto",
        objectFit: "contain",
        /* blend-mode multiply hace que el fondo crema del logo
           se fusione perfectamente con el fondo crema de la navbar */
        mixBlendMode: "multiply",
      }}
    />
  );
}

function CartIcon() {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      aria-label={`Carrito (${count})`}
      style={{ position: "relative", width: 40, height: 40, background: "transparent", border: "1px solid rgba(187,167,150,0.4)", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#4A3F38", flexShrink: 0 }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      {count > 0 && (
        <span style={{ position: "absolute", top: -4, right: -4, minWidth: 18, height: 18, background: "#BE7865", color: "#fff", borderRadius: "9999px", fontSize: "9px", fontFamily: "var(--font-montserrat)", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", letterSpacing: "0.02em" }}>
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(244,237,228,0.94)" : "rgba(244,237,228,0.80)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(187,167,150,0.3)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(74,63,56,0.07)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">

        <a href="#" className="flex items-center select-none" aria-label="Aesthetik Skin">
          <LogoMark />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 rounded-full font-body text-mid hover:text-brand transition-colors duration-300"
                style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + cart */}
        <div className="hidden md:flex items-center gap-3">
          <CartIcon />
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: "10px 22px", fontSize: "10px" }}
          >
            Contactar
          </a>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <CartIcon />
          <button
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menú"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block w-5 h-px transition-all duration-300" style={{ background: "#4A3F38", transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none" }} />
            <span className="block w-5 h-px transition-all duration-300" style={{ background: "#4A3F38", opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-px transition-all duration-300"    style={{ background: "#4A3F38", width: menuOpen ? "20px" : "12px", transform: menuOpen ? "rotate(-45deg) translate(2px,-2px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "320px" : "0",
          opacity: menuOpen ? 1 : 0,
          background: "rgba(244,237,228,0.97)",
          borderTop: menuOpen ? "1px solid rgba(187,167,150,0.25)" : "none",
        }}
      >
        <div className="px-6 pb-6 pt-4 flex flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-3 font-body text-brand-mid border-b border-taupe-light/30 transition-colors hover:text-rose"
              style={{ fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-3 text-center"
            style={{ padding: "12px 24px", fontSize: "10px" }}
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
