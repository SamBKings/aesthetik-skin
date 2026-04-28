"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "Productos",   href: "#products" },
  { label: "Por qué Corea", href: "#why" },
  { label: "Nosotros",    href: "#about" },
  { label: "FAQ",         href: "#faq" },
];

const WA = "https://wa.me/529612513578?text=" + encodeURIComponent("Hola, quisiera más información sobre sus productos.");

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
        background: scrolled ? "rgba(244,237,228,0.92)" : "rgba(244,237,228,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(187,167,150,0.3)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(74,63,56,0.07)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 select-none" aria-label="Aesthetik Skin">
          {/* Mini butterfly mark */}
          <svg width="22" height="26" viewBox="0 0 72 84" fill="none" aria-hidden="true">
            <path d="M35 7 C17 14 10 36 15 62 C22 50 31 27 35 7Z" fill="#BBA796" opacity="0.92"/>
            <path d="M37 7 C55 14 62 36 56 62 C50 50 42 27 37 7Z" fill="#D9CEC3" opacity="0.80"/>
            <path d="M35 7 C33 22 33 44 36 62 C39 44 40 22 37 7Z" fill="#EDE5DC" opacity="0.65"/>
            <path d="M36 5 C40 16 32 32 36 48 C38 57 42 64 40 72" stroke="#4A3F38" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            <path d="M40 70 C46 65 53 69 49 75 C45 71 42 71 40 72Z" fill="#BBA796" opacity="0.85"/>
            <circle cx="40" cy="72" r="2.2" fill="#4A3F38"/>
          </svg>
          <div>
            <div className="font-body font-medium text-brand-mid" style={{ fontSize: "13px", letterSpacing: "0.22em", textTransform: "uppercase", lineHeight: 1 }}>
              Aesthetik
            </div>
            <div className="font-body font-light text-mid" style={{ fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", lineHeight: 1.2 }}>
              Skin
            </div>
          </div>
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

        {/* Desktop CTA */}
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex btn-primary"
          style={{ padding: "10px 22px", fontSize: "10px" }}
        >
          Contactar
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menú"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{ background: "#4A3F38", transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none" }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{ background: "#4A3F38", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block h-px transition-all duration-300"
            style={{ background: "#4A3F38", width: menuOpen ? "20px" : "12px", transform: menuOpen ? "rotate(-45deg) translate(2px,-2px)" : "none" }}
          />
        </button>
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
              className="block py-3 font-body text-brand-mid hover:text-rose border-b border-taupe-light/30 transition-colors"
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
