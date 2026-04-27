"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function TopBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className="relative flex items-center justify-center px-6 py-2.5 text-center"
      style={{ background: "#1A1A1A" }}
    >
      <p
        className="font-sans text-white/70"
        style={{ fontSize: "10px", letterSpacing: "0.2em" }}
      >
        <span className="text-gold mr-3">🇰🇷</span>
        DISTRIBUIDOR AUTORIZADO VOLTENA · ENVÍOS A TODA LA REPÚBLICA
        <span className="hidden sm:inline"> · MFDS · FDA · CE</span>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 text-white/30 hover:text-white/70 transition-colors"
        aria-label="Cerrar"
      >
        <X size={12} />
      </button>
    </div>
  );
}
