// Factory Pattern: assembles recommendation fetch + swipe commands + notifications
// into a single hook the component consumes without knowing the internals

"use client";

import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { matchingService } from "../services/matchingService";
import { useNotificationStore } from "@/store/notificationStore";
import { Match } from "../types/matching";

interface UseAdvisorMatchingOptions {
  pymeId: string;
}

interface UseAdvisorMatchingReturn {
  recommendations: Match[];
  isLoading: boolean;
  error: string | null;
  swipeApproved: (advisorId: string) => Promise<void>;
  swipeRejected: (advisorId: string) => Promise<void>;
}

export function useAdvisorMatching({ pymeId }: UseAdvisorMatchingOptions): UseAdvisorMatchingReturn {
  const { publish: notify } = useNotificationStore();
  const queryClient = useQueryClient();

  // Auto-fetch AI recommendations on mount — no search form needed
  const {
    data: recommendations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recommendations", pymeId],
    queryFn: () => matchingService.getRecommendations(pymeId),
    enabled: !!pymeId,
  });

  // Swipe mutations — Command pattern: matchingService creates the command, hook executes it
  const swipeMutation = useMutation({
    mutationFn: (command: ReturnType<typeof matchingService.swipeApproved>) =>
      matchingService.executeSwipe(command),
    onSuccess: () => {
      // Remove swiped advisor from current list by refetching
      queryClient.invalidateQueries({ queryKey: ["recommendations", pymeId] });
    },
    onError: () => {
      notify({ type: "error", title: "Swipe failed", message: "Try again", duration: 4000 });
    },
  });

  // useCallback prevents new function references on every render —
  // MatchingCard is memoized so stable callbacks avoid unnecessary re-renders
  const swipeApproved = useCallback(async (advisorId: string) => {
    await swipeMutation.mutateAsync(matchingService.swipeApproved(advisorId));
    notify({ type: "success", title: "Match approved!", message: "Chat is now available", duration: 3000 });
  }, [swipeMutation, notify]);

  const swipeRejected = useCallback(async (advisorId: string) => {
    await swipeMutation.mutateAsync(matchingService.swipeRejected(advisorId));
  }, [swipeMutation]);

  return {
    recommendations: recommendations as Match[],
    isLoading,
    error: error instanceof Error ? error.message : null,
    swipeApproved,
    swipeRejected,
  };
}
