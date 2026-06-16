import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Match } from "@/features/matching/types/matching";

// ─── Mocks ──────────────────────────────────────────────────────────────────
// Unit test: zero real infrastructure — the service (apiClient) and the
// notification store are fully mocked so we test ONLY the hook's orchestration.

const mockNotify = vi.fn();
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({ publish: mockNotify }),
}));

const mockGetRecommendations = vi.fn();
const mockExecuteSwipe = vi.fn();
const mockSwipeApproved = vi.fn();
const mockSwipeRejected = vi.fn();

vi.mock("@/features/matching/services/matchingService", () => ({
  matchingService: {
    getRecommendations: (pymeId: string) => mockGetRecommendations(pymeId),
    executeSwipe: (command: unknown) => mockExecuteSwipe(command),
    swipeApproved: (advisorId: string) => mockSwipeApproved(advisorId),
    swipeRejected: (advisorId: string) => mockSwipeRejected(advisorId),
  },
}));

// Imported AFTER vi.mock so the hook picks up the mocked dependencies.
import { useAdvisorMatching } from "@/features/matching/hooks/useAdvisorMatching";

// ─── Fixtures & helpers ───────────────────────────────────────────────────────

const sampleMatch: Match = {
  advisorId: "adv-1",
  advisorName: "Ana Asesora",
  industry: "Retail",
  specializations: ["Operations"],
  rating: 4.8,
  compatibilityScore: 5,
  previousProject: { name: "Cost cut", description: "Reduced costs 20%" },
  estimatedMetricImprovement: "20% cost reduction in 3 months",
  earningsDistribution: {
    advisorPercentage: 70,
    pymeBoostPercentage: 30,
    estimatedMonthlyUSD: 1200,
  },
};

function createWrapper() {
  // Retries off so error states surface immediately and tests stay deterministic.
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
  const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  return { wrapper, invalidateSpy };
}

describe("useAdvisorMatching", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: swipe commands are opaque tokens; the service decides what they are.
    mockSwipeApproved.mockImplementation((advisorId: string) => ({
      advisorId,
      action: "approved",
    }));
    mockSwipeRejected.mockImplementation((advisorId: string) => ({
      advisorId,
      action: "rejected",
    }));
    mockExecuteSwipe.mockResolvedValue(undefined);
  });

  // ── Recommendations fetch (Factory: auto-fetch on mount) ────────────────────
  describe("recommendation fetching", () => {
    it("auto-fetches AI recommendations for the given pyme on mount", async () => {
      mockGetRecommendations.mockResolvedValue([sampleMatch]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useAdvisorMatching({ pymeId: "pyme-1" }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(mockGetRecommendations).toHaveBeenCalledWith("pyme-1");
      expect(result.current.recommendations).toEqual([sampleMatch]);
    });

    it("exposes isLoading=true while the query is in flight", async () => {
      let resolveFetch: (value: Match[]) => void = () => {};
      mockGetRecommendations.mockReturnValue(
        new Promise<Match[]>((resolve) => {
          resolveFetch = resolve;
        })
      );
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useAdvisorMatching({ pymeId: "pyme-1" }),
        { wrapper }
      );

      expect(result.current.isLoading).toBe(true);
      await act(async () => resolveFetch([]));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
    });

    it("does NOT fetch when pymeId is empty (query disabled)", async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useAdvisorMatching({ pymeId: "" }),
        { wrapper }
      );

      // enabled: !!pymeId → query never runs, never loading.
      expect(result.current.isLoading).toBe(false);
      expect(mockGetRecommendations).not.toHaveBeenCalled();
      expect(result.current.recommendations).toEqual([]);
    });

    it("maps an Error thrown by the service to a string error message", async () => {
      mockGetRecommendations.mockRejectedValue(new Error("network down"));
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useAdvisorMatching({ pymeId: "pyme-1" }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.error).toBe("network down"));
      expect(result.current.recommendations).toEqual([]);
    });
  });

  // ── Swipe APPROVED (Command pattern) ────────────────────────────────────────
  describe("swipeApproved", () => {
    it("builds an approved command, executes it, and notifies success", async () => {
      mockGetRecommendations.mockResolvedValue([sampleMatch]);
      const { wrapper, invalidateSpy } = createWrapper();

      const { result } = renderHook(
        () => useAdvisorMatching({ pymeId: "pyme-1" }),
        { wrapper }
      );
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.swipeApproved("adv-1");
      });

      // Command pattern: service creates the command, hook executes it.
      expect(mockSwipeApproved).toHaveBeenCalledWith("adv-1");
      expect(mockExecuteSwipe).toHaveBeenCalledWith({
        advisorId: "adv-1",
        action: "approved",
      });
      // Business rule: approved swipe surfaces a success notification + opens chat.
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ type: "success", title: "Match approved!" })
      );
      // List refreshes by invalidating the recommendations query.
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["recommendations", "pyme-1"],
      });
    });

    it("does NOT notify success when the swipe execution fails", async () => {
      mockGetRecommendations.mockResolvedValue([sampleMatch]);
      mockExecuteSwipe.mockRejectedValue(new Error("swipe boom"));
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useAdvisorMatching({ pymeId: "pyme-1" }),
        { wrapper }
      );
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await expect(result.current.swipeApproved("adv-1")).rejects.toThrow(
          "swipe boom"
        );
      });

      // onError publishes an error toast; success toast must NOT fire.
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ type: "error", title: "Swipe failed" })
      );
      expect(mockNotify).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: "success" })
      );
    });
  });

  // ── Swipe REJECTED (Command pattern) ────────────────────────────────────────
  describe("swipeRejected", () => {
    it("builds a rejected command, executes it, and does NOT notify success", async () => {
      mockGetRecommendations.mockResolvedValue([sampleMatch]);
      const { wrapper, invalidateSpy } = createWrapper();

      const { result } = renderHook(
        () => useAdvisorMatching({ pymeId: "pyme-1" }),
        { wrapper }
      );
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.swipeRejected("adv-2");
      });

      expect(mockSwipeRejected).toHaveBeenCalledWith("adv-2");
      expect(mockExecuteSwipe).toHaveBeenCalledWith({
        advisorId: "adv-2",
        action: "rejected",
      });
      // Business rule: rejection records the swipe but creates no match → no success toast.
      expect(mockNotify).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: "success" })
      );
      // Still refreshes the list so the rejected advisor disappears.
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["recommendations", "pyme-1"],
      });
    });

    it("propagates the error and shows the error toast when rejection fails", async () => {
      mockGetRecommendations.mockResolvedValue([sampleMatch]);
      mockExecuteSwipe.mockRejectedValue(new Error("reject boom"));
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useAdvisorMatching({ pymeId: "pyme-1" }),
        { wrapper }
      );
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await expect(result.current.swipeRejected("adv-2")).rejects.toThrow(
          "reject boom"
        );
      });

      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ type: "error", title: "Swipe failed" })
      );
    });
  });

  // ── Callback stability (memoized MatchingCard depends on this) ───────────────
  describe("callback stability", () => {
    it("keeps swipe callbacks referentially stable across re-renders", async () => {
      mockGetRecommendations.mockResolvedValue([sampleMatch]);
      const { wrapper } = createWrapper();

      const { result, rerender } = renderHook(
        () => useAdvisorMatching({ pymeId: "pyme-1" }),
        { wrapper }
      );
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      const firstApproved = result.current.swipeApproved;
      const firstRejected = result.current.swipeRejected;

      rerender();

      expect(result.current.swipeApproved).toBe(firstApproved);
      expect(result.current.swipeRejected).toBe(firstRejected);
    });
  });
});
