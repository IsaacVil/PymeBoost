// Command Pattern: each swipe action is a discrete command with execute()
// Why: swipes are the core interaction unit — Command decouples the action
//      from the trigger, enables logging, queuing, and potential undo
//
// Single matching strategy: AI-powered (per project spec)
// The backend AI generates all recommendations — no rule-based or manual fallback

import { apiClient } from "@/lib/apiClient";
import { Match } from "../types/matching";

// ─── Command Pattern ──────────────────────────────────────────────────────────

interface SwipeCommand {
  advisorId: string;
  execute(): Promise<void>;
}

class SwipeApprovedCommand implements SwipeCommand {
  constructor(public advisorId: string) {}

  async execute(): Promise<void> {
    await apiClient.request(`/matching/swipe`, {
      method: "POST",
      body: { advisorId: this.advisorId, action: "approved" },
    });
  }
}

class SwipeRejectedCommand implements SwipeCommand {
  constructor(public advisorId: string) {}

  async execute(): Promise<void> {
    await apiClient.request(`/matching/swipe`, {
      method: "POST",
      body: { advisorId: this.advisorId, action: "rejected" },
    });
  }
}

// ─── Matching Service ─────────────────────────────────────────────────────────

export class MatchingService {
  // Fetches AI-generated recommendations for a PYME
  // The backend AI uses the PYME profile filled at registration — no search form needed
  async getRecommendations(pymeId: string): Promise<Match[]> {
    const response = await apiClient.request<Match[]>(
      `/matching/recommendations/${pymeId}`,
      { method: "GET" }
    );
    return response.data ?? [];
  }

  // Executes a swipe command (approved or rejected)
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
