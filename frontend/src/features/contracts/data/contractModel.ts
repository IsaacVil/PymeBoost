// Shared contract model + helpers — ported from prototype/app/data.jsx.
// Used by messaging (negotiation) and the dashboard.

export interface ContractMetric {
  label: string;
  target: string;
}

export interface Contract {
  budget: number;
  retainer: number;
  durationMonths: number;
  commissionPct: number;
  advisorResultPct: number;
  start: string;
  deadline: string;
  objective: string;
  metrics: ContractMetric[];
  plan: string[];
}

export const TIERS = [
  { months: 1, pct: 3, label: "Estándar" },
  { months: 3, pct: 5, label: "Media" },
  { months: 6, pct: 7, label: "Alta" },
];

export function commissionForMonths(m: number): number {
  const tier = TIERS.find((t) => t.months === m);
  if (tier) return tier.pct;
  return Math.min(3 + Math.max(0, m - 1), 20); // custom: +1% per extra month
}

export function standardContract(advisorRetainer = 150000): Contract {
  return {
    budget: 1_200_000,
    retainer: advisorRetainer,
    durationMonths: 1,
    commissionPct: 3,
    advisorResultPct: 5,
    start: "2026-06-10",
    deadline: "2026-07-10",
    objective: "Aumentar las ventas provenientes de anuncios pagados en un 25%.",
    metrics: [
      { label: "Conversión de campañas", target: "+25%" },
      { label: "Costo por adquisición (CPA)", target: "−15%" },
      { label: "Tráfico desde redes", target: "+30%" },
    ],
    plan: [
      "Auditar campañas actuales y comportamiento de clientes.",
      "Re-segmentar anuncios según público objetivo.",
      "Rediseñar landing pages para mejorar conversión.",
      "Implementar estrategia de retargeting.",
      "Medir resultados semanalmente y ajustar según KPI's.",
    ],
  };
}
