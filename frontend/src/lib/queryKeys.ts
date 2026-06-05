// Query keys factory for TanStack Query
// Centralizes cache key management across all features

export const queryKeys = {
  matching: {
    all: ["matching"] as const,
    advisors: () => [...queryKeys.matching.all, "advisors"] as const,
    matches: (pymeId: string) => [...queryKeys.matching.all, "matches", pymeId] as const,
  },
  contracts: {
    all: ["contracts"] as const,
    list: (pymeId: string) => [...queryKeys.contracts.all, "list", pymeId] as const,
    detail: (contractId: string) => [...queryKeys.contracts.all, "detail", contractId] as const,
  },
  dashboard: {
    all: ["dashboard"] as const,
    stats: (pymeId: string) => [...queryKeys.dashboard.all, "stats", pymeId] as const,
  },
};
