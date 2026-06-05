// Factory Pattern: Initializes and configures TanStack Query
// Why: Centralizes cache settings, retry logic, staleTime
//       Without it: some features cache aggressively, others refetch = inconsistency

import { QueryClient } from "@tanstack/react-query";

// Factory function creates a configured QueryClient instance
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Cache is fresh for 5 minutes
        staleTime: 1000 * 60 * 5,
        // Keep cache in memory for 10 minutes
        gcTime: 1000 * 60 * 10,
        // Retry failed requests 3 times
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        // Mutations don't cache by default
        // But we can configure retry behavior
        retry: 1,
      },
    },
  });
}

// Singleton instance: created once at app startup
export const queryClient = createQueryClient();
