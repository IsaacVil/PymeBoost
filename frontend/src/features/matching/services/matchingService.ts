// Command Pattern: each swipe action is a discrete command with execute()
// Why: swipes are the core interaction unit — Command decouples the action
//      from the trigger, enables logging, queuing, and potential undo
//
// Single matching strategy: AI-powered (per project spec)
// The backend AI generates all recommendations — no rule-based or manual fallback
//
// FASE 2A (frontend-first): recommendations and swipes are served from local mock
// data so the screen is fully demoable without the backend. The real apiClient
// calls are wired in Fase 2B (see TODO markers).

import { Match } from "../types/matching";

// ─── Mock data (Fase 2A) ────────────────────────────────────────────────────
const MOCK_RECOMMENDATIONS: Match[] = [
  {
    advisorId: "adv-ana",
    advisorName: "Ana López",
    industry: "Servicios Profesionales",
    specializations: ["Marketing", "Branding"],
    rating: 4.8,
    compatibilityScore: 5,
    previousProject: {
      name: "Reposicionamiento de marca — Café local",
      description: "Rediseño de marca y campañas digitales con +35% en ventas.",
    },
    estimatedMetricImprovement: "+20% en ventas mensuales en 6 meses",
    earningsDistribution: { advisorPercentage: 85, pymeBoostPercentage: 15, estimatedMonthlyUSD: 300 },
  },
  {
    advisorId: "adv-roberto",
    advisorName: "Roberto Mora",
    industry: "Servicios Profesionales",
    specializations: ["Finanzas", "Planificación fiscal"],
    rating: 4.6,
    compatibilityScore: 4,
    previousProject: {
      name: "Ordenamiento financiero — PYME retail",
      description: "Flujo de caja y presupuesto que redujeron costos 18%.",
    },
    estimatedMetricImprovement: "-15% en costos operativos en 3 meses",
    earningsDistribution: { advisorPercentage: 80, pymeBoostPercentage: 20, estimatedMonthlyUSD: 400 },
  },
  {
    advisorId: "adv-luis",
    advisorName: "Luis Vargas",
    industry: "Tecnología",
    specializations: ["Transformación digital", "Software"],
    rating: 4.9,
    compatibilityScore: 4,
    previousProject: {
      name: "Automatización de procesos — Distribuidora",
      description: "Implementación de ERP con 40% menos tareas manuales.",
    },
    estimatedMetricImprovement: "+30% en eficiencia operativa en 4 meses",
    earningsDistribution: { advisorPercentage: 82, pymeBoostPercentage: 18, estimatedMonthlyUSD: 380 },
  },
];

// ─── Command Pattern ──────────────────────────────────────────────────────────

interface SwipeCommand {
  advisorId: string;
  execute(): Promise<void>;
}

class SwipeApprovedCommand implements SwipeCommand {
  constructor(public advisorId: string) {}

  async execute(): Promise<void> {
    // TODO (Fase 2B): POST /api/matching/swipe { advisorId, action: "approved" }
  }
}

class SwipeRejectedCommand implements SwipeCommand {
  constructor(public advisorId: string) {}

  async execute(): Promise<void> {
    // TODO (Fase 2B): POST /api/matching/swipe { advisorId, action: "rejected" }
  }
}

// ─── Matching Service ─────────────────────────────────────────────────────────

export class MatchingService {
  // Fetches AI-generated recommendations for a PYME.
  // Fase 2A: returns mock data. TODO (Fase 2B):
  //   apiClient.request<Match[]>(`/api/matching/recommendations/${pymeId}`, { method: "GET" })
  async getRecommendations(_pymeId: string): Promise<Match[]> {
    return MOCK_RECOMMENDATIONS;
  }

  async executeSwipe(command: SwipeCommand): Promise<void> {
    await command.execute();
  }

  swipeApproved(advisorId: string): SwipeCommand {
    return new SwipeApprovedCommand(advisorId);
  }

  swipeRejected(advisorId: string): SwipeCommand {
    return new SwipeRejectedCommand(advisorId);
  }
}

export const matchingService = new MatchingService();
