// Command Pattern: each swipe action is a discrete command with execute()
// Why: swipes are the core interaction unit — Command decouples the action
//      from the trigger, enables logging, queuing, and potential undo
//
// FASE 2B: getRecommendations now calls the real backend
// (GET /api/matching/recommendations/{pymeId}) and maps the response to DeckAdvisor.
// Swipes are still local mocks (wired to the backend in a later slice — TODO).

import { apiClient } from "@/lib/apiClient";
import { DeckAdvisor } from "../data/advisors";

// Backend response shape (matching/schemas/recommendation_response.py).
interface RecommendationResponse {
  advisor_id: string;
  name: string;
  monogram: string;
  role: string;
  industry: string;
  rating: number;
  reviews: number;
  years: number;
  compat: number;
  process: string;
  ai_objective: string;
  success_metric: { label: string; before: string; after: string; delta: string };
  advisor_gain: { pct: number; basis: string; est: number; months: number };
  retainer: number;
  accent: string;
}

function toDeckAdvisor(r: RecommendationResponse): DeckAdvisor {
  return {
    id: r.advisor_id,
    name: r.name,
    monogram: r.monogram,
    role: r.role,
    industry: r.industry,
    rating: r.rating,
    reviews: r.reviews,
    years: r.years,
    compat: r.compat,
    process: r.process,
    aiObjective: r.ai_objective,
    successMetric: { label: r.success_metric.label, from: r.success_metric.before, to: r.success_metric.after, delta: r.success_metric.delta },
    advisorGain: { pct: r.advisor_gain.pct, basis: r.advisor_gain.basis, est: r.advisor_gain.est, months: r.advisor_gain.months },
    retainer: r.retainer,
    accent: r.accent as DeckAdvisor["accent"],
  };
}

// ─── Command Pattern (swipe — still local in this slice) ────────────────────────
interface SwipeCommand {
  advisorId: string;
  execute(): Promise<void>;
}

class SwipeApprovedCommand implements SwipeCommand {
  constructor(public advisorId: string) {}
  async execute(): Promise<void> {
    // TODO (next 2B slice): POST /api/matching/swipe { advisorId, action: "approved" }
  }
}

class SwipeRejectedCommand implements SwipeCommand {
  constructor(public advisorId: string) {}
  async execute(): Promise<void> {
    // TODO (next 2B slice): POST /api/matching/swipe { advisorId, action: "rejected" }
  }
}

export class MatchingService {
  async getRecommendations(pymeId: string): Promise<DeckAdvisor[]> {
    const res = await apiClient.request<RecommendationResponse[]>(
      `/api/matching/recommendations/${pymeId}`,
      { method: "GET" },
    );
    return (res.data ?? []).map(toDeckAdvisor);
  }

  // Fase 2B: persist the swipe decision in PB_Matches (right → match, left → not_swiped).
  async swipe(pymeId: string, advisorId: string, approved: boolean): Promise<void> {
    await apiClient.request("/api/matching/swipe", {
      method: "POST",
      body: { pyme_id: pymeId, advisor_id: advisorId, approved },
    });
  }

  // Either participant cancels the match (drops it from the chat list).
  async unmatch(matchId: string): Promise<void> {
    const res = await apiClient.request(`/api/matching/matches/${matchId}/unmatch`, { method: "POST" });
    if (!res.success) throw new Error(res.error ?? "No se pudo deshacer el match");
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
