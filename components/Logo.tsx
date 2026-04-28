export default function Logo({ size = 52 }: { size?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, lineHeight: 1 }}>
      {/* Butterfly mark */}
      <svg
        width={size * 0.72}
        height={size * 0.85}
        viewBox="0 0 72 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left petal – darker taupe */}
        <path
          d="M35 7 C17 14 10 36 15 62 C22 50 31 27 35 7Z"
          fill="#BBA796"
          opacity="0.92"
        />
        {/* Right petal – lighter */}
        <path
          d="M37 7 C55 14 62 36 56 62 C50 50 42 27 37 7Z"
          fill="#D9CEC3"
          opacity="0.80"
        />
        {/* Inner overlap highlight */}
        <path
          d="M35 7 C33 22 33 44 36 62 C39 44 40 22 37 7Z"
          fill="#EDE5DC"
          opacity="0.65"
        />
        {/* Elegant S-curve body line */}
        <path
          d="M36 5 C40 16 32 32 36 48 C38 57 42 64 40 72"
          stroke="#4A3F38"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Leaf accent at bottom */}
        <path
          d="M40 70 C46 65 53 69 49 75 C45 71 42 71 40 72Z"
          fill="#BBA796"
          opacity="0.85"
        />
        {/* Dot */}
        <circle cx="40" cy="72" r="2.2" fill="#4A3F38" />
      </svg>

      {/* Wordmark */}
      <div style={{ textAlign: "center", marginTop: size * 0.09, fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}>
        <div
          style={{
            fontSize: size * 0.23,
            letterSpacing: "0.28em",
            fontWeight: 400,
            color: "#1A1A1A",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          Aesthetik
        </div>
        <div
          style={{
            fontSize: size * 0.20,
            letterSpacing: "0.38em",
            fontWeight: 300,
            color: "#4A3F38",
            textTransform: "uppercase",
            lineHeight: 1.2,
          }}
        >
          Skin
        </div>
        <div
          style={{
            fontSize: size * 0.10,
            letterSpacing: "0.22em",
            fontWeight: 300,
            color: "#7A6B60",
            textTransform: "uppercase",
            marginTop: size * 0.04,
            lineHeight: 1,
          }}
        >
          Dermocosmética Avanzada
        </div>
      </div>
    </div>
  );
}
