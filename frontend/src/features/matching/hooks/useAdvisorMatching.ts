// Factory Pattern: Encapsulates matching workflow complexity
// Why: Setup requires TanStack Query, form state, validation, service calls
//       Components get useAdvisorMatching() instead of assembling 20 pieces

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { matchingService, MatchRequest, Match } from "../services/matchingService";
import { useNotificationStore } from "@/store/notificationStore";

interface UseAdvisorMatchingOptions {
  pymeId: string;
  strategy?: "rule-based" | "ai" | "manual";
}

interface UseAdvisorMatchingReturn {
  // Data
  matches: Match[];
  isLoading: boolean;
  error: string | null;

  // Form state
  formData: MatchRequest;
  updateFormData: (data: Partial<MatchRequest>) => void;

  // Actions
  performMatching: () => Promise<void>;
  selectAdvisor: (advisorId: string, matchId: string) => Promise<void>;
  retry: () => void;
}

export function useAdvisorMatching(options: UseAdvisorMatchingOptions): UseAdvisorMatchingReturn {
  const { pymeId, strategy = "rule-based" } = options;
  const { publish: notify } = useNotificationStore();

  // Form state
  const [formData, setFormData] = useState<MatchRequest>({
    pymeId,
    industry: "",
    challenge: "",
    budget: 0,
    timeline: 0,
  });

  // TanStack Query: manages server state and caching
  const {
    data: matches = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["matches", pymeId, formData],
    queryFn: async () => {
      // This query is managed by QueryClientFactory config
      try {
        return await matchingService.getMatches(formData, strategy);
      } catch (err) {
        notify({
          type: "error",
          title: "Matching Error",
          message: "Failed to find matching advisors",
          duration: 5000,
        });
        throw err;
      }
    },
    enabled: false, // Don't auto-fetch; user triggers via performMatching()
  });

  // Actions
  const performMatching = async () => {
    try {
      refetch();
      notify({
        type: "success",
        title: "Matching started",
        message: `Finding advisors using ${strategy} strategy...`,
        duration: 3000,
      });
    } catch (err) {
      notify({
        type: "error",
        title: "Error",
        message: "Failed to perform matching",
        duration: 5000,
      });
    }
  };

  const selectAdvisor = async (advisorId: string, matchId: string) => {
    try {
      // TODO: Create match in backend
      notify({
        type: "success",
        title: "Match created",
        message: "You can now chat with this advisor",
        duration: 4000,
      });
    } catch (err) {
      notify({
        type: "error",
        title: "Error",
        message: "Failed to create match",
        duration: 5000,
      });
    }
  };

  return {
    matches: matches as Match[],
    isLoading,
    error: error instanceof Error ? error.message : null,
    formData,
    updateFormData: (data) => setFormData((prev) => ({ ...prev, ...data })),
    performMatching,
    selectAdvisor,
    retry: () => refetch(),
  };
}
