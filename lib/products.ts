/* ─────────────────────────────────────────────────────────────
   CATÁLOGO DE PRODUCTOS — Aesthetik Skin
   ⚠️  PRECIOS: Actualiza los valores `price` (en MXN) antes de publicar.
   ───────────────────────────────────────────────────────────── */

export interface ProductSpec { label: string; value: string; }

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  categoryId: string;
  image: string;
  presentation: string;
  description: string;
  body?: string;
  benefits: string[];
  specs: ProductSpec[];
  badges?: string[];
  tags?: string[];
  waMessage: string;
  featured?: boolean;
  accentColor: string;
  manufacturer?: string;
  certifications?: string;
  price: number;          // Precio base en MXN — ACTUALIZA ESTE VALOR
  priceDisplay: string;   // Ej: "$2,800 MXN"
}

/* ── DESCUENTOS POR VOLUMEN ─────────────────────────────────── */
export const volumeTiers = [
  { min: 1,  max: 2,  discount: 0,    label: "" },
  { min: 3,  max: 5,  discount: 0.08, label: "8% desc." },
  { min: 6,  max: 9,  discount: 0.15, label: "15% desc." },
  { min: 10, max: Infinity, discount: 0.20, label: "20% desc." },
];

export function getVolumeDiscount(qty: number) {
  return volumeTiers.find(t => qty >= t.min && qty <= t.max) ?? volumeTiers[0];
}

export function calcDiscountedPrice(price: number, qty: number) {
  const tier = getVolumeDiscount(qty);
  return Math.round(price * (1 - tier.discount));
}

/* ── CATEGORIES ─────────────────────────────────────────────── */
export interface Category { id: string; label: string; }
export const categories: Category[] = [
  { id: "toxinas",  label: "Toxinas" },
  { id: "voltena",  label: "Voltena" },
  { id: "rellenos", label: "Rellenos" },
  { id: "meso",     label: "Mesoterapia" },
];

/* ── ALL PRODUCTS ──────────────────────────────────────────── */
export const products: Product[] = [
  /* ── TOXINAS ─────────────────────────────────────────── */
  {
    id: "nabota",
    name: "Nabota",
    tagline: "Toxina Botulínica Tipo A",
    category: "Neurotoxina · Daewoong",
    categoryId: "toxinas",
    image: "/assets/nabota.jpg",
    presentation: "100u / 200u",
    description: "Toxina botulínica tipo A de Daewoong Pharma con 98.7% de pureza. Resultados visibles en 2-3 días. Aprobada FDA, MFDS y CE.",
    body: "Conocida por su rápida acción y alta pureza. Diseñada para reducir arrugas y líneas de expresión. Resultados visibles a los 2-3 días del tratamiento.",
    benefits: ["Pureza 98.7%","Resultados en 2-3 días","Vida útil 36 meses","Triple certificación FDA · MFDS · CE"],
    specs: [{ label: "Presentación", value: "100u / 200u" },{ label: "Almacenamiento", value: "2–8 °C" },{ label: "Vida útil", value: "36 meses" },{ label: "Origen", value: "🇰🇷 Daewoong Pharma" }],
    tags: ["Pureza 98.7%", "Larga duración", "Neurotoxina pura"],
    waMessage: "Hola, me interesa cotizar Nabota",
    featured: true,
    accentColor: "#5a9e78",
    manufacturer: "Daewoong",
    certifications: "MFDS · FDA · CE",
    price: 1500,
    priceDisplay: "$1,500 MXN",
  },
  {
    id: "innotox",
    name: "Innotox",
    tagline: "Toxina Botulínica Líquida",
    category: "Neurotoxina · Medytox",
    categoryId: "toxinas",
    image: "/assets/Innotox.jpg",
    presentation: "100u · Lista para usar",
    description: "Primera toxina botulínica tipo A del mundo en formato líquido. Sin albúmina sérica humana.",
    body: "Primera toxina botulínica tipo A del mundo en formato líquido lista para usar. Sin albúmina sérica humana, reduciendo riesgo de reacciones alérgicas.",
    benefits: ["Sin dilución necesaria","Sin albúmina animal","Almacenamiento temperatura ambiente","Vida útil 36 meses"],
    specs: [{ label: "Presentación", value: "100u líquida" },{ label: "Almacenamiento", value: "Temp. ambiente" },{ label: "Vida útil", value: "36 meses" },{ label: "Origen", value: "🇰🇷 Medytox Inc." }],
    tags: ["Sin dilución", "Sin albúmina animal", "T. Ambiente"],
    waMessage: "Hola, me interesa cotizar Innotox",
    accentColor: "#c4822a",
    manufacturer: "Medytox Inc.",
    certifications: "MFDS",
    price: 1350,
    priceDisplay: "$1,350 MXN",
  },
  {
    id: "liztox",
    name: "Liztox",
    tagline: "Toxina Botulínica Tipo A",
    category: "Neurotoxina · Huons",
    categoryId: "toxinas",
    image: "/assets/listox.jpg",
    presentation: "100u",
    description: "Toxina botulínica tipo A de altísima pureza. Ideal para corrección y prevención de arrugas mímicas.",
    body: "Toxina botulínica tipo A de altísima pureza. Ideal para corrección y prevención de arrugas mímicas. Aprobada para líneas glabelares y patas de gallo.",
    benefits: ["Pureza 99.8%","Alta precisión clínica","Almacenamiento 2-8°C","Aprobada líneas glabelares"],
    specs: [{ label: "Presentación", value: "100u" },{ label: "Almacenamiento", value: "2–8 °C" },{ label: "Vida útil", value: "36 meses" },{ label: "Origen", value: "🇰🇷 Huons Biopharma" }],
    tags: ["Pureza 99.8%", "Alta precisión", "36 meses"],
    waMessage: "Hola, me interesa cotizar Liztox",
    accentColor: "#7c6bbd",
    manufacturer: "Huons Biopharma",
    certifications: "MFDS · KFDA",
    price: 900,
    priceDisplay: "$900 MXN",
  },

  /* ── VOLTENA ──────────────────────────────────────────── */
  {
    id: "voltena1",
    name: "Voltena No.1",
    tagline: "Body & Face Contouring Serum",
    category: "Lipólisis · Voltena",
    categoryId: "voltena",
    image: "/assets/voltena1.JPG",
    presentation: "10ml × 6 viales",
    description: "Suero inyectable con ingredientes naturales activos que disuelve la grasa localizada.",
    body: "Suero para el contorno facial y corporal formulado con ingredientes naturales para disolver la grasa localizada. Alternativa segura y sin cicatrices.",
    benefits: ["Disuelve grasa localizada sin cirugía","Sin cicatrices","Efectos visibles y duraderos","Facial & corporal"],
    specs: [{ label: "Presentación", value: "10ml × 6 viales" },{ label: "Vía", value: "Inyectable subcutáneo" },{ label: "Zonas", value: "Abdomen · Muslos · Glúteos" },{ label: "Origen", value: "🇰🇷 Corea del Sur" }],
    tags: ["Disuelve grasa", "Sin cicatrices", "Lipo-contouring"],
    waMessage: "Hola, me interesa cotizar Voltena No.1",
    featured: true,
    accentColor: "#c4822a",
    manufacturer: "Corea del Sur",
    certifications: "Made in Korea",
    price: 2300,
    priceDisplay: "$2,300 MXN",
  },
  {
    id: "voltena2",
    name: "Voltena No.2",
    tagline: "Body Filler — Relleno Corporal",
    category: "Relleno Corporal · Voltena",
    categoryId: "voltena",
    image: "/assets/voltena2.jpg",
    presentation: "60cc",
    description: "Relleno corporal de ácido hialurónico de alta densidad para mejorar volumen y contornear áreas amplias.",
    body: "Relleno corporal de ácido hialurónico diseñado para mejorar el volumen y contornear áreas grandes del cuerpo de forma no quirúrgica.",
    benefits: ["HA corporal de alta densidad","No quirúrgico","Gran volumen y contorneo","Resultados naturales e inmediatos"],
    specs: [{ label: "Presentación", value: "60cc" },{ label: "Vía", value: "Inyección subcutánea" },{ label: "Zonas", value: "Glúteos · Caderas" },{ label: "Origen", value: "🇰🇷 Corea del Sur" }],
    tags: ["HA corporal", "No quirúrgico", "Gran volumen"],
    waMessage: "Hola, me interesa cotizar Voltena No.2",
    accentColor: "#7c6bbd",
    manufacturer: "Corea del Sur",
    certifications: "Made in Korea",
    price: 2800,
    priceDisplay: "$2,800 MXN",
  },
  {
    id: "voltena3",
    name: "Voltena No.3",
    tagline: "Gel Reductor Frío",
    category: "Tratamiento Tópico · Voltena",
    categoryId: "voltena",
    image: "/assets/voltena3.JPG",
    presentation: "300g",
    description: "Fórmula avanzada con 17 aminoácidos. Nutre, reafirma la piel y actúa contra la grasa localizada y celulitis.",
    body: "Gel reductor con 17 aminoácidos incluyendo treonina y metionina. Reafirma la piel y es eficaz contra la grasa y celulitis.",
    benefits: ["17 aminoácidos activos","Reafirma y nutre la dermis","Combate grasa y celulitis","Compatible con rodillo de masaje"],
    specs: [{ label: "Presentación", value: "300g" },{ label: "Vía", value: "Tópico con masaje" },{ label: "Zonas", value: "Muslos · Abdomen · Caderas" },{ label: "Origen", value: "🇰🇷 Corea del Sur" }],
    tags: ["17 aminoácidos", "Anticelulítico", "Lipo-reducción"],
    waMessage: "Hola, me interesa cotizar Voltena No.3",
    accentColor: "#4a90b8",
    manufacturer: "Corea del Sur",
    certifications: "Made in Korea",
    price: 600,
    priceDisplay: "$600 MXN",
  },

  /* ── RELLENOS ─────────────────────────────────────────── */
  {
    id: "dermalax",
    name: "Dermalax",
    tagline: "Relleno de Ácido Hialurónico con Lidocaína",
    category: "Dermal Filler · Across",
    categoryId: "rellenos",
    image: "/assets/Dermalax.jpg",
    presentation: "1.1ml · Deep Plus · Implant",
    description: "HA de alta pureza con lidocaína para mayor comodidad. Ideal para pliegues nasolabiales y aumento de labios.",
    body: "HA de alta pureza con lidocaína para mayor comodidad. Ideal para eliminación de pliegues nasolabiales, aumento de labios y remodelación facial.",
    benefits: ["HA 24mg/ml de alta pureza","Lidocaína 0.3% incluida","Resultados naturales uniformes","Efecto de larga duración"],
    specs: [{ label: "Presentación", value: "1.1ml" },{ label: "Composición", value: "HA 20mg/ml + Lidocaína" },{ label: "Almacenamiento", value: "2–25 °C" },{ label: "Origen", value: "🇰🇷 Across, Corea" }],
    tags: ["HA 24mg/ml", "Lidocaína 0.3%", "Aumento labios"],
    waMessage: "Hola, me interesa cotizar Dermalax",
    featured: true,
    accentColor: "#e8a87c",
    manufacturer: "Across Inc.",
    certifications: "CE · FDA",
    price: 1100,
    priceDisplay: "$1,100 MXN",
  },
  {
    id: "elasty",
    name: "Elasty",
    tagline: "Premium Hyaluronic Acid Filler",
    category: "Dermal Filler · Dongbang",
    categoryId: "rellenos",
    image: "/assets/Elasty.jpg",
    presentation: "1ml × 2 jeringas",
    description: "Tecnología de reticulación 3D con altas propiedades volumétricas. HA de origen no animal.",
    body: "Tecnología de reticulación 3D con altas propiedades volumétricas. HA de origen no animal, minimizando reacciones alérgicas. 3 densidades disponibles.",
    benefits: ["Reticulación PNET 3D","Alta elasticidad y cohesividad","Mínima presencia de BDDE","Doble jeringa por empaque"],
    specs: [{ label: "Presentación", value: "1ml × 2 jeringas" },{ label: "Reticulación", value: "PNET 3D" },{ label: "Almacenamiento", value: "1–30 °C" },{ label: "Origen", value: "🇰🇷 Dongbang Medical" }],
    tags: ["Reticulación 3D", "No animal", "Alta volumetría"],
    waMessage: "Hola, me interesa cotizar Elasty",
    accentColor: "#9eb8d8",
    manufacturer: "Dongbang Medical",
    certifications: "CE",
    price: 1100,
    priceDisplay: "$1,100 MXN",
  },
  {
    id: "juvederm",
    name: "Juvéderm",
    tagline: "Premium Dermal Filler Collection",
    category: "Dermal Filler · Allergan",
    categoryId: "rellenos",
    image: "/assets/juvederm.jpg",
    presentation: "1ml × 2syr · Volbella/Volift/Voluma",
    description: "La línea de rellenos más reconocida mundialmente. Tecnología VYCROSS para resultados naturales y duraderos.",
    body: "La línea de rellenos más reconocida mundialmente. Tecnología VYCROSS para resultados naturales y duraderos en labios, mejillas y contorno facial.",
    benefits: ["Tecnología VYCROSS exclusiva","Resultados naturales y duraderos","Múltiples densidades","Aprobada FDA"],
    specs: [{ label: "Presentación", value: "1ml × 2syr" },{ label: "Tecnología", value: "VYCROSS" },{ label: "Líneas", value: "Volbella · Volift · Voluma · Volux" },{ label: "Origen", value: "🌎 Allergan" }],
    tags: ["VYCROSS tech", "Volbella", "Voluma"],
    waMessage: "Hola, me interesa cotizar Juvéderm",
    accentColor: "#a87cb8",
    manufacturer: "Allergan",
    certifications: "CE · FDA",
    price: 4200,
    priceDisplay: "$4,200 MXN",
  },
  {
    id: "revolax",
    name: "Revolax",
    tagline: "High Purity HA Filler",
    category: "Dermal Filler · Croma",
    categoryId: "rellenos",
    image: "/assets/Revolax.jpg",
    presentation: "1.1ml · Fine/Deep/Sub-Q",
    description: "Relleno de HA de alta pureza con mínimo riesgo de rechazo. Tres densidades disponibles.",
    body: "Relleno de HA de alta pureza con mínimo riesgo de rechazo. Tres densidades para arrugas superficiales, labios, pómulos y contorno mandibular.",
    benefits: ["HA de máxima pureza","Mínimo riesgo de rechazo","12-18 meses de duración","Tres densidades disponibles"],
    specs: [{ label: "Presentación", value: "1.1ml" },{ label: "Densidades", value: "Fine · Deep · Sub-Q" },{ label: "Duración", value: "12–18 meses" },{ label: "Origen", value: "🇰🇷 Corea del Sur" }],
    tags: ["HA alta pureza", "Bajo rechazo", "12-18 meses"],
    waMessage: "Hola, me interesa cotizar Revolax",
    accentColor: "#78b896",
    manufacturer: "Croma Pharma",
    certifications: "CE · MFDS",
    price: 1020,
    priceDisplay: "$1,020 MXN",
  },

  /* ── MESOTERAPIA & OTROS ──────────────────────────────── */
  {
    id: "eyebella",
    name: "Eyebella",
    tagline: "PN Polynucleotide Eye Rejuvenation",
    category: "Mesoterapia · Eye Care",
    categoryId: "meso",
    image: "/assets/eyebella.jpg",
    presentation: "2ml · Polynucleotide 1%",
    description: "Polinucleótidos derivados del ADN de salmón para la revitalización del área periorbital.",
    body: "Formulado con polinucleótidos derivados del ADN de salmón. Diseñado para la revitalización del área periorbital. Mejora ojeras y regenera la piel.",
    benefits: ["Polinucleótidos de ADN de salmón","Regeneración periorbital profunda","Mejora ojeras y líneas finas","Alta biocompatibilidad"],
    specs: [{ label: "Presentación", value: "2ml" },{ label: "Ingrediente", value: "Polinucleótido (PN) 1%" },{ label: "Zona", value: "Contorno de ojos" },{ label: "Origen", value: "🇰🇷 Corea del Sur" }],
    tags: ["ADN de salmón", "Área periorbital", "Regeneración celular"],
    waMessage: "Hola, me interesa cotizar Eyebella",
    accentColor: "#d4a0a0",
    manufacturer: "Corea del Sur",
    certifications: "CE",
    price: 700,
    priceDisplay: "$700 MXN",
  },
  {
    id: "hyaron",
    name: "Hyaron",
    tagline: "Sodium Hyaluronate Skinbooster",
    category: "Skinbooster · Dongkook",
    categoryId: "meso",
    image: "/assets/hyaron.jpg",
    presentation: "10 jeringas · 25mg/2.5ml",
    description: "Skinbooster de hialuronato de sodio. Hidratación intensa, estimula colágeno y elastina.",
    body: "Skinbooster de hialuronato de sodio que proporciona hidratación intensa. Estimula colágeno y elastina. Compatible con Hyaluron Pen y dermarollers.",
    benefits: ["Sodium HA 25mg/2.5ml","Estimula colágeno & elastina","Compatible con Hyaluron Pen","Hidratación profunda duradera"],
    specs: [{ label: "Presentación", value: "10 jeringas" },{ label: "Composición", value: "Sodium HA 25mg/2.5ml" },{ label: "Aplicación", value: "Micro-inyecciones" },{ label: "Origen", value: "🇰🇷 Dongkook Pharma" }],
    tags: ["Skinbooster", "Colágeno & elastina", "Hidratación profunda"],
    waMessage: "Hola, me interesa cotizar Hyaron",
    accentColor: "#88b8d8",
    manufacturer: "Dongkook Pharma",
    certifications: "MFDS · FDA",
    price: 1950,
    priceDisplay: "$1,950 MXN",
  },
  {
    id: "muchcaine",
    name: "Muchcaine",
    tagline: "Crema Anestésica Tópica",
    category: "Anestésico · Tópico",
    categoryId: "meso",
    image: "/assets/muchcaine.jpg",
    presentation: "500g",
    description: "Crema anestésica tópica a base de lidocaína para adormecer la piel antes de procedimientos estéticos.",
    body: "Crema anestésica tópica a base de lidocaína. Ideal pre-procedimiento para inyecciones, microneedling o láser.",
    benefits: ["Lidocaína 10.56%","Acción rápida en 20-30 min","Ideal pre-procedimiento","Presentación 500g económica"],
    specs: [{ label: "Presentación", value: "500g" },{ label: "Activo", value: "Lidocaína 10.56%" },{ label: "Aplicación", value: "Tópica pre-procedimiento" },{ label: "Acción", value: "20-30 minutos" }],
    tags: ["Lidocaína 10.56%", "Pre-procedimiento", "Acción rápida"],
    waMessage: "Hola, me interesa cotizar Muchcaine",
    accentColor: "#d4d488",
    manufacturer: "Internacional",
    certifications: "Certificado",
    price: 750,
    priceDisplay: "$750 MXN",
  },
  {
    id: "liporase",
    name: "Liporase",
    tagline: "Hialuronidasa — Disolvente de HA",
    category: "Enzima · DnewPharm",
    categoryId: "meso",
    image: "/assets/liporase.jpg",
    presentation: "10 viales",
    description: "Hialuronidasa que disuelve el ácido hialurónico sintético. Esencial para corregir rellenos dérmicos.",
    body: "Hialuronidasa que disuelve el ácido hialurónico sintético. Esencial para corregir resultados no deseados de rellenos dérmicos o exceso de producto.",
    benefits: ["Disuelve HA de forma segura","Corrección de rellenos no deseados","Enzima natural biocompatible","Esencial para emergencias"],
    specs: [{ label: "Presentación", value: "10 viales" },{ label: "Ingrediente", value: "Hialuronidasa" },{ label: "Indicación", value: "Corrección rellenos HA" },{ label: "Origen", value: "🇰🇷 DnewPharm" }],
    tags: ["Disuelve HA", "Corrección rellenos", "Emergencias"],
    waMessage: "Hola, me interesa cotizar Liporase",
    accentColor: "#b8c4a0",
    manufacturer: "DnewPharm",
    certifications: "Certificado",
    price: 1500,
    priceDisplay: "$1,500 MXN",
  },
];

export const WA_NUMBER = "528134188472";
export function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
export function productsByCategory(catId: string) {
  return products.filter((p) => p.categoryId === catId);
}
