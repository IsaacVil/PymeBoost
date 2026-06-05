// Strategy Pattern: Different matching algorithms (rule-based, AI, manual)
// Why: Allows new algorithms without modifying components or hooks
//       Each strategy encapsulates a different recommendation logic

import { apiClient } from "@/lib/apiClient";

export interface Advisor {
  id: string;
  name: string;
  specializations: string[];
  rating: number;
  successRate: number;
}

export interface MatchRequest {
  pymeId: string;
  industry: string;
  challenge: string;
  budget: number;
  timeline: number;
}

export interface Match {
  advisorId: string;
  matchScore: number;
  reason: string;
  strategy: "rule-based" | "ai-powered" | "manual";
}

// Strategy 1: Rule-based matching (simple scoring)
class RuleBasedStrategy {
  async getMatches(request: MatchRequest): Promise<Match[]> {
    // Call API to get advisors
    const response = await apiClient.request<Advisor[]>("/advisors", {
      method: "GET",
    });

    if (!response.success || !response.data) return [];

    // Score advisors based on rules
    return response.data
      .map((advisor) => ({
        advisorId: advisor.id,
        matchScore: this.calculateScore(advisor, request),
        reason: `Matches your ${request.industry} needs based on specialization`,
        strategy: "rule-based" as const,
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  }

  private calculateScore(advisor: Advisor, request: MatchRequest): number {
    let score = 0;

    // Check specialization match
    if (advisor.specializations.some((s) => s.toLowerCase().includes(request.industry.toLowerCase()))) {
      score += 40;
    }

    // Check rating
    score += Math.min(advisor.rating * 10, 30);

    // Check success rate
    score += Math.min(advisor.successRate * 10, 30);

    return Math.min(score, 100);
  }
}

// Strategy 2: AI-powered matching (placeholder)
class AIPoweredStrategy {
  async getMatches(request: MatchRequest): Promise<Match[]> {
    // TODO: Call AI endpoint for recommendations
    // This would use LangGraph/LangChain on backend

    const response = await apiClient.request<Match[]>("/matching/ai-recommendations", {
      method: "POST",
      body: request,
    });

    return response.data || [];
  }
}

// Strategy 3: Manual selection (user picks from list)
class ManualStrategy {
  async getMatches(request: MatchRequest): Promise<Match[]> {
    // Return all advisors unsorted, let user choose
    const response = await apiClient.request<Advisor[]>("/advisors", {
      method: "GET",
    });

    if (!response.success || !response.data) return [];

    return response.data.map((advisor) => ({
      advisorId: advisor.id,
      matchScore: 0,
      reason: "Manual selection: choose advisors based on your preference",
      strategy: "manual" as const,
    }));
  }
}

// Context: MatchingService decides which strategy to use
export class MatchingService {
  private ruleBasedStrategy = new RuleBasedStrategy();
  private aiStrategy = new AIPoweredStrategy();
  private manualStrategy = new ManualStrategy();

  async getMatches(request: MatchRequest, strategy: "rule-based" | "ai" | "manual" = "rule-based"): Promise<Match[]> {
    switch (strategy) {
      case "ai":
        return this.aiStrategy.getMatches(request);
      case "manual":
        return this.manualStrategy.getMatches(request);
      case "rule-based":
      default:
        return this.ruleBasedStrategy.getMatches(request);
    }
  }

  // Add new strategy without touching existing code
  addStrategy(name: string, strategy: any) {
    // TODO: Support dynamic strategy registration
  }
}

// Singleton: reused by matching components
export const matchingService = new MatchingService();
