"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "Productos", href: "#products" },
  { label: "Por qué Corea", href: "#why" },
  { label: "Nosotros", href: "#about" },
  { label: "FAQ", href: "#faq" },
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
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(0,0,0,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <a href="#" className="font-heading italic text-2xl tracking-widest text-white select-none">
        as
      </a>

      <ul className="hidden md:flex items-center gap-1">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="px-4 py-2 rounded-full text-xs tracking-widest uppercase text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-300 font-body"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-widest uppercase font-body font-medium transition-all duration-300"
        style={{ background: "rgba(0,212,232,0.12)", border: "1px solid rgba(0,212,232,0.35)", color: "#00d4e8" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,232,0.22)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,232,0.12)"; }}
      >
        Contactar
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Menú"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="block w-5 h-px bg-white/60 transition-all duration-300" style={{ transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none" }} />
        <span className="block w-5 h-px bg-white/60 transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
        <span className="block w-3 h-px bg-white/60 transition-all duration-300" style={{ transform: menuOpen ? "rotate(-45deg) translate(2px,-2px)" : "none", width: menuOpen ? "20px" : "12px" }} />
      </button>

      {/* Mobile dropdown */}
      <div
        className="md:hidden absolute top-16 inset-x-0 py-4 px-6 flex flex-col gap-3 transition-all duration-300 overflow-hidden"
        style={{
          background: "rgba(0,0,0,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          maxHeight: menuOpen ? "300px" : "0",
          opacity: menuOpen ? 1 : 0,
          paddingTop: menuOpen ? "16px" : "0",
          paddingBottom: menuOpen ? "16px" : "0",
        }}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="block text-sm tracking-widest uppercase text-white/60 hover:text-white py-2 font-body"
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-center px-5 py-3 rounded-full text-xs tracking-widest uppercase font-body"
          style={{ background: "rgba(0,212,232,0.15)", border: "1px solid rgba(0,212,232,0.4)", color: "#00d4e8" }}
        >
          Contactar por WhatsApp
        </a>
      </div>
    </nav>
  );
}
