import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aesthetik Skin | Distribuidor Autorizado Voltena México — Dermocosmética Coreana",
  description:
    "Distribuidores oficiales de Voltena y Nabota en México. Productos coreanos premium para contorno facial, corporal y rejuvenecimiento. Asesoría profesional.",
  keywords:
    "voltena méxico, nabota méxico, dermocosmética coreana, relleno corporal, toxina botulínica, innotox, dermalax, elasty, hyaron",
  authors: [{ name: "Aesthetik Skin" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://aesthetikskin.com",
    siteName: "Aesthetik Skin",
    title: "Aesthetik Skin | Distribuidor Autorizado Voltena México",
    description: "Distribuidores oficiales de Voltena y Nabota en México. Productos coreanos premium para profesionales de la estética.",
    images: [{ url: "https://www.aesthetikskin.com/assets/logo.png", width: 1200, height: 630, alt: "Aesthetik Skin" }],
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F4EDE4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Aesthetik Skin",
              description: "Distribuidores autorizados de Voltena y Nabota en México.",
              url: "https://aesthetikskin.com",
              telephone: "+529612513578",
              address: { "@type": "PostalAddress", addressCountry: "MX" },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
