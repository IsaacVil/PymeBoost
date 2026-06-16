// Mock advisor deck (Fase 2A) — ported from prototype/app/data.jsx.
// TODO (Fase 2B): replace with matchingService.getRecommendations(pymeId).

export type AdvisorAccent = "primary" | "secondary" | "success" | "warning" | "danger";

export interface DeckAdvisor {
  id: string;
  name: string;
  monogram: string;
  role: string;
  industry: string;
  rating: number;
  reviews: number;
  years: number;
  compat: number; // 1..5
  process: string;
  aiObjective: string;
  successMetric: { label: string; from: string; to: string; delta: string };
  advisorGain: { pct: number; basis: string; est: number; months: number };
  retainer: number;
  accent: AdvisorAccent;
}

const STANDARD_BUDGET = 1_200_000;
const STANDARD_COMMISSION_PCT = 3;

export function standardPricing(advisor: DeckAdvisor) {
  const commissionAmt = Math.round((STANDARD_BUDGET * STANDARD_COMMISSION_PCT) / 100);
  return { budget: STANDARD_BUDGET, commissionPct: STANDARD_COMMISSION_PCT, commissionAmt, retainer: advisor.retainer };
}

export const ADVISORS: DeckAdvisor[] = [
  {
    id: "a1", name: "Mariana Solís", monogram: "MS",
    role: "Marketing Digital & Performance Ads",
    industry: "Retail · E-commerce · Moda",
    rating: 4.8, reviews: 32, years: 9, compat: 5,
    process: "Optimización de pauta y embudo digital",
    aiObjective:
      "Subir la conversión de campañas pagadas de 2.1% a 3.4% (+25%) y reducir el CPA 15% en 4 meses, sin aumentar el presupuesto de pauta.",
    successMetric: { label: "Tasa de conversión de campañas", from: "2.1%", to: "3.4%", delta: "+25%" },
    advisorGain: { pct: 8, basis: "de las ventas adicionales generadas", est: 620000, months: 4 },
    retainer: 150000, accent: "primary",
  },
  {
    id: "a2", name: "Diego Hernández", monogram: "DH",
    role: "E-commerce & Optimización de Conversión",
    industry: "Retail · Tiendas online",
    rating: 4.6, reviews: 21, years: 7, compat: 4,
    process: "Optimización de conversión y checkout",
    aiObjective:
      "Bajar el costo por adquisición 18% (de ₡14k a ₡11.5k) y subir 12% el cierre de checkout en 4 meses, manteniendo el volumen de ventas.",
    successMetric: { label: "Costo por adquisición (CPA)", from: "₡14k", to: "₡11.5k", delta: "−18%" },
    advisorGain: { pct: 6, basis: "de la reducción de costos de adquisición", est: 480000, months: 4 },
    retainer: 130000, accent: "secondary",
  },
  {
    id: "a3", name: "Valeria Castro", monogram: "VC",
    role: "Automatización & CRM",
    industry: "Servicios · Retail · B2B",
    rating: 4.9, reviews: 44, years: 11, compat: 4,
    process: "Automatización de seguimiento y recompra",
    aiObjective:
      "Subir la retención de clientes de 41% a 49% (+19%) y recuperar 22% de carritos abandonados en 4 meses con automatización.",
    successMetric: { label: "Retención de clientes", from: "41%", to: "49%", delta: "+19%" },
    advisorGain: { pct: 8, basis: "de la recompra recuperada", est: 560000, months: 4 },
    retainer: 160000, accent: "success",
  },
  {
    id: "a4", name: "Andrés Mora", monogram: "AM",
    role: "Finanzas & Estrategia de Pricing",
    industry: "Retail · Alimentos · Moda",
    rating: 4.5, reviews: 17, years: 12, compat: 3,
    process: "Reestructuración de pricing y márgenes",
    aiObjective:
      "Mejorar el margen bruto de 38% a 50% (+12 pts) reajustando precios y costos por línea de producto en 4 meses.",
    successMetric: { label: "Margen bruto", from: "38%", to: "50%", delta: "+12 pts" },
    advisorGain: { pct: 10, basis: "del margen adicional generado", est: 700000, months: 4 },
    retainer: 140000, accent: "warning",
  },
  {
    id: "a5", name: "Sofía Ramírez", monogram: "SR",
    role: "Branding & Estrategia de Contenido",
    industry: "Moda · Lifestyle · Retail",
    rating: 4.7, reviews: 28, years: 8, compat: 4,
    process: "Estrategia de marca y contenido orgánico",
    aiObjective:
      "Elevar la interacción orgánica de 1.8% a 2.7% (+48%) y duplicar el alcance orgánico mensual en 4 meses.",
    successMetric: { label: "Interacción orgánica", from: "1.8%", to: "2.7%", delta: "+48%" },
    advisorGain: { pct: 7, basis: "de las ventas adicionales generadas", est: 500000, months: 4 },
    retainer: 135000, accent: "secondary",
  },
];
