export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(155deg, #F4EDE4 0%, #EDE5DC 55%, #E8DDD4 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "60px 48px",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(74,63,56,0.10)",
          borderTop: "2px solid rgba(190,120,101,0.35)",
        }}
      >
        {/* Check icon */}
        <div
          style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(190,120,101,0.1)",
            margin: "0 auto 28px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M5 14l7 7 11-13" stroke="#BE7865" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p
          style={{
            fontFamily: "var(--font-montserrat), system-ui",
            fontSize: "10px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#BE7865",
            marginBottom: "12px",
          }}
        >
          Pago confirmado
        </p>

        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#1A1A1A",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          ¡Gracias por tu pedido!
        </h1>

        <p
          style={{
            fontFamily: "var(--font-montserrat), system-ui",
            fontSize: "13px",
            lineHeight: 1.8,
            color: "#7A6B60",
            marginBottom: "32px",
          }}
        >
          Hemos recibido tu pago correctamente. Nuestro equipo se pondrá en contacto contigo
          en las próximas <strong style={{ color: "#4A3F38" }}>24 horas</strong> para
          coordinar el envío.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <a
            href="/"
            style={{
              display: "block",
              padding: "13px 24px",
              borderRadius: "9999px",
              background: "#BE7865",
              color: "#fff",
              fontFamily: "var(--font-montserrat), system-ui",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Volver al inicio
          </a>
          <a
            href={"https://wa.me/529612513578?text=" + encodeURIComponent("Hola, acabo de realizar un pago en línea y quisiera confirmar mi pedido.")}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: "12px 24px",
              borderRadius: "9999px",
              border: "1px solid rgba(190,120,101,0.4)",
              color: "#BE7865",
              fontFamily: "var(--font-montserrat), system-ui",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Confirmar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
