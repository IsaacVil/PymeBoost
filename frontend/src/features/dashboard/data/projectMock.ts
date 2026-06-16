// Mock active-contract project (Fase 2A) — ported from prototype/app/data.jsx.
import { Contract } from "@/features/contracts/data/contractModel";

export interface PhaseObjective { label: string; done: boolean }
export interface PhaseReport { description: string; results?: string; observations?: string; submittedAt: string }
export interface ProjectPhase {
  id: string;
  name: string;
  status: "completed" | "active" | "pending";
  objectives: PhaseObjective[];
  report: PhaseReport | null;
}
export interface Kpi { label: string; before: string; after: string; positive?: boolean }
export interface Deliverable { label: string; done: boolean }

export interface ProjectContract extends Contract {
  contractStatus: "active" | "to_rate" | "completed" | "cancelled";
  phases: ProjectPhase[];
  kpis: Kpi[];
  deliverables: Deliverable[];
}

export interface ProjectMatch {
  advisor: { name: string; monogram: string; role: string; accent: "primary" | "secondary" | "success" | "warning" | "danger" };
  contract: ProjectContract;
}

const PHASES: ProjectPhase[] = [
  {
    id: "ph1", name: "Análisis Inicial", status: "completed",
    objectives: [
      { label: "Auditoría de campañas actuales", done: true },
      { label: "Identificación de público objetivo", done: true },
      { label: "Análisis de métricas históricas", done: true },
    ],
    report: {
      description: "Se detectó mala segmentación en campañas y baja optimización de conversiones. El píxel de Meta no estaba instalado correctamente.",
      results: "Baseline: conversión 2.1%, CPA ₡14k. Píxel de Meta reinstalado y verificado.",
      observations: "La cuenta de Meta tenía tres versiones del píxel activas; se unificaron.",
      submittedAt: "28 Abr 2026",
    },
  },
  {
    id: "ph2", name: "Optimización de Campañas", status: "completed",
    objectives: [
      { label: "Nueva segmentación implementada", done: true },
      { label: "Rediseño de anuncios", done: true },
      { label: "Configuración de retargeting", done: true },
    ],
    report: {
      description: "Tres conjuntos de anuncios diferenciados: frías, lookalike y retargeting. Creativos rediseñados con énfasis en producto y precio.",
      results: "Conversión: 2.1% → 3.4%. CPA: ₡14k → ₡10k. Tráfico social: +28%.",
      observations: "Mantener el retargeting activo durante la fase 3 para no perder momentum.",
      submittedAt: "22 May 2026",
    },
  },
  {
    id: "ph3", name: "Optimización de Landing Pages", status: "active",
    objectives: [
      { label: "Mejorar velocidad del sitio", done: false },
      { label: "Optimizar formularios de compra", done: false },
      { label: "Simplificar proceso de checkout", done: false },
    ],
    report: null,
  },
];

const KPIS: Kpi[] = [
  { label: "Conversiones de campañas", before: "2.1%", after: "+3.4%", positive: true },
  { label: "Costo por adquisición (CPA)", before: "₡14k", after: "₡10k", positive: true },
  { label: "Tráfico desde redes sociales", before: "—", after: "+28%", positive: true },
  { label: "Ventas digitales mensuales", before: "—", after: "+16%", positive: true },
];

const DELIVERABLES: Deliverable[] = [
  { label: "Reporte de auditoría inicial", done: true },
  { label: "Reporte de campañas optimizadas", done: true },
  { label: "Reporte de segmentación de clientes", done: true },
  { label: "Reporte final de resultados", done: false },
  { label: "Análisis de ROI del proyecto", done: false },
];

export const PROJECT: ProjectMatch = {
  advisor: { name: "Mariana Solís", monogram: "MS", role: "Marketing Digital & Performance Ads", accent: "primary" },
  contract: {
    budget: 1_200_000,
    retainer: 150000,
    durationMonths: 3,
    commissionPct: 5,
    advisorResultPct: 5,
    start: "2026-04-10",
    deadline: "2026-07-10",
    objective: "Optimizar el proceso de marketing digital y aumentar las ventas de anuncios pagados en un 25%.",
    metrics: [
      { label: "Conversión de campañas", target: "+25%" },
      { label: "Costo por adquisición (CPA)", target: "−15%" },
      { label: "Tráfico desde redes", target: "+30%" },
    ],
    plan: [],
    contractStatus: "active",
    phases: PHASES,
    kpis: KPIS,
    deliverables: DELIVERABLES,
  },
};
