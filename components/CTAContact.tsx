"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { products, WA_NUMBER } from "@/lib/products";

const ThreeBg = dynamic(() => import("./ThreeBg"), { ssr: false });

const inputClass = "w-full bg-transparent border border-white/10 px-4 py-3 rounded-full font-body text-white placeholder:text-white/20 focus:outline-none focus:border-aq1/50 transition-colors duration-300 text-sm";
const labelClass = "block font-body text-white/70 mb-1.5";
const labelStyle = { fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" as const };

export default function CTAContact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", product: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola, soy ${form.name}.\n\nProducto de interés: ${form.product}\nTeléfono: ${form.phone}\nEmail: ${form.email}\n\nMensaje: ${form.message}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const WA_LINK = `https://wa.me/${WA_NUMBER}?text=` + encodeURIComponent("Hola, me gustaría obtener información sobre sus productos.");

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <ThreeBg scene="wave" className="opacity-25" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.88) 50%, #000 100%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — CTA copy */}
          <div>
            <p className="font-body text-xs tracking-[0.22em] uppercase mb-8" style={{ color: "#00d4e8" }}>
              Contáctanos
            </p>
            <h2 className="font-heading text-white italic mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.1 }}>
              ¿Listo para llevar tu clínica al{" "}
              <span style={{ color: "#c4a96a" }}>siguiente nivel?</span>
            </h2>
            <p className="font-body text-white/75 mb-12" style={{ fontSize: "14px", lineHeight: 1.8, maxWidth: "400px" }}>
              Un especialista te asesorará sobre los productos ideales para tu práctica.
              Respuesta garantizada en menos de 24 horas.
            </p>

            {/* Contact rows */}
            <div className="space-y-5 mb-12">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 group"
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center border border-[#25D366]/25 group-hover:border-[#25D366]/50 transition-colors shrink-0" style={{ background: "rgba(37,211,102,0.08)" }}>
                  <span style={{ color: "#25D366", fontSize: "18px" }}>💬</span>
                </div>
                <div>
                  <p className="font-body text-white font-medium" style={{ fontSize: "13px" }}>+52 961 251 3578</p>
                  <p className="font-body text-white/65" style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>WhatsApp · Respuesta inmediata</p>
                </div>
              </a>
              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-full flex items-center justify-center border border-aq-gold/15 shrink-0" style={{ background: "rgba(196,169,106,0.06)" }}>
                  <span style={{ color: "#c4a96a", fontSize: "16px" }}>🕐</span>
                </div>
                <div>
                  <p className="font-body text-white font-medium" style={{ fontSize: "13px" }}>Lun–Vie · 9:00 AM – 7:00 PM</p>
                  <p className="font-body text-white/65" style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Horario Central (CST)</p>
                </div>
              </div>
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-body text-sm tracking-widest uppercase font-medium transition-all duration-300"
              style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.12)"; }}
            >
              Escribir por WhatsApp ahora
            </a>
          </div>

          {/* Right — form */}
          <div className="lgs rounded-2xl p-8 lg:p-10">
            <p className="font-body text-white/65 mb-8" style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              O déjanos tus datos — te contactamos
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass} style={labelStyle}>Nombre *</label>
                  <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Tu nombre completo" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Teléfono *</label>
                  <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+52 000 000 0000" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass} style={labelStyle}>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="tu@clinica.com" className={inputClass} />
              </div>

              <div>
                <label className={labelClass} style={labelStyle}>Producto de interés *</label>
                <select name="product" required value={form.product} onChange={handleChange} className={inputClass} style={{ appearance: "none" }}>
                  <option value="" className="text-black bg-white">Selecciona un producto</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name} className="text-black bg-white">{p.name}</option>
                  ))}
                  <option value="Varios" className="text-black bg-white">Varios productos</option>
                  <option value="Info general" className="text-black bg-white">Información general</option>
                </select>
              </div>

              <div>
                <label className={labelClass} style={labelStyle}>Mensaje</label>
                <textarea name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Cuéntanos sobre tu práctica..." className={inputClass} style={{ resize: "none", borderRadius: "16px" }} />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full font-body text-sm tracking-widest uppercase font-medium transition-all duration-300"
                style={{ background: sent ? "rgba(37,211,102,0.2)" : "rgba(0,212,232,0.15)", border: `1px solid ${sent ? "rgba(37,211,102,0.5)" : "rgba(0,212,232,0.4)"}`, color: sent ? "#25D366" : "#00d4e8" }}
              >
                {sent ? "Abriendo WhatsApp…" : "Enviar por WhatsApp"}
              </button>

              <p className="font-body text-white/55 text-center" style={{ fontSize: "10px", letterSpacing: "0.06em" }}>
                Este formulario abrirá WhatsApp con tu mensaje.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
