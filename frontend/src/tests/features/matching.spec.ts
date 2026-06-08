import { describe, it, expect, vi, beforeEach } from "vitest";
import { validateMatchRequest } from "@/features/matching/validators/matchingValidator";
import { MatchingService } from "@/features/matching/services/matchingService";

describe("matchingValidator", () => {
  it("rejects empty industry", () => {
    const result = validateMatchRequest({ pymeId: "p1", industry: "", challenge: "reduce costs by 20%", budget: 5000, timeline: 8 });
    expect(result.valid).toBe(false);
  });

  it("rejects challenge shorter than 10 chars", () => {
    const result = validateMatchRequest({ pymeId: "p1", industry: "Retail", challenge: "short", budget: 5000, timeline: 8 });
    expect(result.valid).toBe(false);
  });

  it("accepts a valid match request", () => {
    const result = validateMatchRequest({ pymeId: "p1", industry: "Retail", challenge: "Reduce operational costs by 20%", budget: 5000, timeline: 8 });
    expect(result.valid).toBe(true);
  });
});

describe("MatchingService", () => {
  it("is instantiable", () => {
    const service = new MatchingService();
    expect(service).toBeDefined();
  });

  it("returns empty array on API failure", async () => {
    const service = new MatchingService();
    // TODO: mock apiClient and test each strategy
  });
});
