"use client";
import React, { useState } from "react";
import { products, WA_NUMBER } from "@/lib/products";

const inputClass = "w-full bg-white border border-taupe-light/60 px-4 py-3 rounded-xl font-body text-brand placeholder:text-muted focus:outline-none focus:border-rose/50 transition-colors duration-300 text-sm";
const labelClass = "block font-body text-brand-mid mb-1.5";
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
    <section id="contact" className="py-24 lg:py-32" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — CTA copy */}
          <div>
            <p className="font-body text-rose mb-8" style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
              Contáctanos
            </p>
            <h2 className="font-heading text-brand italic mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400, lineHeight: 1.1 }}>
              ¿Listo para llevar tu clínica al{" "}
              <span className="text-rose">siguiente nivel?</span>
            </h2>
            <p className="font-body text-mid mb-12" style={{ fontSize: "14px", lineHeight: 1.85, maxWidth: "400px" }}>
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
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center border shrink-0 transition-colors"
                  style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.3)" }}
                >
                  <span style={{ color: "#25D366", fontSize: "18px" }}>💬</span>
                </div>
                <div>
                  <p className="font-body text-brand font-medium" style={{ fontSize: "13px" }}>+52 813 418 8472</p>
                  <p className="font-body text-muted" style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>WhatsApp · Respuesta inmediata</p>
                </div>
              </a>
              <div className="flex items-center gap-5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(187,167,150,0.12)", border: "1px solid rgba(187,167,150,0.3)" }}
                >
                  <span style={{ color: "#BBA796", fontSize: "16px" }}>🕐</span>
                </div>
                <div>
                  <p className="font-body text-brand font-medium" style={{ fontSize: "13px" }}>Lun–Vie · 9:00 AM – 7:00 PM</p>
                  <p className="font-body text-muted" style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Horario Central (CST)</p>
                </div>
              </div>
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ background: "rgba(37,211,102,0.9)", boxShadow: "0 4px 16px rgba(37,211,102,0.25)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#22c55e"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.9)"; }}
            >
              Escribir por WhatsApp ahora
            </a>
          </div>

          {/* Right — form */}
          <div className="card p-8 lg:p-10" style={{ borderTop: "2px solid rgba(190,120,101,0.35)" }}>
            <p className="font-body text-muted mb-8" style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
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
                  <option value="">Selecciona un producto</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Varios">Varios productos</option>
                  <option value="Info general">Información general</option>
                </select>
              </div>

              <div>
                <label className={labelClass} style={labelStyle}>Mensaje</label>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu práctica..."
                  className={inputClass}
                  style={{ resize: "none", borderRadius: "12px" }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-body font-medium transition-all duration-300"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  background: sent ? "rgba(37,211,102,0.12)" : "var(--rose)",
                  border: sent ? "1px solid rgba(37,211,102,0.4)" : "none",
                  color: sent ? "#22c55e" : "#fff",
                  boxShadow: sent ? "none" : "0 4px 16px rgba(190,120,101,0.30)",
                }}
              >
                {sent ? "Abriendo WhatsApp…" : "Enviar por WhatsApp"}
              </button>

              <p className="font-body text-muted text-center" style={{ fontSize: "10px", letterSpacing: "0.06em" }}>
                Este formulario abrirá WhatsApp con tu mensaje.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
