// Factory Pattern: creates and configures the TanStack QueryClient
// Cache Strategy Pattern: per-feature cache settings based on data freshness needs
// Why: global defaults alone can't handle real-time messages AND slow-changing contracts
//      without one being over-cached or the other refetching unnecessarily

import { QueryClient } from "@tanstack/react-query";

// ─── Cache Strategy ───────────────────────────────────────────────────────────
// Each strategy defines staleTime (when to refetch) and gcTime (how long to keep in memory)
// Features pick the strategy that matches their data's update frequency

export const cacheStrategies = {
  // Messages, live notifications — always fetch fresh, keep briefly in memory
  realtime: {
    staleTime: 0,
    gcTime: 1000 * 60 * 2,     // 2 min in memory
  },
  // Advisor recommendations, dashboard stats — refresh every 2 min
  dynamic: {
    staleTime: 1000 * 60 * 2,  // 2 min fresh
    gcTime: 1000 * 60 * 5,     // 5 min in memory
  },
  // Contracts, reports, advisor profiles — slow-changing, cache aggressively
  stable: {
    staleTime: 1000 * 60 * 10, // 10 min fresh
    gcTime: 1000 * 60 * 20,    // 20 min in memory
  },
} as const;

export type CacheStrategy = keyof typeof cacheStrategies;

// ─── Factory ──────────────────────────────────────────────────────────────────
// Creates a QueryClient with global fallback defaults
// Feature hooks override with cacheStrategies[strategy] when calling useQuery

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Fallback: matches "dynamic" strategy — overridden per feature
        staleTime: 1000 * 60 * 2,
        gcTime:    1000 * 60 * 5,
        retry: 3,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
      },
      mutations: {
        retry: 1, // swipes, contract proposals — 1 retry max (not idempotent)
      },
    },
  });
}

// Singleton: created once at app startup, shared by all features via QueryClientProvider
export const queryClient = createQueryClient();
