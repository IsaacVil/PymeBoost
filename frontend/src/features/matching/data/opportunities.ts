// Advisor incoming opportunities (Fase 2A mock) — ported from prototype/app/data.jsx.
// The advisor does not search: PymeBoost's engine connects PYMEs to the advisor.
import { AdvisorAccent } from "./advisors";

export interface AdvisorOpportunity {
  id: string;
  pymeName: string;
  monogram: string;
  industry: string;
  need: string;
  compat: number; // 1..5
  when: string;
  status: string;
  accent: AdvisorAccent;
}

export const OPPORTUNITIES: AdvisorOpportunity[] = [
  { id: "o1", pymeName: "Hilo & Aguja", monogram: "HA", industry: "Retail / Moda", need: "Aumentar ventas de pauta digital 25%", compat: 5, when: "Hace 2 h", status: "Nuevo match", accent: "primary" },
  { id: "o2", pymeName: "Verde Pilas", monogram: "VP", industry: "Alimentos saludables", need: "Optimizar embudo de suscripciones", compat: 4, when: "Ayer", status: "Negociando", accent: "success" },
  { id: "o3", pymeName: "Nimbo Tech", monogram: "NT", industry: "SaaS B2B", need: "Reducir CPA en campañas de demos", compat: 4, when: "Hace 3 días", status: "Nuevo match", accent: "secondary" },
];
