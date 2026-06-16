// Fase 2B: dashboard tracking from the real backend
// (GET /api/projects/active/tracking) mapped to the ProjectMatch the UI renders.
import { apiClient } from "@/lib/apiClient";
import { ProjectMatch } from "../data/projectMock";

interface TrackingResponse {
  counterpart: { name: string; monogram: string; role: string };
  contract: {
    status: string;
    budget: number;
    retainer: number;
    duration_months: number;
    commission_pct: number;
    advisor_result_pct: number;
    start_date: string;
    end_date: string;
    objective: string;
  };
  phases: { name: string; status: string; objectives: { label: string; done: boolean }[] }[];
  kpis: { label: string; before: string; after: string; positive: boolean }[];
  deliverables: { label: string; done: boolean }[];
}

function toProjectMatch(r: TrackingResponse): ProjectMatch {
  return {
    advisor: { name: r.counterpart.name, monogram: r.counterpart.monogram, role: r.counterpart.role, accent: "primary" },
    contract: {
      budget: r.contract.budget,
      retainer: r.contract.retainer,
      durationMonths: r.contract.duration_months,
      commissionPct: r.contract.commission_pct,
      advisorResultPct: r.contract.advisor_result_pct,
      start: r.contract.start_date,
      deadline: r.contract.end_date,
      objective: r.contract.objective,
      metrics: [],
      plan: [],
      contractStatus: (r.contract.status === "accepted" ? "active" : "active"),
      phases: r.phases.map((p, i) => ({
        id: String(i),
        name: p.name,
        status: p.status as "completed" | "active" | "pending",
        objectives: p.objectives,
        report: null,
      })),
      kpis: r.kpis,
      deliverables: r.deliverables,
    },
  };
}

export const dashboardService = {
  async getActiveTracking(): Promise<ProjectMatch | null> {
    const res = await apiClient.request<TrackingResponse>("/api/projects/active/tracking", { method: "GET" });
    return res.success && res.data ? toProjectMatch(res.data) : null;
  },
};
